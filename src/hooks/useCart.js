import { create } from 'zustand';
import { priceFor } from '../data/perfumes';

// Global cart state (zustand). Demo only — checkout is not connected to anything.
const useCart = create((set, get) => ({
  items: [],
  open: false,
  toggle: (v) => set((s) => ({ open: typeof v === 'boolean' ? v : !s.open })),
  add: (perfume, sizeId) =>
    set((s) => {
      const id = `${perfume.slug}-${sizeId}`;
      const found = s.items.find((i) => i.id === id);
      const items = found
        ? s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        : [
            ...s.items,
            { id, slug: perfume.slug, name: perfume.name, liquid: perfume.liquid, size: sizeId, price: priceFor(perfume, sizeId), qty: 1 },
          ];
      return { items, open: true };
    }),
  setQty: (id, qty) =>
    set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty } : i)).filter((i) => i.qty > 0) })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
  count: () => get().items.reduce((n, i) => n + i.qty, 0),
  total: () => get().items.reduce((n, i) => n + i.qty * i.price, 0),
}));

export default useCart;
