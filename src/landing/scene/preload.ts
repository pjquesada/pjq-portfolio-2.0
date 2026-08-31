import { useGLTF, useTexture } from '@react-three/drei'
import { ALL_MODEL_URLS, HERO_LOGO_URL } from '@/config/models'

export function preloadLandingAssets() {
  ALL_MODEL_URLS.forEach((url) => useGLTF.preload(url))
  useTexture.preload(HERO_LOGO_URL)
}
