import type { Breakpoint, CameraPose, CameraSequence } from '@/config/camera'
import { cameraByBreakpoint } from '@/config/camera'
import { HERO_CONFIG, TIMELINE, type DominoConfig, type Vec3Tuple } from '@/config/dominos'
import { lerp, lerpTuple, sampleKeyedScalar, sampleKeyedTuple, span, type TupleKey } from './math'

export type Pose = {
  position: Vec3Tuple
  rotation: Vec3Tuple
  scale: number
}

export type ViewportSize = { width: number; height: number }

const TAU = Math.PI * 2

const heroViewport: Record<Breakpoint, { x: number; y: number; z: number }> = {
  desktop: { x: 0.3, y: 0.5, z: 0.1 },
  tablet: { x: 0.28, y: 0.5, z: 0.08 },
  mobile: { x: 0.5, y: 0.32, z: 0.04 },
}

const heroSettleRotation: Record<Breakpoint, Vec3Tuple> = {
  desktop: [0.36, -0.5, 0.06],
  tablet: [0.32, -0.36, 0.05],
  mobile: [0.52, 0.04, 0],
}

const heroHandoffRotation: Record<Breakpoint, Vec3Tuple> = {
  desktop: [1.18, -0.22, 0.32],
  tablet: [1.05, -0.1, 0.2],
  mobile: [1.25, 0.05, 0.15],
}

export function cameraPoseAt(progress: number, breakpoint: Breakpoint): CameraPose {
  const seq: CameraSequence = cameraByBreakpoint[breakpoint]
  const push = span(progress, TIMELINE.cameraPush.start, TIMELINE.cameraPush.end, 'power2.inOut')
  const toStatement = span(progress, TIMELINE.heroTravel.start, TIMELINE.heroTravel.end, 'power3.out')
  const handoff = span(progress, TIMELINE.handoff.start, TIMELINE.handoff.end, 'power2.in')

  const afterPush: CameraPose = {
    position: lerpTuple(seq.initial.position, seq.pushed.position, push),
    lookAt: lerpTuple(seq.initial.lookAt, seq.pushed.lookAt, push),
    fov: lerp(seq.initial.fov, seq.pushed.fov, push),
  }

  const statement: CameraPose = {
    position: lerpTuple(afterPush.position, seq.statement.position, toStatement),
    lookAt: lerpTuple(afterPush.lookAt, seq.statement.lookAt, toStatement),
    fov: lerp(afterPush.fov, seq.statement.fov, toStatement),
  }

  return {
    position: lerpTuple(statement.position, seq.handoff.position, handoff),
    lookAt: lerpTuple(statement.lookAt, seq.handoff.lookAt, handoff),
    fov: lerp(statement.fov, seq.handoff.fov, handoff),
  }
}

/**
 * Convert a viewport percentage to a world X on a horizontal plane at `planeY`,
 * using the current camera frustum (no hardcoded pixel positions).
 */
export function viewportToWorldX(
  xPct: number,
  planeY: number,
  planeZ: number,
  cameraPosition: Vec3Tuple,
  lookAt: Vec3Tuple,
  fovDeg: number,
  aspect: number,
) {
  const fov = (fovDeg * Math.PI) / 180
  const dx = lookAt[0] - cameraPosition[0]
  const dy = lookAt[1] - cameraPosition[1]
  const dz = lookAt[2] - cameraPosition[2]
  const dist = Math.hypot(dx, dy, dz) || 1
  const camToPlane = Math.abs(cameraPosition[2] - planeZ) || dist
  const halfHeight = Math.tan(fov / 2) * camToPlane
  const halfWidth = halfHeight * aspect
  const ndcX = xPct * 2 - 1
  return lookAt[0] + ndcX * halfWidth + (planeY - lookAt[1]) * (dx / (dist || 1)) * 0.15
}

export function viewportToWorldY(
  yPct: number,
  cameraPosition: Vec3Tuple,
  lookAt: Vec3Tuple,
  fovDeg: number,
  planeZ: number,
) {
  const fov = (fovDeg * Math.PI) / 180
  const camToPlane = Math.abs(cameraPosition[2] - planeZ) || 1
  const halfHeight = Math.tan(fov / 2) * camToPlane
  const ndcY = -(yPct * 2 - 1)
  return lookAt[1] + ndcY * halfHeight
}

export function peripheralPose(config: DominoConfig, progress: number): Pose {
  const t = span(progress, config.scatter.start, config.scatter.end, config.scatter.ease)
  const hide = span(progress, 0.48, 0.62, 'power2.in')
  return {
    position: lerpTuple(config.initial.position, config.scatter.position, t),
    rotation: lerpTuple(config.initial.rotation, config.scatter.rotation, t),
    scale: lerp(config.initial.scale, 0, hide),
  }
}

/**
 * Independent hero timeline.
 *
 * Rotation is keyed in global scroll progress so the reverse (logo) is a
 * brief pass-through around ~π on X, then the double-nine face returns
 * as the animation strongly decelerates into the statement pose.
 */
