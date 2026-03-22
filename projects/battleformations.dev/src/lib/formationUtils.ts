import type { PlayerPosition, FormationDefinition } from '../types'
import { FORMATIONS } from '../data/formations'

/**
 * Infer a formation label from current player positions using y-band clustering.
 * Excludes the GK, groups outfield players into rows by y-proximity, then
 * joins row counts back→front (lowest y to highest y) with '-'.
 */
export function inferFormationLabel(positions: PlayerPosition[]): string {
  const outfield = positions.filter((p) => p.role !== 'GK').sort((a, b) => a.coord.y - b.coord.y)

  if (outfield.length === 0) return '?'

  const THRESHOLD = 0.12
  const rows: number[] = []
  let currentCount = 1

  for (let i = 1; i < outfield.length; i++) {
    const gap = (outfield[i]?.coord.y ?? 0) - (outfield[i - 1]?.coord.y ?? 0)
    if (gap <= THRESHOLD) {
      currentCount++
    } else {
      rows.push(currentCount)
      currentCount = 1
    }
  }
  rows.push(currentCount)

  return rows.join('-')
}

/**
 * Find the closest canonical formation to current positions by summing
 * Euclidean distances between each player and the nearest canonical player.
 */
export function findClosestFormation(positions: PlayerPosition[]): FormationDefinition {
  let bestFormation = FORMATIONS[0]!
  let bestScore = Infinity

  for (const formation of FORMATIONS) {
    let score = 0
    for (const pos of positions) {
      const canonical = formation.positions
      let minDist = Infinity
      for (const cp of canonical) {
        const dx = pos.coord.x - cp.coord.x
        const dy = pos.coord.y - cp.coord.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < minDist) minDist = dist
      }
      score += minDist
    }
    if (score < bestScore) {
      bestScore = score
      bestFormation = formation
    }
  }

  return bestFormation
}
