import { HERO_DOMINO } from '@/config/dominos'
import { MODEL_URLS } from '@/config/models'
import { Domino } from './Domino'

/**
 * Dedicated protagonist: 9-9-domino.glb only.
 * The authored front of this GLB is the logo face — keep that orientation.
 */
export function HeroDomino() {
  return <Domino config={{ ...HERO_DOMINO, model: MODEL_URLS.d99, hero: true }} />
}
