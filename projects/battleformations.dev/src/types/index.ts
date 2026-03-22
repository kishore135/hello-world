// Normalized pitch coordinate: x in [0,1], y in [0,1]
// x: 0 = left touchline, 1 = right touchline
// y: 0 = own goal line, 1 = halfway line
export interface PitchCoord {
  x: number
  y: number
}

export type PositionRole =
  | 'GK'
  | 'CB'
  | 'LCB'
  | 'RCB'
  | 'LB'
  | 'RB'
  | 'LWB'
  | 'RWB'
  | 'SW'
  | 'CDM'
  | 'LDM'
  | 'RDM'
  | 'CM'
  | 'LCM'
  | 'RCM'
  | 'CAM'
  | 'LAM'
  | 'RAM'
  | 'LM'
  | 'RM'
  | 'LW'
  | 'RW'
  | 'CF'
  | 'ST'
  | 'LST'
  | 'RST'
  | 'SS'
  | 'IF'

export interface PlayerPosition {
  id: string
  role: PositionRole
  coord: PitchCoord
  defaultCoord: PitchCoord
}

export interface FormationDefinition {
  id: string
  label: string
  positions: Omit<PlayerPosition, 'id'>[]
}

export type TeamSide = 'home' | 'away'

export interface TeamState {
  side: TeamSide
  selectedFormationId: string
  positions: PlayerPosition[]
  currentLabel: string
}

export type AnalysisCategory = 'strengths' | 'weaknesses' | 'tricks' | 'tips'

export interface AnalysisSectionData {
  category: AnalysisCategory
  content: string
}

export type AnalysisStatus = 'idle' | 'loading' | 'streaming' | 'complete' | 'error'

export interface AnalysisState {
  homeLabel: string
  awayLabel: string
  sections: AnalysisSectionData[]
  status: AnalysisStatus
  errorMessage?: string
}
