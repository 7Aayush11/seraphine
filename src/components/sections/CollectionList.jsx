import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitText from '../ui/SplitText';
import Reveal from '../ui/Reveal';
import { perfumes, formatPrice } from '../../data/perfumes';

// Editorial index list; hovering a row dims the others and shows its colour.
export default function CollectionList() {
  const [active, setActive] = useState(null);
  return (
    <section className="sec side-left collection-list">
      <div className="sec-text wide">
        <Reveal><p className="eyebrow">04 — The collection</p></Reveal>
        <SplitText as="h2" italicWords={['three']}>Three scents. One signature.</SplitText>
        <div className="index" onMouseLeave={() => setActive(null)}>
          {perfumes.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, delay: i * 0.1 }}>
              <Link to={`/product/${p.slug}`} className={`index-row ${active && active !== p.slug ? 'dim' : ''}`} onMouseEnter={() => setActive(p.slug)} style={{ '--accent': p.liquid }}>
                <span className="index-no">{p.no}</span>
                <span className="index-name">{p.name}</span>
                <span className="index-family">{p.family}</span>
                <span className="index-price">{formatPrice(p.price)}</span>
                <span className="index-dot" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
