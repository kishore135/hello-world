import type { TeamSide } from '../../types'
import { FORMATIONS } from '../../data/formations'

interface Props {
  side: TeamSide
  value: string
  currentLabel: string
  onChange: (formationId: string) => void
  onReset: () => void
}

const SIDE_STYLES = {
  home: {
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    label: 'text-blue-400',
    select: 'border-blue-500/30 focus:border-blue-400',
    dot: 'bg-blue-500',
  },
  away: {
    badge: 'bg-red-500/20 text-red-400 border-red-500/30',
    label: 'text-red-400',
    select: 'border-red-500/30 focus:border-red-400',
    dot: 'bg-red-500',
  },
}

export default function FormationSelector({ side, value, currentLabel, onChange, onReset }: Props) {
  const styles = SIDE_STYLES[side]
  const isModified = currentLabel !== FORMATIONS.find((f) => f.id === value)?.label

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${styles.dot}`} />
        <span className={`text-xs font-semibold uppercase tracking-widest ${styles.label}`}>
          {side === 'home' ? 'Home' : 'Away'}
        </span>
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          bg-surface-elevated text-white text-sm font-medium
          border rounded-lg px-3 py-2 outline-none cursor-pointer
          appearance-none w-full
          ${styles.select}
        `}
      >
        {FORMATIONS.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label}
          </option>
        ))}
      </select>

      <div className="flex items-center justify-between">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold font-display ${styles.badge}`}
        >
          <span className="opacity-60">Active:</span>
          <span>{currentLabel}</span>
          {isModified && <span className="opacity-50 text-[10px]">(custom)</span>}
        </div>

        {isModified && (
          <button
            onClick={onReset}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
