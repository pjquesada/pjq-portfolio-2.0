import type { Breakpoint, CameraPose, CameraSequence } from '@/config/camera'
import { cameraByBreakpoint } from '@/config/camera'
import type { DominoConfig, Vec3Tuple } from '@/config/dominos'
import { TIMELINE } from '@/config/dominos'
import { lerp, lerpTuple, span } from './math'

export type Pose = {
  position: Vec3Tuple
  rotation: Vec3Tuple
  scale: number
}

export type ViewportSize = { width: number; height: number }

const heroViewport: Record<Breakpoint, { x: number; y: number; z: number }> = {
  desktop: { x: 0.29, y: 0.5, z: 3.05 },
  tablet: { x: 0.28, y: 0.5, z: 2.55 },
  mobile: { x: 0.5, y: 0.3, z: 2.05 },
}

const heroSettleRotation: Record<Breakpoint, Vec3Tuple> = {
  desktop: [0.52, -0.32, 0.04],
  tablet: [0.48, -0.22, 0.03],
  mobile: [0.62, 0.04, 0],
}

const heroHandoffRotation: Record<Breakpoint, Vec3Tuple> = {
  desktop: [1.18, -0.22, 0.32],
  tablet: [1.05, -0.1, 0.2],
  mobile: [1.25, 0.05, 0.15],
}

export function cameraPoseAt(progress: number, breakpoint: Breakpoint): CameraPose {
  const seq: CameraSequence = cameraByBreakpoint[breakpoint]
  const push = span(progress, TIMELINE.cameraPush.start, TIMELINE.cameraPush.end, 'power2.inOut')
  const toStatement = span(progress, 0.45, 0.78, 'power3.out')
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
  return {
    position: lerpTuple(config.initial.position, config.scatter.position, t),
    rotation: lerpTuple(config.initial.rotation, config.scatter.rotation, t),
    scale: config.initial.scale,
  }
}

export function heroPose(
  config: DominoConfig,
  progress: number,
  breakpoint: Breakpoint,
  aspect: number,
): Pose {
  const settle = config.settle
  const handoff = config.handoff
  if (!settle || !handoff) {
    return {
      position: config.initial.position,
      rotation: config.initial.rotation,
      scale: config.initial.scale,
    }
  }

  const cam = cameraPoseAt(Math.min(progress, settle.end), breakpoint)
  const vp = heroViewport[breakpoint]
  const settleRot = heroSettleRotation[breakpoint]
  const worldX = viewportToWorldX(
    vp.x,
    1.05,
    vp.z,
    cam.position,
    cam.lookAt,
    cam.fov,
    aspect,
  )
  const worldY = viewportToWorldY(vp.y, cam.position, cam.lookAt, cam.fov, vp.z)

  const settlePos: Vec3Tuple = [worldX, worldY, vp.z]
  const travel = span(progress, settle.start, settle.end, settle.ease)
  const spin = span(progress, settle.start, settle.end, settle.twirlEase ?? settle.ease)

  // Full turns return to the authored front (logo). No extra half-flip onto the pips.
  const spun: Vec3Tuple = [
    settleRot[0] + settle.twirl[0],
    settleRot[1] + settle.twirl[1],
    settleRot[2] + settle.twirl[2],
  ]

  let position = lerpTuple(config.initial.position, settlePos, travel)
  let rotation = lerpTuple(config.initial.rotation, spun, spin)
  let scale = lerp(config.initial.scale, settle.scale, travel)

  const hand = span(progress, handoff.start, handoff.end, 'power2.in')
  if (hand > 0) {
    const camNow = cameraPoseAt(progress, breakpoint)
    const toward: Vec3Tuple = [
      lerp(camNow.position[0], camNow.lookAt[0], 0.35),
      lerp(camNow.position[1], camNow.lookAt[1], 0.45),
      lerp(camNow.position[2], camNow.lookAt[2], 0.42),
    ]
    position = lerpTuple(position, toward, hand)
    rotation = lerpTuple(rotation, heroHandoffRotation[breakpoint], hand)
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
