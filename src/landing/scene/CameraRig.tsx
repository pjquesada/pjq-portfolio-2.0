import { useLayoutEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { cameraParallax } from '@/config/camera'
import { useExperience } from '@/landing/experienceContext'
import { cameraPoseAt } from '@/landing/timeline/poses'

const look = new THREE.Vector3()
const desired = new THREE.Vector3()
const parallax = new THREE.Vector3()
const currentLook = new THREE.Vector3()

export function CameraRig() {
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const { progress, pointer, breakpoint, reducedMotion } = useExperience()
  const lookTarget = useRef(new THREE.Vector3())

  useLayoutEffect(() => {
    const pose = cameraPoseAt(progress.current.value, breakpoint)
    camera.position.set(...pose.position)
    lookTarget.current.set(...pose.lookAt)
    camera.lookAt(lookTarget.current)
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = pose.fov
      camera.aspect = size.width / Math.max(size.height, 1)
      camera.updateProjectionMatrix()
    }
  }, [breakpoint, camera, progress, size.height, size.width])

  useFrame((state, delta) => {
    const tProgress = reducedMotion ? 0 : progress.current.value
    const pose = cameraPoseAt(tProgress, breakpoint)
    const amount = cameraParallax[breakpoint]
    const handoff = Math.max(0, (tProgress - 0.88) / 0.12)
    const damp = 1 - Math.exp(-delta * 2.6)

    parallax.set(
      pointer.current.x * amount.x * (1 - handoff),
      -pointer.current.y * amount.y * (1 - handoff),
      0,
    )

    desired.set(...pose.position).add(parallax)

    if (!reducedMotion && tProgress < 0.12) {
      const fade = 1 - tProgress / 0.12
      desired.x += Math.sin(state.clock.elapsedTime * 0.16) * 0.04 * fade
      desired.y += Math.cos(state.clock.elapsedTime * 0.12) * 0.018 * fade
    }

    camera.position.lerp(desired, damp)
    look.set(...pose.lookAt)
    lookTarget.current.lerp(look, damp)
    currentLook.copy(lookTarget.current)
    camera.lookAt(currentLook)

    if (camera instanceof THREE.PerspectiveCamera && Math.abs(camera.fov - pose.fov) > 0.02) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, pose.fov, damp)
      camera.updateProjectionMatrix()
    }
  })

  return null
}
