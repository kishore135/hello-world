import { useRef } from 'react'
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { TeamState, TeamSide, PitchCoord } from '../../types'
import { PITCH_WIDTH, PITCH_HEIGHT } from '../../data/pitch'
import { svgDeltaToCoord } from '../../lib/pitchCoords'
import SoccerPitch from './SoccerPitch'
import FormationOverlay from './FormationOverlay'

interface Props {
  home: TeamState
  away: TeamState
  onMovePlayer: (side: TeamSide, playerId: string, newCoord: PitchCoord) => void
}

const HOME_COLOR = '#3b82f6'
const HOME_GLOW = '#60a5fa'
const AWAY_COLOR = '#ef4444'
const AWAY_GLOW = '#f87171'

export default function PitchArena({ home, away, onMovePlayer }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event
    if (!active.data.current || !svgRef.current) return

    const { side, positionId } = active.data.current as { side: TeamSide; positionId: string }
    const team = side === 'home' ? home : away
    const player = team.positions.find((p) => p.id === positionId)
    if (!player) return

    const svgRect = svgRef.current.getBoundingClientRect()
    const { dx, dy } = svgDeltaToCoord(delta.x, delta.y, side, svgRect)

    const newCoord: PitchCoord = {
      x: player.coord.x + dx,
      y: player.coord.y + dy,
    }

    onMovePlayer(side, positionId, newCoord)
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="relative w-full rounded-xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${PITCH_WIDTH} ${PITCH_HEIGHT}`}
          className="w-full h-auto block"
          style={{ touchAction: 'none' }}
        >
          <SoccerPitch />
          <FormationOverlay team={away} color={AWAY_COLOR} glowColor={AWAY_GLOW} />
          <FormationOverlay team={home} color={HOME_COLOR} glowColor={HOME_GLOW} />
        </svg>
      </div>
    </DndContext>
  )
}
