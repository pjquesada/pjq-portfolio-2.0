import { ContactShadows } from '@react-three/drei'
import { useExperience } from '@/landing/experienceContext'

export function SceneLighting() {
  const { breakpoint, reducedMotion } = useExperience()
  const mobile = breakpoint === 'mobile'
  const shadows = !mobile && !reducedMotion

  return (
    <>
      <color attach="background" args={['#0c0b0a']} />
      <fog attach="fog" args={['#0c0b0a', 11, 22]} />
      <hemisphereLight args={['#f4eee3', '#0c0b0a', 0.28]} />
      <ambientLight intensity={0.08} color="#f3ece0" />
      <spotLight
        position={[5.2, 9.4, 4.2]}
        angle={0.48}
        penumbra={1}
        intensity={mobile ? 1.05 : 1.35}
        color="#fff4e6"
        distance={28}
        decay={1.6}
      />
      <spotLight
        position={[-6.4, 4.8, 2.4]}
        angle={0.7}
        penumbra={1}
        intensity={0.22}
        color="#d7e0ea"
        distance={24}
        decay={1.8}
      />
      <directionalLight position={[0.4, 3.2, -5.5]} intensity={0.18} color="#f0e6d4" />
      {shadows ? (
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.42}
          scale={18}
          blur={2.2}
          far={3.6}
          resolution={256}
          color="#000000"
        />
      ) : (
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.22}
          scale={14}
          blur={3.4}
          far={2.8}
          resolution={128}
          color="#000000"
        />
      )}
    </>
  )
}
