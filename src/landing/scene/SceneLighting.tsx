import { ContactShadows } from '@react-three/drei'
import { useExperience } from '@/landing/experienceContext'

export function SceneLighting() {
  const { breakpoint, reducedMotion } = useExperience()
  const mobile = breakpoint === 'mobile'
  const shadows = !mobile && !reducedMotion

  return (
    <>
      <color attach="background" args={['#0c0b0a']} />
      <fog attach="fog" args={['#0c0b0a', 22, 40]} />
      {/* Broad, even sky/ground so ivory reads without a table hotspot behind the name. */}
      <hemisphereLight args={['#f8f3ea', '#2a241c', mobile ? 0.92 : 1.08]} />
      <ambientLight intensity={0.46} color="#f3ebe0" />
      {/* Soft key from upper-front-right — off the headline axis. */}
      <directionalLight position={[7.4, 4.6, 8.6]} intensity={mobile ? 0.92 : 1.05} color="#fff6ec" />
      {/* Camera-aligned fill: lifts faces the viewer sees (bevels, pips, logo). */}
      <directionalLight position={[0.2, 2.4, 10.4]} intensity={0.78} color="#f7f0e6" />
      {/* Opposite fill, lower, so the left edge does not fall to black. */}
      <directionalLight position={[-6.2, 2.6, 5.8]} intensity={0.42} color="#ebe4d8" />
      {/* Hairline rim, camera-opposite, only to separate silhouettes. */}
      <directionalLight position={[-1.6, 3.8, -5.4]} intensity={0.12} color="#f0e6d6" />
      {shadows ? (
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.12}
          scale={18}
          blur={3.4}
          far={3.4}
          resolution={256}
          color="#000000"
        />
      ) : (
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.08}
          scale={14}
          blur={4.0}
          far={2.8}
          resolution={128}
          color="#000000"
        />
      )}
    </>
  )
}
