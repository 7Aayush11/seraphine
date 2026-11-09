// Plain mutable object (NOT React state) so the 3D scene can read scroll every frame without re-rendering.
export const scrollState = { y: 0, velocity: 0, limit: 1 };
export const lenisRef = { current: null };
