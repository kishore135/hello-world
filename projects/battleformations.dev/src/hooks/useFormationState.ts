import { useReducer, useCallback } from 'react'
import type { TeamState, TeamSide, PitchCoord } from '../types'
import { getFormation } from '../data/formations'
import { inferFormationLabel } from '../lib/formationUtils'
import { clampCoord } from '../lib/pitchCoords'

interface State {
  home: TeamState
  away: TeamState
}

type Action =
  | { type: 'SELECT_FORMATION'; side: TeamSide; formationId: string }
  | { type: 'MOVE_PLAYER'; side: TeamSide; playerId: string; newCoord: PitchCoord }
  | { type: 'RESET_FORMATION'; side: TeamSide }

function buildTeamState(side: TeamSide, formationId: string): TeamState {
  const def = getFormation(formationId)
  const positions = def.positions.map((p, i) => ({
    ...p,
    id: `${side}-${p.role}-${i}`,
    coord: { ...p.coord },
    defaultCoord: { ...p.defaultCoord },
  }))
  return {
    side,
    selectedFormationId: formationId,
    positions,
    currentLabel: def.label,
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SELECT_FORMATION': {
      const teamState = buildTeamState(action.side, action.formationId)
      return { ...state, [action.side]: teamState }
    }
    case 'MOVE_PLAYER': {
      const team = state[action.side]
      const newPositions = team.positions.map((p) =>
        p.id === action.playerId ? { ...p, coord: clampCoord(action.newCoord) } : p
      )
      const newLabel = inferFormationLabel(newPositions)
      return {
        ...state,
        [action.side]: { ...team, positions: newPositions, currentLabel: newLabel },
      }
    }
    case 'RESET_FORMATION': {
      const team = state[action.side]
      const resetPositions = team.positions.map((p) => ({ ...p, coord: { ...p.defaultCoord } }))
      const def = getFormation(team.selectedFormationId)
      return {
        ...state,
        [action.side]: { ...team, positions: resetPositions, currentLabel: def.label },
      }
    }
  }
}

export function useFormationState() {
  const [state, dispatch] = useReducer(reducer, null, () => ({
    home: buildTeamState('home', '4-3-3'),
    away: buildTeamState('away', '4-4-2'),
  }))

  const selectFormation = useCallback((side: TeamSide, formationId: string) => {
    dispatch({ type: 'SELECT_FORMATION', side, formationId })
  }, [])

  const movePlayer = useCallback((side: TeamSide, playerId: string, newCoord: PitchCoord) => {
    dispatch({ type: 'MOVE_PLAYER', side, playerId, newCoord })
  }, [])

  const resetFormation = useCallback((side: TeamSide) => {
    dispatch({ type: 'RESET_FORMATION', side })
  }, [])

  return { home: state.home, away: state.away, selectFormation, movePlayer, resetFormation }
}
