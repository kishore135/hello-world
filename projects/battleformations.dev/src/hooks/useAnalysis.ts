import { useState, useCallback } from 'react'
import type { AnalysisState, AnalysisSectionData } from '../types'
import { streamAnalysis } from '../lib/claude'

const EMPTY_SECTIONS: AnalysisSectionData[] = [
  { category: 'strengths', content: '' },
  { category: 'weaknesses', content: '' },
  { category: 'tricks', content: '' },
  { category: 'tips', content: '' },
]

export function useAnalysis() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    homeLabel: '',
    awayLabel: '',
    sections: EMPTY_SECTIONS,
    status: 'idle',
  })

  const generateAnalysis = useCallback(async (homeLabel: string, awayLabel: string) => {
    setAnalysisState({
      homeLabel,
      awayLabel,
      sections: EMPTY_SECTIONS,
      status: 'loading',
    })

    await streamAnalysis(
      homeLabel,
      awayLabel,
      (sections) => {
        setAnalysisState((prev) => ({ ...prev, sections, status: 'streaming' }))
      },
      (sections) => {
        setAnalysisState((prev) => ({ ...prev, sections, status: 'complete' }))
      },
      (errorMessage) => {
        setAnalysisState((prev) => ({ ...prev, status: 'error', errorMessage }))
      }
    )
  }, [])

  const clearAnalysis = useCallback(() => {
    setAnalysisState({ homeLabel: '', awayLabel: '', sections: EMPTY_SECTIONS, status: 'idle' })
  }, [])

  return { analysisState, generateAnalysis, clearAnalysis }
}
