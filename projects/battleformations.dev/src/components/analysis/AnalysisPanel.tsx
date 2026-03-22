import type { AnalysisState, AnalysisCategory } from '../../types'

interface Props {
  analysisState: AnalysisState
  homeLabel: string
  awayLabel: string
  onGenerate: () => void
}

const SECTION_CONFIG: Record<
  AnalysisCategory,
  { label: string; icon: string; accent: string; border: string }
> = {
  strengths: {
    label: 'Strengths',
    icon: '↑',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/40',
  },
  weaknesses: {
    label: 'Weaknesses',
    icon: '↓',
    accent: 'text-red-400',
    border: 'border-red-500/40',
  },
  tricks: {
    label: 'Tricks',
    icon: '✦',
    accent: 'text-purple-400',
    border: 'border-purple-500/40',
  },
  tips: {
    label: 'Tips',
    icon: '◈',
    accent: 'text-blue-400',
    border: 'border-blue-500/40',
  },
}

function AnalysisSection({
  category,
  content,
  isStreaming,
}: {
  category: AnalysisCategory
  content: string
  isStreaming: boolean
}) {
  const config = SECTION_CONFIG[category]

  return (
    <div className={`bg-surface-card rounded-xl border ${config.border} p-4 flex flex-col gap-3`}>
      <div className="flex items-center gap-2">
        <span className={`text-lg leading-none ${config.accent}`}>{config.icon}</span>
        <h3
          className={`font-display font-semibold text-sm uppercase tracking-wider ${config.accent}`}
        >
          {config.label}
        </h3>
      </div>

      <div className="text-sm text-slate-300 leading-relaxed min-h-[80px]">
        {content ? (
          <span>
            {content}
            {isStreaming && (
              <span className="inline-block w-0.5 h-3.5 bg-slate-400 ml-0.5 animate-pulse align-middle" />
            )}
          </span>
        ) : (
          <span className="text-slate-600 italic">
            {isStreaming ? 'Analyzing...' : 'Run analysis to see results'}
          </span>
        )}
      </div>
    </div>
  )
}

export default function AnalysisPanel({ analysisState, homeLabel, awayLabel, onGenerate }: Props) {
  const { status, sections } = analysisState
  const isLoading = status === 'loading'
  const isStreaming = status === 'streaming'
  const isActive = isLoading || isStreaming

  return (
    <div className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-white text-lg">Tactical Analysis</h2>
          {(status === 'complete' || isStreaming) && (
            <p className="text-slate-500 text-xs mt-0.5">
              <span className="text-blue-400 font-semibold">{analysisState.homeLabel}</span>
              <span className="mx-1.5 text-slate-600">vs</span>
              <span className="text-red-400 font-semibold">{analysisState.awayLabel}</span>
            </p>
          )}
        </div>

        <button
          onClick={onGenerate}
          disabled={isActive}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg font-display font-semibold text-sm
            transition-all duration-200
            ${
              isActive
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] cursor-pointer'
            }
          `}
        >
          {isLoading && (
            <span className="w-3.5 h-3.5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
          )}
          <span>{isLoading ? 'Thinking...' : isStreaming ? 'Generating...' : 'Analyze Match'}</span>
          {!isActive && <span className="text-xs opacity-60">⚽</span>}
        </button>
      </div>

      {/* Formation matchup pill */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-display font-bold text-blue-400 text-base">{homeLabel}</span>
        <span className="text-slate-600 text-xs px-2 py-0.5 rounded-full border border-slate-700 bg-surface-elevated">
          VS
        </span>
        <span className="font-display font-bold text-red-400 text-base">{awayLabel}</span>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
          {analysisState.errorMessage}
        </div>
      )}

      {/* Analysis grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sections.map((section) => (
          <AnalysisSection
            key={section.category}
            category={section.category}
            content={section.content}
            isStreaming={isStreaming}
          />
        ))}
      </div>
    </div>
  )
}
