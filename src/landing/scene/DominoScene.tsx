import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { scatterForBreakpoint } from '@/config/dominos'
import { cameraByBreakpoint } from '@/config/camera'
import { useExperience } from '@/landing/experienceContext'
import { CameraRig } from './CameraRig'
import { Domino } from './Domino'
import { HeroDomino } from './HeroDomino'
import { SceneLighting } from './SceneLighting'

export function DominoScene() {
  const { breakpoint, reducedMotion } = useExperience()
  const scatter = scatterForBreakpoint(breakpoint)
  const initial = cameraByBreakpoint[breakpoint].initial
  const dprMax = breakpoint === 'mobile' ? 1.25 : 1.6

  return (
    <Canvas
      className="domino-canvas"
      dpr={[1, dprMax]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.12,
      }}
      camera={{
        position: initial.position,
        fov: initial.fov,
        near: 0.1,
        far: 48,
      }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      onCreated={({ gl, camera, invalidate }) => {
        gl.setClearColor('#0c0b0a', 1)
        camera.lookAt(...initial.lookAt)
        invalidate()
      }}
    >
      <SceneLighting />
      <CameraRig />
      <HeroDomino />
      {scatter.map((config) => (
        <Domino key={config.id} config={config} />
      ))}
    </Canvas>
  )
}
