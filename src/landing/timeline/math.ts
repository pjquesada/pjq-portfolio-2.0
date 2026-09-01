import gsap from 'gsap'
import type { Vec3Tuple } from '@/config/camera'

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

export type ScalarKey = { at: number; value: number; ease?: string }
export type TupleKey = { at: number; value: Vec3Tuple; ease?: string }

function localT(progress: number, from: number, to: number, ease?: string) {
  if (to <= from) return progress >= to ? 1 : 0
  const t = clamp01((progress - from) / (to - from))
  return ease ? gsap.parseEase(ease)(t) : t
}

export function sampleKeyedScalar(keys: readonly ScalarKey[], progress: number) {
  if (progress <= keys[0].at) return keys[0].value
  for (let i = 1; i < keys.length; i++) {
    if (progress <= keys[i].at) {
      const a = keys[i - 1]
      const b = keys[i]
      return lerp(a.value, b.value, localT(progress, a.at, b.at, b.ease))
    }
  }
  return keys[keys.length - 1].value
}

export function sampleKeyedTuple(keys: readonly TupleKey[], progress: number): Vec3Tuple {
  if (progress <= keys[0].at) return keys[0].value
  for (let i = 1; i < keys.length; i++) {
    if (progress <= keys[i].at) {
      const a = keys[i - 1]
      const b = keys[i]
      return lerpTuple(a.value, b.value, localT(progress, a.at, b.at, b.ease))
    }
  }
  return keys[keys.length - 1].value
}
