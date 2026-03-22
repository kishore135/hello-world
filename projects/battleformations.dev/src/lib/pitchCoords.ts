import type { PitchCoord, TeamSide } from '../types'
import { PITCH_WIDTH, PITCH_HEIGHT, HALF_HEIGHT } from '../data/pitch'

/**
 * Convert a normalized pitch coord to SVG coordinates.
 * Layout is stacked: home = bottom half, away = top half (mirrored).
 */
export function coordToSvg(coord: PitchCoord, side: TeamSide): { x: number; y: number } {
  if (side === 'home') {
    return {
      x: coord.x * PITCH_WIDTH,
      y: PITCH_HEIGHT - coord.y * HALF_HEIGHT,
    }
  } else {
    // Away side is top half, mirrored horizontally and vertically
    return {
      x: (1 - coord.x) * PITCH_WIDTH,
      y: coord.y * HALF_HEIGHT,
    }
  }
}

/**
 * Convert SVG pixel delta (from dnd-kit) back to normalized coord delta.
 * svgRect is the bounding rect of the SVG element in screen pixels.
 */
export function svgDeltaToCoord(
  deltaX: number,
  deltaY: number,
  side: TeamSide,
  svgRect: DOMRect
): { dx: number; dy: number } {
  const scaleX = PITCH_WIDTH / svgRect.width
  const scaleY = PITCH_HEIGHT / svgRect.height

  const svgDx = deltaX * scaleX
  const svgDy = deltaY * scaleY

  if (side === 'home') {
    return {
      dx: svgDx / PITCH_WIDTH,
      dy: -svgDy / HALF_HEIGHT,
    }
  } else {
    return {
      dx: -svgDx / PITCH_WIDTH,
      dy: svgDy / HALF_HEIGHT,
    }
  }
}

export function clampCoord(coord: PitchCoord): PitchCoord {
  return {
    x: Math.max(0.02, Math.min(0.98, coord.x)),
    y: Math.max(0.03, Math.min(0.97, coord.y)),
  }
}
