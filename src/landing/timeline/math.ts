import gsap from 'gsap'

export function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function lerpTuple(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

/** Map global 0–1 progress through a window, then apply a GSAP ease. */
export function span(
  progress: number,
  start: number,
  end: number,
  ease: string = 'none',
) {
  if (end <= start) return progress >= end ? 1 : 0
  const t = clamp01((progress - start) / (end - start))
  return gsap.parseEase(ease)(t)
}
