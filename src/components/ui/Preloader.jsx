import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Intro screen with a 0→100 counter. Slides away when done.
export default function Preloader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 2200;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.round(1 - Math.pow(1 - p, 3) > 0 ? (1 - Math.pow(1 - p, 3)) * 100 : 0));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = done ? '' : 'hidden';
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="preloader" exit={{ y: '-100%' }} transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div className="pre-brand" initial={{ opacity: 0, letterSpacing: '0.7em' }} animate={{ opacity: 1, letterSpacing: '0.42em' }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}>
            SÉRAPHINE
          </motion.div>
          <div className="pre-line">
            <span style={{ transform: `scaleX(${n / 100})` }} />
          </div>
          <div className="pre-count">{String(n).padStart(3, '0')}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
