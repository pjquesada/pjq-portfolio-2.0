export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

export type Vec3Tuple = [number, number, number]

export type CameraPose = {
  position: Vec3Tuple
  lookAt: Vec3Tuple
  fov: number
}

export type CameraSequence = {
  initial: CameraPose
  pushed: CameraPose
  statement: CameraPose
  handoff: CameraPose
}

export const cameraByBreakpoint: Record<Breakpoint, CameraSequence> = {
  desktop: {
    initial: {
      position: [0, 6.35, 9.6],
      lookAt: [0, 0.04, 0.05],
      fov: 28,
    },
    pushed: {
      position: [0.05, 4.85, 7.35],
      lookAt: [0, 0.08, 0],
      fov: 26.5,
    },
    statement: {
      position: [0.2, 4.15, 6.7],
      lookAt: [-0.55, 0.14, 0],
      fov: 28,
    },
    handoff: {
      position: [-0.4, 1.55, 2.35],
      lookAt: [-1.7, 0.55, 0.1],
      fov: 34,
    },
  },
  tablet: {
    initial: {
      position: [0, 7.1, 9.2],
      lookAt: [0, 0.06, 0],
      fov: 32,
    },
    pushed: {
      position: [0, 5.4, 7.4],
      lookAt: [0, 0.1, 0],
      fov: 30,
    },
    statement: {
      position: [0.1, 4.6, 6.8],
      lookAt: [-0.35, 0.2, 0],
      fov: 31,
    },
    handoff: {
      position: [-0.2, 1.8, 2.6],
      lookAt: [-1.2, 0.5, 0],
      fov: 36,
    },
  },
  mobile: {
    initial: {
      position: [0, 6.8, 8.4],
      lookAt: [0, 0.08, 0],
      fov: 34,
    },
    pushed: {
      position: [0, 5.6, 7.1],
      lookAt: [0, 0.35, 0],
      fov: 32,
    },
    statement: {
      position: [0, 5.2, 6.4],
      lookAt: [0, 0.95, 0],
      fov: 33,
    },
    handoff: {
      position: [0, 2.2, 2.8],
      lookAt: [0, 1.1, 0],
      fov: 38,
    },
  },
}

export const cameraParallax = {
  desktop: { x: 0.22, y: 0.1 },
  tablet: { x: 0.12, y: 0.06 },
  mobile: { x: 0, y: 0 },
} as const
