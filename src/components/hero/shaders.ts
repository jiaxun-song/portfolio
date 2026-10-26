// Original shaders for the portfolio. No third-party scene runtime is needed.
export const TRAIL_CAPACITY = 64;

export const vertexShader = `#version 300 es
in vec2 position;
out vec2 uv;
void main() {
  uv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

export const fragmentShader = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 outputColor;
uniform sampler2D portrait;
uniform sampler2D helmet;
uniform vec2 resolution;
uniform vec4 imageRect;
uniform vec4 trail[${TRAIL_CAPACITY}];
uniform vec2 trailOrigin[${TRAIL_CAPACITY}];
uniform int trailCount;
uniform float time;
uniform vec3 ornamentA;
uniform vec3 ornamentB;
uniform vec3 rotationA;
uniform vec3 rotationB;

vec4 imageAt(sampler2D source, vec2 p) {
  vec2 q = (p * resolution - imageRect.xy) / imageRect.zw;
  if (min(q.x, q.y) < 0.0 || max(q.x, q.y) > 1.0) return vec4(0.0);
  vec4 color = texture(source, q);
  return vec4(color.rgb * color.a, color.a);
}
float pigmentHash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
float pigmentNoise(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(pigmentHash(cell), pigmentHash(cell + vec2(1,0)), f.x),
             mix(pigmentHash(cell + vec2(0,1)), pigmentHash(cell + vec2(1,1)), f.x), f.y);
}
vec4 scene(vec2 p) {
  vec4 base = imageAt(portrait, p);
  if (trailCount == 0) return base;
  float reveal = 0.0;
  vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
  vec2 paper = p * aspect;
  // Slowly drifting washes and fixed fine grain give the mask a wet, uneven edge.
  // Evaluate these once per fragment, not once per stroke.
  vec2 flow = vec2(
    pigmentNoise(paper * 19.0 + vec2(time * 0.22, -time * 0.13)),
    pigmentNoise(paper * 19.0 + vec2(7.3 - time * 0.16, 2.8 + time * 0.19))
  ) - 0.5;
  float fibres = pigmentNoise(paper * 83.0);
  float grain = pigmentNoise(paper * 230.0);
  vec2 wetPaper = paper + flow * 0.045;
  for (int i = 0; i < ${TRAIL_CAPACITY}; i++) {
    if (i >= trailCount) break;
    if (trail[i].z <= 0.0) continue;
    vec2 start = trailOrigin[i] * aspect;
    vec2 segment = trail[i].xy * aspect - start;
    float spread = 1.0 - exp(-trail[i].w * 3.0);
    vec2 direction = segment / max(length(segment), 0.0001);
    start += direction * spread * 0.009;
    float along = clamp(dot(wetPaper - start, segment) / max(dot(segment, segment), 0.000001), 0.0, 1.0);
    vec2 nearest = (start + segment * along) / aspect;
    float distance = max(0.0, length(wetPaper - nearest * aspect) + (fibres - 0.5) * 0.012);
    float radius = 0.14 + spread * 0.018;
    float wash = exp(-distance * distance / (radius * radius));
    // A slightly denser wet rim and translucent grain, without a hard outline.
    float wetRim = exp(-pow((distance / radius - 0.9) * 4.0, 2.0));
    float brush = (wash + wetRim * 0.075) * trail[i].z * mix(0.94, 1.0, grain);
    reveal = max(reveal, brush);
  }
  // The watercolor only changes opacity; the helmet artwork stays undistorted.
  vec4 visor = imageAt(helmet, p);
  visor *= smoothstep(0.0, 1.0, reveal * 1.35);
  return visor + base * (1.0 - visor.a);
}
mat3 rotation(vec3 a) {
  vec3 s = sin(a), c = cos(a);
  return mat3(c.z,-s.z,0.0,s.z,c.z,0.0,0.0,0.0,1.0)
       * mat3(c.y,0.0,s.y,0.0,1.0,0.0,-s.y,0.0,c.y)
       * mat3(1.0,0.0,0.0,0.0,c.x,-s.x,0.0,s.x,c.x);
}
float segmentDistance(vec2 p, vec2 a, vec2 b) {
  vec2 edge = b-a;
  return length(p-a-edge*clamp(dot(p-a,edge)/dot(edge,edge),0.0,1.0));
}
float shape(vec3 p, int kind) {
  if (kind == 0) {
    // A softly bevelled, concave four-point glass plate.
    vec2 q = abs(p.xy);
    float outline = pow(pow(q.x, 0.64) + pow(q.y, 0.64), 1.0 / 0.64) - 1.0;
    float thickness = 0.145 + 0.025 * max(0.0,1.0-dot(p.xy,p.xy));
    vec2 d = vec2(outline * 0.36, abs(p.z) - thickness);
    return min(max(d.x,d.y),0.0) + length(max(d,0.0)) - 0.035;
  }
  // A lathed spinning top with a thin equatorial disc and tapered poles.
  vec2 q = vec2(length(p.xz),abs(p.y));
  const vec2 profile[6] = vec2[6](vec2(1.0,0),vec2(0.94,0.028),
    vec2(0.40,0.11),vec2(0.17,0.32),vec2(0.047,0.70),vec2(0,0.80));
  float distance = 10.0;
  float radius = 0.0;
  for(int i=0;i<5;i++) {
    vec2 a=profile[i], b=profile[i+1];
    distance=min(distance,segmentDistance(q,a,b));
    if(q.y>=a.y && q.y<=b.y) radius=mix(a.x,b.x,(q.y-a.y)/(b.y-a.y));
  }
  return distance * (q.x<radius ? -1.0 : 1.0) - 0.009;
}
vec3 normalAt(vec3 p, int kind) {
  const float e = 0.002;
  return normalize(vec3(
    shape(p+vec3(e,0,0),kind)-shape(p-vec3(e,0,0),kind),
    shape(p+vec3(0,e,0),kind)-shape(p-vec3(0,e,0),kind),
    shape(p+vec3(0,0,e),kind)-shape(p-vec3(0,0,e),kind)
  ));
}
vec4 ornament(vec2 p, vec3 placement, vec3 angles, int kind, vec4 background) {
  vec2 plane = (p - placement.xy) * vec2(resolution.x/resolution.y, 1.0) / placement.z;
  if (max(abs(plane.x),abs(plane.y)) > 1.35) return background;
  mat3 turn = rotation(angles);
  vec3 origin = turn * vec3(plane, 3.0);
  vec3 direction = turn * vec3(0,0,-1);
  float t = 0.0;
  bool hit = false;
  vec3 point = origin;
  for(int i=0;i<80;i++) {
    point = origin + direction*t;
    float distance = shape(point,kind);
    if(distance < 0.0015) { hit = true; break; }
    t += max(distance,0.002);
    if(t > 5.0) break;
  }
  if(!hit) return background;
  vec3 n = transpose(turn) * normalAt(point,kind);
  float rim = pow(1.0-clamp(n.z,0.0,1.0),3.5);
  // Refraction borrows the warm portrait tones, as glass does in the reference.
  vec2 refracted = vec2(0.52,0.72) + n.xy * (kind == 0 ? 0.12 : 0.36);
  vec3 transmission = texture(portrait,refracted).rgb;
  transmission += texture(portrait,refracted+vec2(0.025,0.025)).rgb;
  transmission += texture(portrait,refracted-vec2(0.025,0.025)).rgb;
  transmission /= 3.0;
  if (kind == 1) {
    float disc = smoothstep(0.35,0.9,abs(normalAt(point,kind).y));
    transmission = mix(vec3(0.006),vec3(0.78,0.59,0.49),disc) * 0.85 + transmission * 0.15;
  }
  float facing = max(0.0,dot(n,normalize(vec3(-0.5,0.8,1.4))));
  float highlight = pow(facing,42.0);
  float band = pow(max(0.0,1.0-abs(n.x*0.42+n.y*0.81+n.z*0.15)),24.0);
  vec3 color = transmission * (0.28+0.68*facing) + vec3(0.008);
  color += vec3(0.78,0.91,0.96) * rim * 0.66;
  color += vec3(0.85,0.9,0.93) * highlight * 0.52;
  color += vec3(0.13,0.19,0.20) * band;
  // Very fine surface grain avoids an unnaturally flat digital highlight.
  float grain = fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-0.5;
  color += grain * 0.025;
  return vec4(color,1.0);
}
void main() {
  vec2 p = vec2(uv.x,1.0-uv.y);
  vec4 color = scene(p);
  color = ornament(p,ornamentA,rotationA,0,color);
  color = ornament(p,ornamentB,rotationB,1,color);
  outputColor = color;
}`;
