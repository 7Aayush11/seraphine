import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';
import SplitText from '../components/ui/SplitText';
import { perfumes, families } from '../data/perfumes';

export default function Collection() {
  const [family, setFamily] = useState('All');
  const list = perfumes.filter((p) => family === 'All' || p.family === family);
  return (
    <div className="inner collection-page">
      <header className="page-head">
        <p className="eyebrow">Eaux de parfum</p>
        <SplitText as="h1" italicWords={['Collection']}>The Collection</SplitText>
        <p className="lead">Three fragrances, each composed around a single idea. Hover a bottle to see it turn.</p>
      </header>
      <div className="filters">
        {families.map((f) => (
          <button key={f} className={f === family ? 'on' : ''} onClick={() => setFamily(f)}>
            {f}
            {f === family && <motion.i layoutId="filter-underline" />}
          </button>
        ))}
      </div>
      <motion.div layout className="pgrid">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <ProductCard key={p.slug} perfume={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
