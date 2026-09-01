import { HERO_LOGO_URL, HERO_MODEL_URL, MODEL_URLS } from './models'
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
    /**
     * Extra radians added during travel so the piece completes full turns.
     * X must pass through ~π so the reverse (logo) is a brief reveal, then
     * continue until the double-nine face is primary again.
     */
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
 * Dedicated double-nine protagonist. Instantiated only by HeroDomino —
 * never included in the scatter field.
 */
export const HERO_CONFIG: DominoConfig = {
  id: 'hero',
  model: HERO_MODEL_URL,
  hero: true,
  logo: HERO_LOGO_URL,
  breakpoints: ['mobile', 'tablet', 'desktop'],
  initial: {
    position: [0.0, 0, 0.04],
    rotation: [0.0, 0.05, 0.0],
    scale: 1.12,
  },
  scatter: {
    position: [0.0, 0, 0.04],
    rotation: [0.0, 0.05, 0.0],
    start: 1,
    end: 1,
    ease: 'none',
  },
  settle: {
    viewport: { x: 0.3, y: 0.5 },
    worldZ: 0.1,
    rotation: [0.36, -0.5, 0.06],
    scale: 1.2,
    start: 0.18,
    end: 0.66,
    ease: 'power4.out',
    twirl: [Math.PI * 2, Math.PI * 2, 0.12],
  },
  handoff: {
    start: 0.9,
    end: 1,
    scale: 4.6,
    rotation: [1.15, -0.2, 0.35],
  },
}

/**
 * Surrounding tabletop field. World units, Y-up.
 * These pieces must never reference 9-9-domino.glb.
 */
export const DOMINO_CONFIG: DominoConfig[] = [
  {
    id: 'stand-far-left',
    model: MODEL_URLS.d77,
    breakpoints: ['tablet', 'desktop'],
    initial: {
      position: [-3.85, 0.02, 0.22],
      rotation: [-1.18, 0.12, -0.08],
      scale: 1,
    },
    scatter: {
      position: [-11.2, 1.1, -2.8],
      rotation: [-2.1, -0.8, 1.35],
      start: 0.16,
      end: 0.42,
      ease: 'power2.inOut',
    },
  },
  {
    id: 'lie-left',
    model: MODEL_URLS.d10,
    breakpoints: ['mobile', 'tablet', 'desktop'],
    initial: {
      position: [-2.72, 0, 0.38],
      rotation: [0.04, -0.22, 0.03],
      scale: 0.98,
    },
    scatter: {
      position: [-9.2, 0.35, 1.4],
      rotation: [0.55, -1.15, 0.8],
      start: 0.18,
      end: 0.42,
      ease: 'power3.inOut',
    },
  },
  {
    id: 'back-left',
    model: MODEL_URLS.d67,
    breakpoints: ['desktop'],
    initial: {
      position: [-1.95, 0, -1.05],
      rotation: [0.08, 0.46, -0.04],
      scale: 0.94,
    },
    scatter: {
      position: [-4.8, -0.35, -6.4],
      rotation: [0.9, 1.4, -0.6],
      start: 0.15,
      end: 0.42,
      ease: 'power2.in',
    },
  },
  {
    id: 'mid-left',
    model: MODEL_URLS.d21,
    breakpoints: ['mobile', 'tablet', 'desktop'],
    initial: {
      position: [-1.52, 0, 0.28],
      rotation: [0.03, 0.16, -0.02],
      scale: 1,
    },
    scatter: {
      position: [-6.8, 1.15, 2.6],
      rotation: [-1.05, 0.7, 1.55],
      start: 0.2,
      end: 0.42,
      ease: 'power2.inOut',
    },
  },
  {
    id: 'front-left',
    model: MODEL_URLS.d67,
    breakpoints: ['desktop'],
    initial: {
      position: [-1.42, 0, 1.32],
      rotation: [-0.18, 0.22, 0.06],
      scale: 0.9,
    },
    scatter: {
      position: [-4.2, 1.25, 6.2],
      rotation: [-0.85, 0.4, -1.1],
      start: 0.18,
      end: 0.42,
      ease: 'power3.in',
    },
  },
  {
    id: 'mid-right',
    model: MODEL_URLS.d92,
    breakpoints: ['mobile', 'tablet', 'desktop'],
    initial: {
      position: [1.48, 0, 0.3],
      rotation: [0.05, -0.18, 0.04],
      scale: 1.02,
    },
    scatter: {
      position: [7.4, 0.65, 2.2],
      rotation: [0.7, -0.95, -0.55],
      start: 0.19,
      end: 0.42,
      ease: 'power2.inOut',
    },
  },
  {
    id: 'front-right',
    model: MODEL_URLS.d96,
    breakpoints: ['mobile', 'tablet', 'desktop'],
    initial: {
      position: [2.15, 0, -0.12],
      rotation: [-0.06, 0.14, -0.03],
      scale: 0.97,
    },
    scatter: {
      position: [4.8, 0.85, 5.6],
      rotation: [-1.2, 0.65, 0.9],
      start: 0.17,
      end: 0.42,
      ease: 'power3.inOut',
    },
  },
  {
    id: 'lie-right',
    model: MODEL_URLS.d77,
    breakpoints: ['tablet', 'desktop'],
    initial: {
      position: [2.92, 0, 0.44],
      rotation: [0.02, -0.08, 0.05],
      scale: 1,
    },
    scatter: {
      position: [9.4, 0.4, -1.1],
      rotation: [0.35, 0.8, -1.4],
      start: 0.16,
      end: 0.42,
      ease: 'power2.inOut',
    },
  },
  {
    id: 'tip-far-right',
    model: MODEL_URLS.d21,
    breakpoints: ['desktop'],
    initial: {
      position: [3.72, 0.01, -0.42],
      rotation: [-0.42, 0.58, -0.12],
      scale: 0.96,
    },
    scatter: {
      position: [9.6, 1.1, -2.8],
      rotation: [-1.6, 1.5, 0.7],
      start: 0.14,
      end: 0.42,
      ease: 'power2.in',
    },
  },
  {
    id: 'back-right',
    model: MODEL_URLS.d10,
    breakpoints: ['desktop'],
    initial: {
      position: [2.28, 0, -1.22],
      rotation: [0.1, -0.34, 0.02],
      scale: 0.93,
    },
    scatter: {
      position: [5.6, -0.35, -6.8],
      rotation: [1.1, -0.7, 0.4],
      start: 0.15,
      end: 0.42,
      ease: 'power2.in',
    },
  },
]

if (import.meta.env.DEV) {
  for (const piece of DOMINO_CONFIG) {
    if (piece.hero || piece.model === HERO_MODEL_URL) {
      throw new Error(
        `9-9-domino.glb is the hero protagonist and cannot be used as scatter piece "${piece.id}"`,
      )
    }
  }
}

export const TIMELINE = {
  holdEnd: 0.1,
  cameraPush: { start: 0.12, end: 0.3 },
  nameLeave: { start: 0.12, end: 0.28 },
  scatter: { start: 0.14, end: 0.45 },
  heroTravel: { start: 0.18, end: 0.66 },
  quote: {
    start: 0.7,
    stagger: 0.05,
    duration: 0.12,
  },
  silence: { start: 0.66, end: 0.88 },
  handoff: { start: 0.9, end: 1 },
  indicatorFade: { start: 0, end: 0.08 },
} as const

export function configsForBreakpoint(breakpoint: Breakpoint) {
  return DOMINO_CONFIG.filter((d) => d.breakpoints.includes(breakpoint))
}
