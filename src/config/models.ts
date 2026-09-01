/** Double-nine protagonist. Never used as a scatter / background piece. */
export const HERO_MODEL_URL = '/models/9-9-domino.glb'

export const MODEL_URLS = {
  d10: '/models/1-0-domino.glb',
  d21: '/models/2-1-domino.glb',
  d67: '/models/6-7-domino.glb',
  d77: '/models/7-7-domino.glb',
  d92: '/models/9-2-domino.glb',
  d96: '/models/9-6-domino.glb',
  d99: HERO_MODEL_URL,
} as const

export const HERO_LOGO_URL = '/images/logo.png'

export const ALL_MODEL_URLS = Object.values(MODEL_URLS)
