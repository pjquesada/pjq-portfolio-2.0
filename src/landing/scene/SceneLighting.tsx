import { ContactShadows } from '@react-three/drei'
import { useExperience } from '@/landing/experienceContext'

export function SceneLighting() {
  const { breakpoint, reducedMotion } = useExperience()
  const mobile = breakpoint === 'mobile'
  const shadows = !mobile && !reducedMotion

  return (
    <>
      <color attach="background" args={['#0c0b0a']} />
      <fog attach="fog" args={['#0c0b0a', 20, 36]} />
      <hemisphereLight args={['#f8f2e8', '#241e18', mobile ? 0.78 : 0.88]} />
      <ambientLight intensity={0.38} color="#f5eee4" />
      <directionalLight position={[6.2, 5.8, 7.4]} intensity={mobile ? 1.05 : 1.22} color="#fff7ee" />
      <directionalLight position={[0.4, 2.8, 9.2]} intensity={0.62} color="#f6efe4" />
      <directionalLight position={[-5.6, 3.2, 6.0]} intensity={0.5} color="#ebe6de" />
      <directionalLight position={[-2.4, 5.2, -3.2]} intensity={0.14} color="#efe4d4" />
      {shadows ? (
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.16}
          scale={18}
          blur={3.0}
          far={3.6}
          resolution={256}
          color="#000000"
        />
      ) : (
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.1}
          scale={14}
          blur={3.8}
          far={2.8}
          resolution={128}
          color="#000000"
        />
      )}
    </>
  )
}
