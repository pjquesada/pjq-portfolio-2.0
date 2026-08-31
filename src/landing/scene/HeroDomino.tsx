import { useLayoutEffect } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { HERO_LOGO_URL } from '@/config/models'
import type { DominoConfig } from '@/config/dominos'
import { Domino } from './Domino'

useTexture.preload(HERO_LOGO_URL)

type Props = {
  config: DominoConfig
}

export function HeroDomino({ config }: Props) {
  const texture = useTexture(config.logo ?? HERO_LOGO_URL)

  useLayoutEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    texture.needsUpdate = true
  }, [texture])

  return (
    <Domino config={config}>
      <mesh position={[0, 0.198, 0.012]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
        <planeGeometry args={[0.33, 0.44]} />
        <meshStandardMaterial
          map={texture}
          transparent
          roughness={0.64}
          metalness={0}
          envMapIntensity={0.15}
          polygonOffset
          polygonOffsetFactor={-2}
          depthWrite={false}
        />
      </mesh>
    </Domino>
  )
}
