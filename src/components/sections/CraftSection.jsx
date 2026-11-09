import { motion } from 'framer-motion';
import SplitText from '../ui/SplitText';

const steps = [
  { n: '01', t: 'Distil', d: 'Raw materials are gently distilled to keep their natural character.' },
  { n: '02', t: 'Rest', d: 'The blend matures for weeks, until every note settles into place.' },
  { n: '03', t: 'Bottle', d: 'Hand-finished glass and a weighted metal cap complete the object.' },
];

export default function CraftSection() {
  return (
    <section className="sec craft">
      <div className="craft-head">
        <p className="eyebrow">03 — The craft</p>
        <SplitText as="h2" italicWords={['detail']}>Made slowly, down to the last detail.</SplitText>
      </div>
      <div className="craft-steps">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            className="craft-step"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{s.n}</span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
