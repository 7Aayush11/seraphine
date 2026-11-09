import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MiniBottle from '../three/MiniBottle';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../data/perfumes';

export default function ProductCard({ perfume, index = 0 }) {
  const hovered = useRef(false);
  const add = useCart((s) => s.add);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="pcard"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      style={{ '--accent': perfume.liquid }}
    >
      <Link to={`/product/${perfume.slug}`} className="pcard-media" data-cursor="view">
        <span className="pcard-no">{perfume.no}</span>
        <span className="pcard-family">{perfume.family}</span>
        <MiniBottle perfume={perfume} hovered={hovered} />
        <span className="pcard-view">View fragrance</span>
      </Link>
      <div className="pcard-info">
        <div>
          <h3>{perfume.name}</h3>
          <p>{perfume.tagline}</p>
        </div>
        <div className="pcard-buy">
          <b>{formatPrice(perfume.price)}</b>
          <button onClick={() => add(perfume, '50')} aria-label={`Add ${perfume.name} to bag`}>+ Add</button>
        </div>
      </div>
    </motion.article>
  );
}
