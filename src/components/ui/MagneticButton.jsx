import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Button that is gently pulled toward the cursor; fills with colour on hover.
export default function MagneticButton({ to, onClick, children, variant = 'solid', type = 'button', disabled, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <>
      <span className="btn-fill" />
      <span className="btn-label">{children}</span>
      <svg className="btn-arrow" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </>
  );
  const cls = `btn btn-${variant} ${className}`;
  const motionProps = { style: { x: sx, y: sy }, onMouseMove: move, onMouseLeave: leave, 'data-cursor': 'hover' };

  return (
    <motion.span ref={ref} className="btn-wrap" {...motionProps}>
      {to ? (
        <Link to={to} className={cls}>
          {inner}
        </Link>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={cls}>
          {inner}
        </button>
      )}
    </motion.span>
  );
}
