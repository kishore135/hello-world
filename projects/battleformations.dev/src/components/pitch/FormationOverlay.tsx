import type { TeamState } from '../../types'
import PlayerDot from './PlayerDot'

interface Props {
  team: TeamState
  color: string
  glowColor: string
}

export default function FormationOverlay({ team, color, glowColor }: Props) {
  return (
    <>
      {team.positions.map((pos) => (
        <PlayerDot
          key={pos.id}
          position={pos}
          side={team.side}
          color={color}
          glowColor={glowColor}
        />
      ))}
    </>
  )
}
