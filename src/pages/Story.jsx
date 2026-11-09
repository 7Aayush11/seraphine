import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from '../components/ui/SplitText';
import Reveal from '../components/ui/Reveal';
import Marquee from '../components/ui/Marquee';
import MagneticButton from '../components/ui/MagneticButton';

const chapters = [
  { n: 'I', t: 'The beginning', d: 'SÉRAPHINE began with a simple question: what if a fragrance could feel like a quiet room full of warm light? The first accord took a year to get right.' },
  { n: 'II', t: 'The material', d: 'We work with a short list of ingredients and use each one fully. Resins, petals and woods are chosen for character, then left to rest until they agree with each other.' },
  { n: 'III', t: 'The object', d: 'The bottle is a weighted block of glass with a metal cap — meant to sit on a shelf long after the last drop, and to be refilled rather than replaced.' },
];

const values = [
  ['Restraint', 'Fewer notes, better chosen.'],
  ['Patience', 'Every blend rests before release.'],
  ['Permanence', 'Objects made to be kept.'],
  ['Honesty', 'Plain language, clear ingredients.'],
];

export default function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="story-page">
      <section className="story-hero" ref={ref}>
        <motion.div className="story-orb" style={{ y }} />
        <motion.div className="story-hero-copy" style={{ y, opacity: op }}>
          <p className="eyebrow">Our story</p>
          <SplitText as="h1" italicWords={['light.']}>Made slowly, worn quietly, remembered in light.</SplitText>
        </motion.div>
      </section>

      <section className="chapters">
        {chapters.map((c, i) => (
          <Reveal key={c.n} className={`chapter ${i % 2 ? 'flip' : ''}`}>
            <span className="chapter-n">{c.n}</span>
            <div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <Marquee items={['Restraint', 'Patience', 'Permanence', 'Honesty']} />

      <section className="values">
        {values.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.08} className="value">
            <h4>{t}</h4>
            <p>{d}</p>
          </Reveal>
        ))}
      </section>

      <section className="story-cta">
        <SplitText as="h2" italicWords={['yours']}>Find the one that is yours.</SplitText>
        <MagneticButton to="/collection">Explore the collection</MagneticButton>
      </section>
    </div>
  );
}
