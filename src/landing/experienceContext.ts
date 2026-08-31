import { createContext, useContext, type MutableRefObject } from 'react'
import type { Breakpoint } from '@/config/camera'

export type ExperienceRefs = {
  progress: MutableRefObject<{ value: number }>
  pointer: MutableRefObject<{ x: number; y: number }>
  breakpoint: Breakpoint
  reducedMotion: boolean
}

const ExperienceContext = createContext<ExperienceRefs | null>(null)

export const ExperienceProvider = ExperienceContext.Provider

export function useExperience() {
  const value = useContext(ExperienceContext)
  if (!value) {
    throw new Error('useExperience must be used within ExperienceProvider')
  }
  return value
}
