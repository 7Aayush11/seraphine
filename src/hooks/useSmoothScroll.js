import { useEffect } from 'react';
import Lenis from 'lenis';
import { scrollState, lenisRef } from '../lib/scrollState';

// Buttery inertial scrolling. Scroll position is mirrored into `scrollState` for the 3D scene.
export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', (e) => {
      scrollState.y = e.scroll;
      scrollState.velocity = e.velocity;
      scrollState.limit = e.limit;
    });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
}
