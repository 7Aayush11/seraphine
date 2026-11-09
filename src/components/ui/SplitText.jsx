import { motion } from 'framer-motion';

// Word-by-word mask reveal when scrolled into view.
export default function SplitText({ children, as = 'h2', className = '', delay = 0, italicWords = [] }) {
  const Tag = motion[as] || motion.h2;
  const words = String(children).split(' ');
  return (
    <Tag className={`split ${className}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }} transition={{ staggerChildren: 0.06, delayChildren: delay }}>
      {words.map((w, i) => (
        <span className="split-mask" key={i}>
          <motion.span
            className={`split-word ${italicWords.includes(w.replace(/[.,]/g, '')) ? 'it' : ''}`}
            variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
