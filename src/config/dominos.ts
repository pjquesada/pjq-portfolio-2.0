import { HERO_LOGO_URL, MODEL_URLS } from './models'
import type { Breakpoint, Vec3Tuple } from './camera'

export type { Breakpoint, Vec3Tuple }

export type DominoConfig = {
  id: string
  model: string
  hero?: boolean
  logo?: string
  breakpoints: Breakpoint[]
  initial: {
    position: Vec3Tuple
    rotation: Vec3Tuple
    scale: number
  }
  scatter: {
    position: Vec3Tuple
    rotation: Vec3Tuple
    start: number
    end: number
    ease: string
  }
  settle?: {
    /** 0–1 viewport X (left → right) and Y (top → bottom). Converted at runtime. */
    viewport: { x: number; y: number }
    worldZ: number
    rotation: Vec3Tuple
    scale: number
    start: number
    end: number
    ease: string
    /** Extra radians added during travel so the piece completes full turns, then stops on `rotation`. */
    twirl: Vec3Tuple
  }
  handoff?: {
    start: number
    end: number
    scale: number
    rotation: Vec3Tuple
  }
}

/**
 * Art-directed tabletop layout. World units, Y-up.
 * Tweak these values to restage the opening — do not scatter magic numbers in components.
 */
export const DOMINO_CONFIG: DominoConfig[] = [
  {
    id: 'hero',
    model: MODEL_URLS.d77,
    hero: true,
    logo: HERO_LOGO_URL,
    breakpoints: ['mobile', 'tablet', 'desktop'],
    initial: {
      position: [0.04, 0, 0.06],
      rotation: [0.0, 0.1, 0.02],
      scale: 1.08,
    },
    scatter: {
      position: [0.04, 0, 0.06],
      rotation: [0.0, 0.1, 0.02],
      start: 1,
      end: 1,
      ease: 'none',
    },
    settle: {
      viewport: { x: 0.28, y: 0.5 },
      worldZ: 0.12,
      rotation: [0.42, -0.52, 0.08],
      scale: 1.16,
      start: 0.45,
      end: 0.76,
      ease: 'power3.out',
      twirl: [0.55, Math.PI * 2.08, 0.48],
    },
    handoff: {
      start: 0.88,
      end: 1,
      scale: 4.6,
      rotation: [1.15, -0.2, 0.35],
    },
  },
  {
    id: 'stand-far-left',
    model: MODEL_URLS.d99,
    breakpoints: ['tablet', 'desktop'],
    initial: {
      position: [-3.62, 0.02, 0.18],
      rotation: [-1.18, 0.12, -0.08],
      scale: 1,
    },
    scatter: {
      position: [-6.8, 0.55, -1.4],
      rotation: [-2.1, -0.8, 1.35],
      start: 0.26,
      end: 0.5,
      ease: 'power2.inOut',
    },
  },
  {
    id: 'lie-left',
    model: MODEL_URLS.d10,
    breakpoints: ['mobile', 'tablet', 'desktop'],
    initial: {
      position: [-2.48, 0, 0.32],
      rotation: [0.04, -0.22, 0.03],
      scale: 0.98,
    },
    scatter: {
      position: [-7.2, 0.18, 0.9],
      rotation: [0.55, -1.15, 0.8],
      start: 0.28,
      end: 0.54,
      ease: 'power3.inOut',
    },
  },
  {
    id: 'back-left',
    model: MODEL_URLS.d67,
    breakpoints: ['desktop'],
    initial: {
      position: [-1.72, 0, -0.92],
      rotation: [0.08, 0.46, -0.04],
      scale: 0.94,
    },
    scatter: {
      position: [-3.4, -0.15, -4.8],
      rotation: [0.9, 1.4, -0.6],
      start: 0.24,
      end: 0.48,
      ease: 'power2.in',
    },
  },
  {
    id: 'mid-left',
    model: MODEL_URLS.d21,
    breakpoints: ['mobile', 'tablet', 'desktop'],
    initial: {
      position: [-1.18, 0, 0.2],
      rotation: [0.03, 0.16, -0.02],
      scale: 1,
    },
    scatter: {
      position: [-4.6, 0.72, 1.6],
      rotation: [-1.05, 0.7, 1.55],
      start: 0.32,
      end: 0.56,
      ease: 'power2.inOut',
    },
  },
  {
    id: 'front-left',
    model: MODEL_URLS.d67,
    breakpoints: ['desktop'],
    initial: {
      position: [-0.82, 0, 1.08],
      rotation: [-0.18, 0.22, 0.06],
      scale: 0.92,
    },
    scatter: {
      position: [-2.8, 0.9, 4.6],
      rotation: [-0.85, 0.4, -1.1],
      start: 0.3,
      end: 0.52,
      ease: 'power3.in',
    },
  },
  {
    id: 'mid-right',
    model: MODEL_URLS.d92,
    breakpoints: ['mobile', 'tablet', 'desktop'],
    initial: {
      position: [1.12, 0, 0.26],
      rotation: [0.05, -0.18, 0.04],
      scale: 1.02,
    },
    scatter: {
      position: [5.1, 0.35, 1.35],
      rotation: [0.7, -0.95, -0.55],
      start: 0.3,
      end: 0.55,
      ease: 'power2.inOut',
    },
  },
  {
    id: 'front-right',
    model: MODEL_URLS.d96,
    breakpoints: ['mobile', 'tablet', 'desktop'],
    initial: {
      position: [1.92, 0, -0.18],
      rotation: [-0.06, 0.14, -0.03],
      scale: 0.97,
    },
    scatter: {
      position: [3.4, 0.55, 4.2],
      rotation: [-1.2, 0.65, 0.9],
      start: 0.27,
      end: 0.5,
      ease: 'power3.inOut',
    },
  },
  {
    id: 'lie-right',
    model: MODEL_URLS.d99,
    breakpoints: ['tablet', 'desktop'],
    initial: {
      position: [2.7, 0, 0.4],
      rotation: [0.02, -0.08, 0.05],
      scale: 1,
    },
    scatter: {
      position: [7.4, 0.22, -0.6],
      rotation: [0.35, 0.8, -1.4],
      start: 0.25,
      end: 0.49,
      ease: 'power2.inOut',
    },
  },
  {
    id: 'tip-far-right',
    model: MODEL_URLS.d21,
    breakpoints: ['desktop'],
    initial: {
      position: [3.55, 0.01, -0.38],
      rotation: [-0.42, 0.58, -0.12],
      scale: 0.96,
    },
    scatter: {
      position: [7.8, 0.8, -2.1],
      rotation: [-1.6, 1.5, 0.7],
      start: 0.22,
      end: 0.47,
      ease: 'power2.in',
    },
  },
  {
    id: 'back-right',
    model: MODEL_URLS.d10,
    breakpoints: ['desktop'],
    initial: {
      position: [2.08, 0, -1.12],
      rotation: [0.1, -0.34, 0.02],
      scale: 0.93,
    },
    scatter: {
      position: [4.2, -0.2, -5.4],
      rotation: [1.1, -0.7, 0.4],
      start: 0.23,
      end: 0.46,
      ease: 'power2.in',
    },
  },
]

export const HERO_CONFIG = DOMINO_CONFIG.find((d) => d.hero)!

export const TIMELINE = {
  holdEnd: 0.15,
  cameraPush: { start: 0.15, end: 0.32 },
  nameLeave: { start: 0.15, end: 0.3 },
  scatter: { start: 0.25, end: 0.55 },
  heroTravel: { start: 0.45, end: 0.76 },
  quote: {
    start: 0.68,
    stagger: 0.055,
    duration: 0.09,
  },
  silence: { start: 0.82, end: 0.88 },
  handoff: { start: 0.88, end: 1 },
  indicatorFade: { start: 0, end: 0.08 },
} as const

export function configsForBreakpoint(breakpoint: Breakpoint) {
  return DOMINO_CONFIG.filter((d) => d.breakpoints.includes(breakpoint))
}
