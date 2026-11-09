import { motion } from 'framer-motion';

// Top / heart / base notes laid out as three animated rows.
export default function NotesPyramid({ notes }) {
  const rows = [
    ['Top', notes.top],
    ['Heart', notes.heart],
    ['Base', notes.base],
  ];
  return (
    <div className="pyramid">
      {rows.map(([label, list], r) => (
        <motion.div
          key={label}
          className="pyramid-row"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: r * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="pyramid-label">{label}</span>
          <span className="pyramid-list">{list.join(' · ')}</span>
        </motion.div>
      ))}
    </div>
  );
}
