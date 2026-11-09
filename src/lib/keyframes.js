// Tiny keyframe sampler. `s` is the scroll position measured in screens (scrollY / innerHeight).
const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

export function sampleKeyframes(frames, s) {
  if (s <= frames[0].at) return frames[0];
  const last = frames[frames.length - 1];
  if (s >= last.at) return last;
  let i = 0;
  while (s > frames[i + 1].at) i++;
  const a = frames[i];
  const b = frames[i + 1];
  const t = smooth((s - a.at) / (b.at - a.at));
  return {
    pos: a.pos.map((v, k) => lerp(v, b.pos[k], t)),
    rot: a.rot.map((v, k) => lerp(v, b.rot[k], t)),
    scale: lerp(a.scale, b.scale, t),
  };
}

// Returns [fromIndex, toIndex, t] for blending between colour stops.
export function sampleStops(stops, s) {
  if (s <= stops[0].at) return [0, 0, 0];
  const n = stops.length - 1;
  if (s >= stops[n].at) return [n, n, 0];
  let i = 0;
  while (s > stops[i + 1].at) i++;
  return [i, i + 1, smooth((s - stops[i].at) / (stops[i + 1].at - stops[i].at))];
}
