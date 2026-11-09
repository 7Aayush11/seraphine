# SÉRAPHINE — 3D perfume landing page (React + Three.js)

A fictional luxury perfume brand website. The bottle is built entirely in code (no 3D model files, no images).

## Requirements
Node.js 18 or newer (20+ recommended) — https://nodejs.org

## Install & run
```bash
cd seraphine
npm install
npm run dev
```
Open http://localhost:5173 (it opens automatically).

## Production build
```bash
npm run build
npm run preview
```

## Stack
React 18 · Vite · React Router · Three.js · @react-three/fiber · @react-three/drei · @react-three/postprocessing · Framer Motion · Lenis (smooth scroll) · Zustand (cart)

## Pages
/ (home, scroll-driven 3D) · /collection · /product/:slug · /story · /contact · 404

## Customise
- Brand name, perfumes, prices, colours: `src/data/perfumes.js`
- Bottle shape/material: `src/components/three/Bottle.jsx`
- Where the bottle sits at each scroll screen: `FRAMES` in `src/components/three/HomeScene.jsx`
- Colours / fonts: `src/styles/base.css` (CSS variables at the top)

## Screen-recording tips
Use Chrome or Edge (hardware acceleration ON), a 1920×1080 window, 100% zoom. Reload the page and start recording; the intro plays for ~3 seconds.
If the page feels heavy on an older laptop, lower `dpr={[1, 1.75]}` to `dpr={[1, 1.25]}` in `HomeScene.jsx`.
