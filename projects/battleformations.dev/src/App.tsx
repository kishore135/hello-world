import { useFormationState } from './hooks/useFormationState'
import { useAnalysis } from './hooks/useAnalysis'
import PitchArena from './components/pitch/PitchArena'
import FormationSelector from './components/formation-selector/FormationSelector'
import AnalysisPanel from './components/analysis/AnalysisPanel'

export default function App() {
  const { home, away, selectFormation, movePlayer, resetFormation } = useFormationState()
  const { analysisState, generateAnalysis } = useAnalysis()

  function handleAnalyze() {
    generateAnalysis(home.currentLabel, away.currentLabel)
  }

  return (
    <div className="min-h-screen bg-surface-base text-white font-body">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚽</span>
            <div>
              <h1 className="font-display font-bold text-white text-xl leading-none">
                battleformations<span className="text-amber-400">.dev</span>
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">AI-powered tactical football analysis</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
            <span>Drag players to reshape formations</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_480px] gap-6">
          {/* Left: Pitch + formation selectors */}
          <div className="flex flex-col gap-4">
            {/* Formation selectors */}
            <div className="grid grid-cols-2 gap-4 bg-surface-card rounded-xl border border-white/5 p-4">
              <FormationSelector
                side="away"
                value={away.selectedFormationId}
                currentLabel={away.currentLabel}
                onChange={(id) => selectFormation('away', id)}
                onReset={() => resetFormation('away')}
              />
              <FormationSelector
                side="home"
                value={home.selectedFormationId}
                currentLabel={home.currentLabel}
                onChange={(id) => selectFormation('home', id)}
                onReset={() => resetFormation('home')}
              />
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Away team (top)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Home team (bottom)</span>
              </div>
            </div>

            {/* Pitch */}
            <PitchArena home={home} away={away} onMovePlayer={movePlayer} />

            <p className="text-center text-xs text-slate-600">
              Drag any player dot to a new position • Formation labels update automatically
            </p>
          </div>

          {/* Right: Analysis panel */}
          <div className="bg-surface-card rounded-xl border border-white/5 p-4">
            <AnalysisPanel
              analysisState={analysisState}
              homeLabel={home.currentLabel}
              awayLabel={away.currentLabel}
              onGenerate={handleAnalyze}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
