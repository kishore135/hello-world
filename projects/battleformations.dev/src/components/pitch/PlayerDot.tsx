import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { PlayerPosition, TeamSide } from '../../types'
import { coordToSvg } from '../../lib/pitchCoords'

interface Props {
  position: PlayerPosition
  side: TeamSide
  color: string
  glowColor: string
}

const DOT_R = 14
const FONT_SIZE = 9

export default function PlayerDot({ position, side, color, glowColor }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: position.id,
    data: { side, positionId: position.id },
  })

  const svgPos = coordToSvg(position.coord, side)

  const style = transform
    ? { transform: CSS.Translate.toString(transform), cursor: 'grabbing', zIndex: 50 }
    : { cursor: 'grab' }

  return (
    <g
      ref={setNodeRef as unknown as React.RefCallback<SVGGElement>}
      {...listeners}
      {...attributes}
      transform={`translate(${svgPos.x}, ${svgPos.y})`}
      style={style}
    >
      {/* Glow effect when dragging */}
      {isDragging && <circle r={DOT_R + 6} fill={glowColor} opacity={0.25} />}

      {/* Ghost dot at original position hint */}
      {isDragging && (
        <circle
          r={DOT_R}
          fill={color}
          opacity={0.15}
          stroke={color}
          strokeWidth={1}
          strokeDasharray="3 2"
        />
      )}

      {/* Main dot */}
      <circle
        r={DOT_R}
        fill={isDragging ? glowColor : color}
        stroke="rgba(255,255,255,0.9)"
        strokeWidth={isDragging ? 2.5 : 2}
        filter={isDragging ? `drop-shadow(0 0 6px ${glowColor})` : undefined}
      />

      {/* Role label */}
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={FONT_SIZE}
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fill="white"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {position.role}
      </text>
    </g>
  )
}
