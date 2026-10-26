'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { createHeroRenderer } from './renderer';
import styles from './hero.module.css';

function NativeHeroScene({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ReturnType<typeof createHeroRenderer>>(null);
  const activeRef = useRef(active);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function initialize() {
      rendererRef.current?.destroy();
      rendererRef.current = createHeroRenderer(canvas!, () => setReady(true));
      rendererRef.current?.setActive(activeRef.current);
    }
    function lost(event: Event) {
      event.preventDefault();
      setReady(false);
      rendererRef.current?.destroy();
      rendererRef.current = null;
    }
    initialize();
    canvas.addEventListener('webglcontextlost', lost);
    canvas.addEventListener('webglcontextrestored', initialize);
    return () => {
      canvas.removeEventListener('webglcontextlost', lost);
      canvas.removeEventListener('webglcontextrestored', initialize);
      rendererRef.current?.destroy();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
    rendererRef.current?.setActive(active);
  }, [active]);

  return (
    <div className={styles.scene} role="img" aria-label="Jade 的個人肖像，移動游標可顯露 HELLO WORLD 未來感頭盔">
      {/* Local artwork remains visible while loading or without WebGL. */}
      <div className={styles.fallback} style={{ visibility: ready ? 'hidden' : 'visible' }} aria-hidden="true" />
      <canvas ref={canvasRef} className={styles.canvas} style={{ opacity: ready ? 1 : 0 }} aria-hidden="true" />
    </div>
  );
}

export default memo(NativeHeroScene);
