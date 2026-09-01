import { MODEL_URLS } from './models'
import type { Breakpoint, Vec3Tuple } from './camera'

export type { Breakpoint, Vec3Tuple }

export type DominoConfig = {
  id: string
  model: string
  hero?: boolean
  /**
   * Optional extra Euler on the GLB. Hero 9-9 must stay in the authored
   * orientation — do not add a 180° flip to force the pip face forward.
   */
  meshRotation?: Vec3Tuple
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
    /**
     * Extra radians added during travel. A full 2π X turn returns to the
     * authored front (logo). Do not add a half-turn that lands on the pips.
     */
    twirl: Vec3Tuple
    twirlEase?: string
  }
  handoff?: {
    start: number
    end: number
    scale: number
    rotation: Vec3Tuple
  }
}

/**
 * Double-nine is the only hero. Never add MODEL_URLS.d99 to scatter pieces.
 */
export const HERO_DOMINO: DominoConfig = {
  id: 'hero-99',
  model: MODEL_URLS.d99,
  hero: true,
  breakpoints: ['mobile', 'tablet', 'desktop'],
  initial: {
    position: [0.02, 0, 0.04],
    rotation: [0.0, 0.08, 0.015],
    scale: 1.05,
  },
  scatter: {
    position: [0.02, 0, 0.04],
    rotation: [0.0, 0.08, 0.015],
    start: 1,
    end: 1,
    ease: 'none',
  },
  settle: {
    viewport: { x: 0.3, y: 0.5 },
    worldZ: 2.55,
    rotation: [0.52, -0.32, 0.04],
    scale: 1.18,
    start: 0.44,
    end: 0.82,
    ease: 'power4.out',
    twirl: [Math.PI * 2, Math.PI * 0.85, 0.28],
    twirlEase: 'power2.out',
  },
  handoff: {
    start: 0.88,
    end: 1,
    scale: 4.6,
    rotation: [1.12, -0.18, 0.28],
  },
}

/**
 * Art-directed tabletop layout. World units, Y-up.
 * Tweak these values to restage the opening — do not scatter magic numbers in components.
 * 9-9-domino.glb is reserved for HERO_DOMINO.
 */
export const SCATTER_DOMINOES: DominoConfig[] = [
  {
    id: 'stand-far-left',
    model: MODEL_URLS.d77,
    breakpoints: ['tablet', 'desktop'],
    initial: {
      position: [-3.72, 0.02, 0.22],
      rotation: [-1.18, 0.12, -0.08],
      scale: 1,
    },
    scatter: {
      position: [-8.4, 0.35, -2.2],
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
      position: [-2.62, 0, 0.38],
      rotation: [0.04, -0.22, 0.03],
      scale: 0.98,
    },
    scatter: {
      position: [-8.6, 0.12, 1.4],
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
      position: [-1.92, 0, -0.98],
      rotation: [0.08, 0.46, -0.04],
      scale: 0.94,
    },
    scatter: {
      position: [-4.8, -0.2, -6.2],
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
      position: [-1.58, 0, 0.28],
      rotation: [0.03, 0.16, -0.02],
      scale: 1,
    },
    scatter: {
      position: [-6.4, 0.55, 2.2],
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
      position: [-1.28, 0, 1.22],
      rotation: [-0.18, 0.22, 0.06],
      scale: 0.92,
    },
    scatter: {
      position: [-5.6, 0.45, 5.8],
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
      position: [1.58, 0, 0.3],
      rotation: [0.05, -0.18, 0.04],
      scale: 1.02,
    },
    scatter: {
      position: [7.2, 0.28, 2.1],
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
      position: [2.12, 0, -0.22],
      rotation: [-0.06, 0.14, -0.03],
      scale: 0.97,
    },
    scatter: {
      position: [6.8, 0.4, 5.6],
      rotation: [-1.2, 0.65, 0.9],
      start: 0.27,
      end: 0.5,
      ease: 'power3.inOut',
    },
  },
  {
    id: 'lie-right',
    model: MODEL_URLS.d77,
    breakpoints: ['tablet', 'desktop'],
    initial: {
      position: [2.88, 0, 0.42],
      rotation: [0.02, -0.08, 0.05],
      scale: 1,
    },
    scatter: {
      position: [9.2, 0.18, -1.4],
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
      position: [3.68, 0.01, -0.42],
      rotation: [-0.42, 0.58, -0.12],
      scale: 0.96,
    },
    scatter: {
      position: [9.4, 0.55, -3.2],
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
      position: [2.22, 0, -1.18],
      rotation: [0.1, -0.34, 0.02],
      scale: 0.93,
    },
    scatter: {
      position: [5.6, -0.25, -6.8],
      rotation: [1.1, -0.7, 0.4],
      start: 0.23,
      end: 0.46,
      ease: 'power2.in',
    },
  },
]

if (SCATTER_DOMINOES.some((piece) => piece.model === MODEL_URLS.d99)) {
  throw new Error('9-9-domino.glb is reserved for HeroDomino and must not appear in scatter.')
}

export const DOMINO_CONFIG: DominoConfig[] = [HERO_DOMINO, ...SCATTER_DOMINOES]

export const HERO_CONFIG = HERO_DOMINO

export const TIMELINE = {
  holdEnd: 0.15,
  cameraPush: { start: 0.15, end: 0.32 },
  nameLeave: { start: 0.15, end: 0.3 },
  scatter: { start: 0.25, end: 0.55 },
  heroTravel: { start: 0.44, end: 0.82 },
  quote: {
    start: 0.62,
    stagger: 0.045,
    duration: 0.1,
  },
  silence: { start: 0.82, end: 0.88 },
  handoff: { start: 0.88, end: 1 },
  indicatorFade: { start: 0, end: 0.08 },
} as const

export function scatterForBreakpoint(breakpoint: Breakpoint) {
  return SCATTER_DOMINOES.filter((d) => d.breakpoints.includes(breakpoint))
}

export function configsForBreakpoint(breakpoint: Breakpoint) {
  return [HERO_DOMINO, ...scatterForBreakpoint(breakpoint)]
}
