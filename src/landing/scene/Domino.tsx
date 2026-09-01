import { memo, useMemo, useRef, type ReactNode } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ALL_MODEL_URLS } from '@/config/models'
import type { DominoConfig } from '@/config/dominos'
import { useExperience } from '@/landing/experienceContext'
import { poseFor } from '@/landing/timeline/poses'

ALL_MODEL_URLS.forEach((url) => useGLTF.preload(url))

type Props = {
  config: DominoConfig
  children?: ReactNode
}

function applyMaterialQuality(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    child.castShadow = false
    child.receiveShadow = false
    child.frustumCulled = true
    const materials = Array.isArray(child.material) ? child.material : [child.material]
    for (const material of materials) {
      if (material instanceof THREE.MeshStandardMaterial) {
        // Warm ceramic / ivory resin — not dark plastic, not blown-out white.
        material.metalness = 0
        material.metalnessMap = null
        material.envMapIntensity = 0.06
        material.roughness = THREE.MathUtils.clamp(Math.max(material.roughness, 0.4) * 1.18 + 0.08, 0.52, 0.82)
        material.color.multiplyScalar(1.12)
        material.needsUpdate = true
      }
    }
  })
}

export const Domino = memo(function Domino({ config, children }: Props) {
  const gltf = useGLTF(config.model)
  const { progress, breakpoint, reducedMotion } = useExperience()
  const groupRef = useRef<THREE.Group>(null)

  const cloned = useMemo(() => {
    const scene = gltf.scene.clone(true)
    applyMaterialQuality(scene)
    return scene
  }, [gltf.scene])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    const aspect = state.viewport.aspect
    const t = reducedMotion ? 0 : progress.current.value
    const pose = poseFor(config, t, breakpoint, aspect)
    group.position.set(...pose.position)
    group.rotation.set(...pose.rotation)
    group.scale.setScalar(pose.scale)

    if (!reducedMotion && t < 0.14 && !config.hero) {
      const seed = config.id.length * 0.7
      const fade = 1 - t / 0.14
      const settle = Math.exp(-state.clock.elapsedTime * 1.4)
      group.position.y += Math.sin(state.clock.elapsedTime * 1.6 + seed) * 0.006 * fade * (0.2 + settle)
      group.rotation.z += Math.sin(state.clock.elapsedTime * 0.9 + seed) * 0.004 * fade * settle
    }
  })

  const meshRotation = config.meshRotation ?? ([0, 0, 0] as const)

  return (
    <group ref={groupRef}>
      <group rotation={meshRotation}>
        <primitive object={cloned} />
      </group>
      {children}
    </group>
  )
})
