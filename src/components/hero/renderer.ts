import { fragmentShader, vertexShader, TRAIL_CAPACITY } from './shaders';

type Brush = { x: number; y: number; fromX: number; fromY: number; age: number };

// Keep each stroke readable, then ease it away rather than immediately decaying.
const TRAIL_HOLD = 0.2;
const TRAIL_FADE = 1.6;
const TRAIL_SAMPLE_INTERVAL = 1 / 30;
const BRUSH_RESPONSE = 45;

/** A small, self-contained WebGL renderer for the two portrait layers and glass. */
export function createHeroRenderer(canvas: HTMLCanvasElement, onReady: () => void) {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  const textures: WebGLTexture[] = [];
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let disposed = false;
  let loaded = false;
  let active = false;
  let inView = true;
  let frame = 0;
  let previousTime = 0;
  let width = 1;
  let height = 1;
  let elapsed = 0;
  let brushStrength = 0;
  let bounds = canvas.getBoundingClientRect();
  let boundsDirty = false;
  let lastPointer: { x: number; y: number } | null = null;
  const pointer = { x: 0.5, y: 0.5 };
  const target = { x: 0.5, y: 0.5 };
  const brushes: Brush[] = [];
  const trailData = new Float32Array(TRAIL_CAPACITY * 4);
  const trailOrigins = new Float32Array(TRAIL_CAPACITY * 2);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarsePointer = window.matchMedia('(pointer: coarse)');

  function release() {
    textures.forEach(texture => gl!.deleteTexture(texture));
    shaders.forEach(shader => gl!.deleteShader(shader));
    if (buffer) gl!.deleteBuffer(buffer);
    if (program) gl!.deleteProgram(program);
  }

  try {
    program = gl.createProgram();
    if (!program) throw new Error('Unable to create Hero program');
    for (const [kind, source] of [[gl.VERTEX_SHADER, vertexShader], [gl.FRAGMENT_SHADER, fragmentShader]] as const) {
      const shader = gl.createShader(kind);
      if (!shader) throw new Error('Unable to create Hero shader');
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || 'Hero shader compilation failed');
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Hero linking failed');
    gl.useProgram(program);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  } catch (error) {
    release();
    console.warn('Hero is using its static fallback.', error);
    return null;
  }

  const uniform = Object.fromEntries(
    ['portrait', 'helmet', 'resolution', 'imageRect', 'trail[0]', 'trailOrigin[0]', 'trailCount', 'time', 'ornamentA', 'ornamentB', 'rotationA', 'rotationB']
      .map(name => [name, gl.getUniformLocation(program!, name)])
  );

  function render(dt: number) {
    if (!loaded || disposed || gl!.isContextLost()) return;
    gl!.useProgram(program);
    gl!.uniform2f(uniform.resolution, width, height);
    const mobile = window.innerWidth <= 575;
    // Match the source artboard's cover crop, including its custom mobile crop.
    const imageWidth = mobile ? 960 : Math.max(width, height * 1080 / 608);
    const imageHeight = imageWidth * 608 / 1080;
    gl!.uniform4f(uniform.imageRect,
      width * (mobile ? 0.46026365 : 0.5) - imageWidth / 2,
      height * (mobile ? 0.67937853 : 0.5) - imageHeight / 2,
      imageWidth, imageHeight);
    const ease = 1 - Math.exp(-dt * 8);
    pointer.x += (target.x-pointer.x)*ease;
    pointer.y += (target.y-pointer.y)*ease;
    // Ease in once for the whole gesture. Starting another segment must never
    // reset the wet brush's opacity (the previous per-segment attack pulsed).
    brushStrength = brushes.length
      ? brushStrength + (0.88 - brushStrength) * (1 - Math.exp(-dt * BRUSH_RESPONSE))
      : 0;
    trailData.fill(0);
    trailOrigins.fill(0);
    for (let i=brushes.length-1;i>=0;i--) {
      brushes[i].age += dt;
      if (brushes[i].age >= TRAIL_HOLD + TRAIL_FADE) brushes.splice(i,1);
    }
    brushes.forEach((brush,i) => {
      const progress = Math.max(0, Math.min(1, (brush.age - TRAIL_HOLD) / TRAIL_FADE));
      const fade = 1 - progress * progress * (3 - 2 * progress);
      const strength = brushStrength * fade;
      trailData.set([brush.x,brush.y,strength,brush.age], i*4);
      trailOrigins.set([brush.fromX,brush.fromY], i*2);
    });
    gl!.uniform4fv(uniform['trail[0]'], trailData);
    gl!.uniform2fv(uniform['trailOrigin[0]'], trailOrigins);
    gl!.uniform1i(uniform.trailCount, brushes.length);
    gl!.uniform1f(uniform.time, reducedMotion.matches ? 0 : elapsed);
    const px = (pointer.x-0.5)*0.3;
    const py = (pointer.y-0.5)*0.3;
    if (mobile) {
      gl!.uniform3f(uniform.ornamentA,0.228,0.27,0.102);
      gl!.uniform3f(uniform.ornamentB,0.718,0.27,0.27);
      gl!.uniform3f(uniform.rotationA,0.2+py,0.34+px,0.48);
    } else {
      gl!.uniform3f(uniform.ornamentA,0.1,0.8,0.153);
      gl!.uniform3f(uniform.ornamentB,0.8784,0.1498,0.15);
      gl!.uniform3f(uniform.rotationA,0.18+py,0.38+px,0.52);
    }
    // The original ornaments are mostly still: just a slow change in reflections.
    const drift = reducedMotion.matches ? 0 : Math.sin(elapsed*0.12)*0.025;
    gl!.uniform3f(uniform.rotationB,0.32+py*0.4+drift,0.1+px,0.38);
    gl!.drawArrays(gl!.TRIANGLES,0,6);
  }

  function tick(now: number) {
    frame = 0;
    if (disposed || !active || !inView || document.hidden || !loaded) return;
    const dt = Math.min((now-previousTime)/1000,0.05);
    previousTime = now;
    elapsed += dt;
    render(dt);
    if (!reducedMotion.matches) frame = requestAnimationFrame(tick);
  }
  function schedule() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    previousTime = performance.now();
    if (loaded && active && inView && !document.hidden && !disposed) frame = requestAnimationFrame(tick);
  }
  function resize() {
    const box = canvas.getBoundingClientRect();
    bounds = box;
    boundsDirty = false;
    width = Math.max(1,box.width);
    height = Math.max(1,box.height);
    const dpi = Math.min(window.devicePixelRatio || 1,1.5);
    canvas.width = Math.round(width*dpi);
    canvas.height = Math.round(height*dpi);
    gl!.viewport(0,0,canvas.width,canvas.height);
    render(0);
    schedule();
  }
  function move(event: PointerEvent) {
    if (!active || !inView || document.hidden || reducedMotion.matches || coarsePointer.matches || event.pointerType==='touch') return;
    // Cursor position updates must not force a layout read for every event.
    if (boundsDirty) {
      bounds = canvas.getBoundingClientRect();
      boundsDirty = false;
    }
    const box = bounds;
    const x = (event.clientX-box.left)/width;
    const y = (event.clientY-box.top)/height;
    target.x = Math.max(0,Math.min(1,x));
    target.y = Math.max(0,Math.min(1,y));
    if(x<0 || x>1 || y<0 || y>1) {lastPointer=null;return;}
    const distance = lastPointer ? Math.hypot((x-lastPointer.x)*width/height,y-lastPointer.y) : 1;
    if(distance > 0.0001) {
      const newest = brushes[0];
      // The live endpoint follows every event; shorter segments preserve curves.
      // Time-based sampling also prevents high-polling mice erasing the tail.
      if (lastPointer && newest && newest.age < TRAIL_SAMPLE_INTERVAL - 0.0005) {
        newest.x = x;
        newest.y = y;
      } else {
        brushes.unshift({x,y,fromX:lastPointer?.x ?? x,fromY:lastPointer?.y ?? y,age:0});
        if(brushes.length>TRAIL_CAPACITY) brushes.length=TRAIL_CAPACITY;
      }
    }
    lastPointer={x,y};
  }
  function leave() { lastPointer=null; target.x=0.5; target.y=0.5; }
  function invalidateBounds() { boundsDirty=true; }
  function visibility() { brushes.length=0; lastPointer=null; schedule(); }
  function motionChange() { brushes.length=0; lastPointer=null; render(0); schedule(); }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver(([entry]) => {inView=entry.isIntersecting;schedule();});
  intersectionObserver.observe(canvas);
  window.addEventListener('pointermove',move,{passive:true});
  window.addEventListener('scroll',invalidateBounds,{passive:true});
  document.documentElement.addEventListener('pointerleave',leave);
  document.addEventListener('visibilitychange',visibility);
  reducedMotion.addEventListener('change',motionChange);

  const images = ['/images/hero/jade.png','/images/hero/helmet.png'].map((src,index) => new Promise<void>((resolve,reject) => {
    const image = new Image();
    image.onload = () => {
      if(disposed) {resolve();return;}
      const texture = gl!.createTexture();
      if(!texture) {reject(new Error('Unable to load Hero texture'));return;}
      textures.push(texture);
      gl!.activeTexture(gl!.TEXTURE0+index);
      gl!.bindTexture(gl!.TEXTURE_2D,texture);
      gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_MIN_FILTER,gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_MAG_FILTER,gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_WRAP_S,gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_WRAP_T,gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D,0,gl!.RGBA,gl!.RGBA,gl!.UNSIGNED_BYTE,image);
      gl!.useProgram(program);
      gl!.uniform1i(uniform[index===0?'portrait':'helmet'],index);
      resolve();
    };
    image.onerror=()=>reject(new Error(`Unable to load ${src}`));
    image.src=src;
  }));
  Promise.all(images).then(() => {
    if(disposed) return;
    loaded=true;
    resize();
    onReady();
  }).catch(error=>console.warn('Hero is using its static fallback.',error));

  return {
    setActive(value: boolean) { active=value; if(!value) { brushes.length=0; lastPointer=null; } schedule(); },
    destroy() {
      disposed=true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove',move);
      window.removeEventListener('scroll',invalidateBounds);
      document.documentElement.removeEventListener('pointerleave',leave);
      document.removeEventListener('visibilitychange',visibility);
      reducedMotion.removeEventListener('change',motionChange);
      release();
    },
  };
}
