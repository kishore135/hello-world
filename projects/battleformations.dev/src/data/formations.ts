import type { FormationDefinition, PositionRole, PitchCoord } from '../types'

function pos(
  role: PositionRole,
  x: number,
  y: number
): { role: PositionRole; coord: PitchCoord; defaultCoord: PitchCoord } {
  return { role, coord: { x, y }, defaultCoord: { x, y } }
}

export const FORMATIONS: FormationDefinition[] = [
  {
    id: '4-4-2',
    label: '4-4-2',
    positions: [
      pos('GK', 0.5, 0.06),
      pos('LB', 0.12, 0.25),
      pos('CB', 0.37, 0.21),
      pos('CB', 0.63, 0.21),
      pos('RB', 0.88, 0.25),
      pos('LM', 0.1, 0.55),
      pos('LCM', 0.35, 0.52),
      pos('RCM', 0.65, 0.52),
      pos('RM', 0.9, 0.55),
      pos('LST', 0.37, 0.84),
      pos('RST', 0.63, 0.84),
    ],
  },
  {
    id: '4-3-3',
    label: '4-3-3',
    positions: [
      pos('GK', 0.5, 0.06),
      pos('LB', 0.12, 0.25),
      pos('CB', 0.37, 0.21),
      pos('CB', 0.63, 0.21),
      pos('RB', 0.88, 0.25),
      pos('LCM', 0.25, 0.55),
      pos('CM', 0.5, 0.58),
      pos('RCM', 0.75, 0.55),
      pos('LW', 0.12, 0.84),
      pos('CF', 0.5, 0.88),
      pos('RW', 0.88, 0.84),
    ],
  },
  {
    id: '4-2-3-1',
    label: '4-2-3-1',
    positions: [
      pos('GK', 0.5, 0.06),
      pos('LB', 0.12, 0.25),
      pos('CB', 0.37, 0.21),
      pos('CB', 0.63, 0.21),
      pos('RB', 0.88, 0.25),
      pos('LDM', 0.35, 0.43),
      pos('RDM', 0.65, 0.43),
      pos('LAM', 0.15, 0.67),
      pos('CAM', 0.5, 0.69),
      pos('RAM', 0.85, 0.67),
      pos('ST', 0.5, 0.88),
    ],
  },
  {
    id: '3-5-2',
    label: '3-5-2',
    positions: [
      pos('GK', 0.5, 0.06),
      pos('LCB', 0.25, 0.22),
      pos('CB', 0.5, 0.19),
      pos('RCB', 0.75, 0.22),
      pos('LWB', 0.06, 0.52),
      pos('LCM', 0.28, 0.54),
      pos('CM', 0.5, 0.57),
      pos('RCM', 0.72, 0.54),
      pos('RWB', 0.94, 0.52),
      pos('LST', 0.37, 0.84),
      pos('RST', 0.63, 0.84),
    ],
  },
  {
    id: '5-3-2',
    label: '5-3-2',
    positions: [
      pos('GK', 0.5, 0.06),
      pos('LWB', 0.06, 0.3),
      pos('LCB', 0.25, 0.21),
      pos('CB', 0.5, 0.19),
      pos('RCB', 0.75, 0.21),
      pos('RWB', 0.94, 0.3),
      pos('LCM', 0.25, 0.57),
      pos('CM', 0.5, 0.6),
      pos('RCM', 0.75, 0.57),
      pos('LST', 0.37, 0.84),
      pos('RST', 0.63, 0.84),
    ],
  },
  {
    id: '3-4-3',
    label: '3-4-3',
    positions: [
      pos('GK', 0.5, 0.06),
      pos('LCB', 0.25, 0.22),
      pos('CB', 0.5, 0.19),
      pos('RCB', 0.75, 0.22),
      pos('LM', 0.1, 0.52),
      pos('LCM', 0.37, 0.54),
      pos('RCM', 0.63, 0.54),
      pos('RM', 0.9, 0.52),
      pos('LW', 0.18, 0.84),
      pos('CF', 0.5, 0.88),
      pos('RW', 0.82, 0.84),
    ],
  },
  {
    id: '4-5-1',
    label: '4-5-1',
    positions: [
      pos('GK', 0.5, 0.06),
      pos('LB', 0.12, 0.25),
      pos('CB', 0.37, 0.21),
      pos('CB', 0.63, 0.21),
      pos('RB', 0.88, 0.25),
      pos('LM', 0.08, 0.57),
      pos('LCM', 0.28, 0.54),
      pos('CM', 0.5, 0.57),
      pos('RCM', 0.72, 0.54),
      pos('RM', 0.92, 0.57),
      pos('ST', 0.5, 0.88),
    ],
  },
  {
    id: '4-1-4-1',
    label: '4-1-4-1',
    positions: [
      pos('GK', 0.5, 0.06),
      pos('LB', 0.12, 0.25),
      pos('CB', 0.37, 0.21),
      pos('CB', 0.63, 0.21),
      pos('RB', 0.88, 0.25),
      pos('CDM', 0.5, 0.41),
      pos('LM', 0.1, 0.63),
      pos('LCM', 0.33, 0.61),
      pos('RCM', 0.67, 0.61),
      pos('RM', 0.9, 0.63),
      pos('ST', 0.5, 0.88),
    ],
  },
  {
    id: '4-3-3-d',
    label: '4-3-3 (D)',
    positions: [
      pos('GK', 0.5, 0.06),
      pos('LB', 0.12, 0.25),
      pos('CB', 0.37, 0.21),
      pos('CB', 0.63, 0.21),
      pos('RB', 0.88, 0.25),
      pos('CDM', 0.5, 0.42),
      pos('LCM', 0.28, 0.57),
      pos('RCM', 0.72, 0.57),
      pos('LW', 0.12, 0.84),
      pos('CF', 0.5, 0.88),
      pos('RW', 0.88, 0.84),
    ],
  },
  {
    id: '5-4-1',
    label: '5-4-1',
    positions: [
      pos('GK', 0.5, 0.06),
      pos('LWB', 0.06, 0.3),
      pos('LCB', 0.25, 0.21),
      pos('CB', 0.5, 0.19),
      pos('RCB', 0.75, 0.21),
      pos('RWB', 0.94, 0.3),
      pos('LM', 0.12, 0.57),
      pos('LCM', 0.37, 0.54),
      pos('RCM', 0.63, 0.54),
      pos('RM', 0.88, 0.57),
      pos('ST', 0.5, 0.88),
    ],
  },
]

export const FORMATIONS_MAP = new Map(FORMATIONS.map((f) => [f.id, f]))

export function getFormation(id: string): FormationDefinition {
  const f = FORMATIONS_MAP.get(id)
  if (!f) throw new Error(`Unknown formation: ${id}`)
  return f
}
