import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { formatPrice } from '../../data/perfumes';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, open, toggle, setQty, remove, clear } = useCart();
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);
  const [done, setDone] = useState(false);

  const checkout = () => {
    setDone(true);
    clear();
    setTimeout(() => setDone(false), 3500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => toggle(false)} />
          <motion.aside className="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}>
            <div className="drawer-head">
              <h3>Your bag</h3>
              <button onClick={() => toggle(false)} aria-label="Close bag">✕</button>
            </div>
            <div className="drawer-body">
              {done && <p className="drawer-note">Demo only — no real order was placed. Thank you!</p>}
              {!items.length && !done && (
                <div className="drawer-empty">
                  <p>Your bag is empty.</p>
                  <Link to="/collection" onClick={() => toggle(false)}>Explore the collection →</Link>
                </div>
              )}
              <AnimatePresence initial={false}>
                {items.map((i) => (
                  <motion.div key={i.id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="cart-row">
                    <span className="cart-swatch" style={{ background: i.liquid }} />
                    <div className="cart-info">
                      <b>{i.name}</b>
                      <small>{i.size} ml · {formatPrice(i.price)}</small>
                      <div className="qty">
                        <button onClick={() => setQty(i.id, i.qty - 1)}>−</button>
                        <span>{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)}>+</button>
                      </div>
                    </div>
                    <div className="cart-right">
                      <b>{formatPrice(i.price * i.qty)}</b>
                      <button onClick={() => remove(i.id)}>Remove</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {!!items.length && (
              <div className="drawer-foot">
                <div className="drawer-total">
                  <span>Subtotal</span>
                  <b>{formatPrice(total)}</b>
                </div>
                <button className="drawer-checkout" onClick={checkout}>Checkout (demo)</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
