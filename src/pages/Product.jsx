import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductViewer from '../components/three/ProductViewer';
import NotesPyramid from '../components/ui/NotesPyramid';
import MagneticButton from '../components/ui/MagneticButton';
import useCart from '../hooks/useCart';
import { getPerfume, perfumes, SIZES, priceFor, formatPrice } from '../data/perfumes';
import NotFound from './NotFound';

export default function Product() {
  const { slug } = useParams();
  const perfume = getPerfume(slug);
  const [size, setSize] = useState('50');
  const add = useCart((s) => s.add);
  if (!perfume) return <NotFound />;
  const others = perfumes.filter((p) => p.slug !== slug);

  return (
    <div className="inner product-page" style={{ '--accent': perfume.liquid }}>
      <div className="product-grid">
        <div className="product-media">
          <ProductViewer perfume={perfume} />
        </div>
        <motion.div className="product-info" key={perfume.slug} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <p className="eyebrow">Nº {perfume.no} · {perfume.family}</p>
          <h1>{perfume.name}</h1>
          <p className="product-tag">{perfume.tagline}</p>
          <p className="lead">{perfume.description}</p>
          <div className="sizes" role="radiogroup" aria-label="Size">
            {SIZES.map((s) => (
              <button key={s.id} role="radio" aria-checked={size === s.id} className={size === s.id ? 'on' : ''} onClick={() => setSize(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="product-buy">
            <motion.b key={size} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{formatPrice(priceFor(perfume, size))}</motion.b>
            <MagneticButton onClick={() => add(perfume, size)}>Add to bag</MagneticButton>
          </div>
          <h4 className="mini-title">Fragrance notes</h4>
          <NotesPyramid notes={perfume.notes} />
          <ul className="details">
            <li>Eau de parfum · 18% concentration</li>
            <li>Refillable glass bottle</li>
            <li>Free shipping over ₹5,000 (demo)</li>
          </ul>
        </motion.div>
      </div>
      <section className="related">
        <h3>Complete the set</h3>
        <div className="related-row">
          {others.map((o) => (
            <Link key={o.slug} to={`/product/${o.slug}`} className="related-card" style={{ '--accent': o.liquid }}>
              <span className="swatch" />
              <div>
                <b>{o.name}</b>
                <small>{o.family} · {formatPrice(o.price)}</small>
              </div>
              <span className="arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
