import { useGLTF } from '@react-three/drei'
import { ALL_MODEL_URLS } from '@/config/models'

export function preloadLandingAssets() {
  ALL_MODEL_URLS.forEach((url) => useGLTF.preload(url))
}