function heroRotationKeys(initial: Vec3Tuple, settle: Vec3Tuple, twirl: Vec3Tuple): TupleKey[] {
  const rest: Vec3Tuple = [settle[0] + twirl[0], settle[1] + twirl[1], settle[2] + twirl[2]]
  return [
    { at: 0, value: initial },
    { at: 0.16, value: [initial[0] + 0.18, initial[1] + 0.3, initial[2] - 0.12] },
    { at: 0.3, value: [1.05, 1.35, -0.36] },
    { at: 0.4, value: [2.2, 2.2, 0.22] },
    // Reverse / logo toward camera — brief pass only.
    { at: 0.44, value: [Math.PI * 0.98, 2.7, 0.4] },
    { at: 0.48, value: [4.55, 3.55, 0.16] },
    { at: 0.53, value: [5.95, 4.7, 0.1], ease: 'power2.out' },
    { at: 0.6, value: [rest[0] - 0.29, rest[1] - 0.43, rest[2] - 0.04], ease: 'power3.out' },
    { at: TIMELINE.heroTravel.end, value: rest, ease: 'power4.out' },
  ]
}

export function heroPose(
  config: DominoConfig,
  progress: number,
  breakpoint: Breakpoint,
  aspect: number,
): Pose {
  const settle = config.settle ?? HERO_CONFIG.settle
  const handoff = config.handoff ?? HERO_CONFIG.handoff
  if (!settle || !handoff) {
    return {
      position: config.initial.position,
      rotation: config.initial.rotation,
      scale: config.initial.scale,
    }
  }

  const vp = heroViewport[breakpoint]
  const settleRot = heroSettleRotation[breakpoint]
  const travel = span(progress, settle.start, settle.end, settle.ease)
  const cam = cameraPoseAt(Math.min(progress, settle.end), breakpoint)
  const worldX = viewportToWorldX(vp.x, 0.16, vp.z, cam.position, cam.lookAt, cam.fov, aspect)
  const worldY =
    breakpoint === 'mobile'
      ? viewportToWorldY(vp.y, cam.position, cam.lookAt, cam.fov, vp.z) * 0.55 + 0.55
      : 0.1

  const settlePos: Vec3Tuple = [worldX, worldY, vp.z]
  const lift = Math.sin(Math.min(travel, 1) * Math.PI) * (breakpoint === 'mobile' ? 0.28 : 0.48)

  const startPos = config.initial.position
  let position: Vec3Tuple = [
    lerp(startPos[0], settlePos[0], travel),
    lerp(startPos[1], settlePos[1], travel) + lift,
    lerp(startPos[2], settlePos[2], travel),
  ]

  const rotation = sampleKeyedTuple(
    heroRotationKeys(config.initial.rotation, settleRot, settle.twirl),
    progress,
  )

  let scale = sampleKeyedScalar(
    [
      { at: 0, value: config.initial.scale },
      { at: settle.start, value: config.initial.scale },
      { at: settle.end, value: settle.scale, ease: 'power3.out' },
    ],
    progress,
  )

  const hand = span(progress, handoff.start, handoff.end, 'power2.in')
  if (hand > 0) {
    const camNow = cameraPoseAt(progress, breakpoint)
    const toward: Vec3Tuple = [
      lerp(camNow.position[0], camNow.lookAt[0], 0.35),
      lerp(camNow.position[1], camNow.lookAt[1], 0.45),
      lerp(camNow.position[2], camNow.lookAt[2], 0.42),
    ]
    position = lerpTuple(position, toward, hand)
    const rest: Vec3Tuple = [
      settleRot[0] + settle.twirl[0],
      settleRot[1] + settle.twirl[1],
      settleRot[2] + settle.twirl[2],
    ]
    rotation[0] = lerp(rest[0], heroHandoffRotation[breakpoint][0] + TAU, hand)
    rotation[1] = lerp(rest[1], heroHandoffRotation[breakpoint][1] + TAU, hand)
    rotation[2] = lerp(rest[2], heroHandoffRotation[breakpoint][2], hand)
    scale = lerp(scale, handoff.scale, hand)
  }

  return { position, rotation, scale }
}

export function poseFor(
  config: DominoConfig,
  progress: number,
  breakpoint: Breakpoint,
  aspect: number,
): Pose {
  if (config.hero) return heroPose(config, progress, breakpoint, aspect)
  return peripheralPose(config, progress)
}

export function quoteLineProgress(progress: number, index: number) {
  const { start, stagger, duration } = TIMELINE.quote
  return span(progress, start + index * stagger, start + index * stagger + duration, 'power3.out')
}

export function nameProgress(progress: number) {
  return 1 - span(progress, TIMELINE.nameLeave.start, TIMELINE.nameLeave.end, 'power2.inOut')
}

export function veilProgress(progress: number) {
  return span(progress, TIMELINE.handoff.start, TIMELINE.handoff.end, 'power2.in')
}

export function indicatorProgress(progress: number) {
  return 1 - span(progress, TIMELINE.indicatorFade.start, TIMELINE.indicatorFade.end, 'none')
}

export function statementCalm(progress: number) {
  return span(progress, TIMELINE.silence.start - 0.08, TIMELINE.silence.start, 'power2.out')
}
