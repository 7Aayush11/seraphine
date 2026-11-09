// All product data lives here. Prices are in INR for the 50 ml bottle.
export const SIZES = [
  { id: '50', label: '50 ml', multiplier: 1 },
  { id: '100', label: '100 ml', multiplier: 1.6 },
];

export const perfumes = [
  {
    slug: 'nuit-d-ambre',
    no: '01',
    name: "Nuit d'Ambre",
    family: 'Amber',
    tagline: 'Warm resin, black vanilla and a trace of smoke.',
    description:
      'A dusk-lit amber built on slow-burning resins and soft vanilla. It opens bright, settles into velvet and stays on skin long after the evening ends.',
    price: 6900,
    liquid: '#d9892b',
    glass: '#fff1dc',
    cap: '#c9a25a',
    notes: {
      top: ['Bergamot', 'Pink pepper', 'Saffron'],
      heart: ['Labdanum', 'Rose absolute', 'Cinnamon bark'],
      base: ['Black vanilla', 'Amber resin', 'Smoked cedar'],
    },
  },
  {
    slug: 'rose-etheree',
    no: '02',
    name: 'Rose Éthérée',
    family: 'Floral',
    tagline: 'Dew-covered petals over white musk.',
    description:
      'A weightless rose, cool and luminous. Petals are lifted with lychee and pear, then held softly by white musk and a breath of cashmere wood.',
    price: 7400,
    liquid: '#e0788f',
    glass: '#ffe9ef',
    cap: '#d9b9a0',
    notes: {
      top: ['Lychee', 'Pear blossom', 'Mandarin'],
      heart: ['Damask rose', 'Peony', 'Jasmine sambac'],
      base: ['White musk', 'Cashmere wood', 'Soft amber'],
    },
  },
  {
    slug: 'vetiver-vert',
    no: '03',
    name: 'Vétiver Vert',
    family: 'Woody',
    tagline: 'Green roots, wet stone and cool cedar.',
    description:
      'An earthy, quietly confident woody. Fresh-cut vetiver and green fig leaf sit over mineral notes and dry cedar for a clean, modern trail.',
    price: 6500,
    liquid: '#3f9b78',
    glass: '#e6fff4',
    cap: '#b9b08a',
    notes: {
      top: ['Green fig leaf', 'Grapefruit', 'Cardamom'],
      heart: ['Haitian vetiver', 'Iris', 'Violet leaf'],
      base: ['Atlas cedar', 'Oakmoss', 'Mineral musk'],
    },
  },
];

export const families = ['All', ...Array.from(new Set(perfumes.map((p) => p.family)))];
export const getPerfume = (slug) => perfumes.find((p) => p.slug === slug);
export const formatPrice = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
export const priceFor = (perfume, sizeId) => {
  const s = SIZES.find((x) => x.id === sizeId) || SIZES[0];
  return Math.round((perfume.price * s.multiplier) / 100) * 100;
};
