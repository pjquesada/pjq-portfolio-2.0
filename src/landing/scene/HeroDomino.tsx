import { useLayoutEffect, useMemo, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HERO_CONFIG } from '@/config/dominos'
import { HERO_LOGO_URL, HERO_MODEL_URL } from '@/config/models'
import { useExperience } from '@/landing/experienceContext'
import { heroPose } from '@/landing/timeline/poses'
import { applyMaterialQuality } from './materials'

useGLTF.preload(HERO_MODEL_URL)
useTexture.preload(HERO_LOGO_URL)

/**
 * Dedicated double-nine protagonist. Always loads 9-9-domino.glb and is
 * animated on its own timeline — never mixed into the scatter field.
 */
export function HeroDomino() {
  const gltf = useGLTF(HERO_MODEL_URL)
  const texture = useTexture(HERO_CONFIG.logo ?? HERO_LOGO_URL)
  const { progress, breakpoint, reducedMotion } = useExperience()
  const groupRef = useRef<THREE.Group>(null)

  const cloned = useMemo(() => {
    const scene = gltf.scene.clone(true)
    applyMaterialQuality(scene)
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) child.frustumCulled = false
    })
    return scene
  }, [gltf.scene])

  useLayoutEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    texture.needsUpdate = true
  }, [texture])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    const aspect = state.viewport.aspect
    const t = reducedMotion ? 0 : progress.current.value
    const pose = heroPose(HERO_CONFIG, t, breakpoint, aspect)
    group.position.set(...pose.position)
    group.rotation.set(...pose.rotation)
    group.scale.setScalar(pose.scale)

    if (!reducedMotion && t < 0.12) {
      const fade = 1 - t / 0.12
      const settle = Math.exp(-state.clock.elapsedTime * 1.15)
      group.position.y += Math.sin(state.clock.elapsedTime * 1.25) * 0.005 * fade * (0.18 + settle)
      group.rotation.z += Math.sin(state.clock.elapsedTime * 0.7) * 0.003 * fade * settle
    }
  })

  return (
    <group ref={groupRef} name="HeroDomino" renderOrder={1}>
      <primitive object={cloned} />
      {/* Reverse-face decal: visible as a brief reveal during the twirl, not on the pip face. */}
      <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, Math.PI, 0]} renderOrder={2}>
        <planeGeometry args={[0.38, 0.5]} />
        <meshStandardMaterial
          map={texture}
          transparent
          roughness={0.58}
          metalness={0}
          envMapIntensity={0.18}
          polygonOffset
          polygonOffsetFactor={-2}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
