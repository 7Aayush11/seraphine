import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

export default function Hero() {
  return (
    <section className="sec hero" id="top">
      <div className="hero-word" aria-hidden="true">
        {'SÉRAPHINE'.split('').map((c, i) => (
          <motion.span key={i} initial={{ y: '60%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.4 + i * 0.05, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
            {c}
          </motion.span>
        ))}
      </div>
      <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8, duration: 1 }}>
        Maison de Parfum · Concept collection
      </motion.p>
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
        <h1>
          Scent, <em>sculpted</em> in light.
        </h1>
        <p>Three eaux de parfum, composed slowly and bottled in hand-poured glass.</p>
        <div className="hero-cta">
          <MagneticButton to="/collection">Explore the collection</MagneticButton>
          <MagneticButton to="/story" variant="ghost">Our story</MagneticButton>
        </div>
      </motion.div>
      <div className="hero-meta hero-meta-l">Nº 01 — Nuit d’Ambre<br />Eau de Parfum · 50 ml</div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
