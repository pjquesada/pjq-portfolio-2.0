import { ContactShadows } from '@react-three/drei'
import { useExperience } from '@/landing/experienceContext'

export function SceneLighting() {
  const { breakpoint, reducedMotion } = useExperience()
  const mobile = breakpoint === 'mobile'
  const shadows = !mobile && !reducedMotion

  return (
    <>
      <color attach="background" args={['#0c0b0a']} />
      <fog attach="fog" args={['#0c0b0a', 18, 32]} />
      <hemisphereLight args={['#f7f1e6', '#1c1814', mobile ? 0.62 : 0.7]} />
      <ambientLight intensity={0.28} color="#f4ece0" />
      <directionalLight
        position={[5.8, 6.4, 6.2]}
        intensity={mobile ? 1.15 : 1.35}
        color="#fff6ea"
      />
      <directionalLight position={[-5.2, 3.6, 5.4]} intensity={0.48} color="#ece7df" />
      <directionalLight position={[-2.2, 4.8, -3.6]} intensity={0.16} color="#f0e4d2" />
      {shadows ? (
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.22}
          scale={18}
          blur={2.8}
          far={3.6}
          resolution={256}
          color="#000000"
        />
      ) : (
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.14}
          scale={14}
          blur={3.6}
          far={2.8}
          resolution={128}
          color="#000000"
        />
      )}
    </>
  )
}
