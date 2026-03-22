import {
  PITCH_WIDTH,
  PITCH_HEIGHT,
  HALF_HEIGHT,
  PENALTY_BOX_W,
  PENALTY_BOX_H,
  GOAL_BOX_W,
  GOAL_BOX_H,
  GOAL_W,
  GOAL_H,
  PENALTY_SPOT_DIST,
  CENTER_CIRCLE_R,
} from '../../data/pitch'

const LINE = 'rgba(255,255,255,0.75)'
const LINE_W = 1.5
const GRASS = '#2d5a27'
const GRASS_STRIPE = '#345e2d'
const STRIPE_COUNT = 7

export default function SoccerPitch() {
  const stripeH = PITCH_HEIGHT / (STRIPE_COUNT * 2)
  const cx = PITCH_WIDTH / 2

  return (
    <>
      {/* Grass stripes */}
      {Array.from({ length: STRIPE_COUNT * 2 }).map((_, i) => (
        <rect
          key={i}
          x={0}
          y={i * stripeH}
          width={PITCH_WIDTH}
          height={stripeH}
          fill={i % 2 === 0 ? GRASS : GRASS_STRIPE}
        />
      ))}

      {/* Outer boundary */}
      <rect
        x={0}
        y={0}
        width={PITCH_WIDTH}
        height={PITCH_HEIGHT}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W * 2}
      />

      {/* Halfway line */}
      <line
        x1={0}
        y1={HALF_HEIGHT}
        x2={PITCH_WIDTH}
        y2={HALF_HEIGHT}
        stroke={LINE}
        strokeWidth={LINE_W}
      />

      {/* Center circle */}
      <circle
        cx={cx}
        cy={HALF_HEIGHT}
        r={CENTER_CIRCLE_R}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
      <circle cx={cx} cy={HALF_HEIGHT} r={3} fill={LINE} />

      {/* === BOTTOM (HOME) HALF === */}
      {/* Penalty box */}
      <rect
        x={(PITCH_WIDTH - PENALTY_BOX_W) / 2}
        y={PITCH_HEIGHT - PENALTY_BOX_H}
        width={PENALTY_BOX_W}
        height={PENALTY_BOX_H}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
      {/* Goal box */}
      <rect
        x={(PITCH_WIDTH - GOAL_BOX_W) / 2}
        y={PITCH_HEIGHT - GOAL_BOX_H}
        width={GOAL_BOX_W}
        height={GOAL_BOX_H}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
      {/* Goal */}
      <rect
        x={(PITCH_WIDTH - GOAL_W) / 2}
        y={PITCH_HEIGHT}
        width={GOAL_W}
        height={GOAL_H}
        fill="rgba(255,255,255,0.08)"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
      {/* Penalty spot */}
      <circle cx={cx} cy={PITCH_HEIGHT - PENALTY_SPOT_DIST} r={3} fill={LINE} />
      {/* Penalty arc */}
      <path
        d={`M ${cx - 60} ${PITCH_HEIGHT - PENALTY_BOX_H}
            A 70 70 0 0 0 ${cx + 60} ${PITCH_HEIGHT - PENALTY_BOX_H}`}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
      {/* Corner arcs */}
      <path
        d={`M 0 ${PITCH_HEIGHT - 16} A 16 16 0 0 0 16 ${PITCH_HEIGHT}`}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
      <path
        d={`M ${PITCH_WIDTH} ${PITCH_HEIGHT - 16} A 16 16 0 0 1 ${PITCH_WIDTH - 16} ${PITCH_HEIGHT}`}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W}
      />

      {/* === TOP (AWAY) HALF === */}
      {/* Penalty box */}
      <rect
        x={(PITCH_WIDTH - PENALTY_BOX_W) / 2}
        y={0}
        width={PENALTY_BOX_W}
        height={PENALTY_BOX_H}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
      {/* Goal box */}
      <rect
        x={(PITCH_WIDTH - GOAL_BOX_W) / 2}
        y={0}
        width={GOAL_BOX_W}
        height={GOAL_BOX_H}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
      {/* Goal */}
      <rect
        x={(PITCH_WIDTH - GOAL_W) / 2}
        y={-GOAL_H}
        width={GOAL_W}
        height={GOAL_H}
        fill="rgba(255,255,255,0.08)"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
      {/* Penalty spot */}
      <circle cx={cx} cy={PENALTY_SPOT_DIST} r={3} fill={LINE} />
      {/* Penalty arc */}
      <path
        d={`M ${cx - 60} ${PENALTY_BOX_H}
            A 70 70 0 0 1 ${cx + 60} ${PENALTY_BOX_H}`}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
      {/* Corner arcs */}
      <path d={`M 0 16 A 16 16 0 0 1 16 0`} fill="none" stroke={LINE} strokeWidth={LINE_W} />
      <path
        d={`M ${PITCH_WIDTH} 16 A 16 16 0 0 0 ${PITCH_WIDTH - 16} 0`}
        fill="none"
        stroke={LINE}
        strokeWidth={LINE_W}
      />
    </>
  )
}
