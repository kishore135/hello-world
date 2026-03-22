# battleformations.dev (bfd)

A React + TypeScript web app for head-to-head soccer/football formation analysis powered by Claude AI.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS v3** — dark theme; custom utility classes in `src/index.css`
- **@dnd-kit/core** — drag-and-drop for player positions on the SVG pitch
- **@anthropic-ai/sdk** — streaming analysis via Claude (browser mode with `dangerouslyAllowBrowser: true`)
- **Framer Motion** — available for animations

## Dev setup

```bash
cp .env.example .env.local   # add your Anthropic API key
npm install
npm run dev
```

## Key architecture

### Pitch coordinate system

Positions use normalized coords `{ x: [0,1], y: [0,1] }` where:

- `x=0` = left touchline, `x=1` = right touchline
- `y=0` = own goal line, `y=1` = halfway line

SVG viewBox is `600 x 840` (full pitch, stacked). Home = bottom half, away = top half (mirrored).
Conversion in `src/lib/pitchCoords.ts`.

### Formation label inference

`src/lib/formationUtils.ts::inferFormationLabel()` — groups outfield players into rows by y-proximity (threshold 0.12) and joins counts with `-`. Runs on every drag end.

### Claude API

`src/lib/claude.ts::streamAnalysis()` — streams a tactical analysis prompt and parses sections by `## HEADING` delimiters. Called from `src/hooks/useAnalysis.ts`.

### State

- `useFormationState` — manages both teams via `useReducer` (SELECT_FORMATION, MOVE_PLAYER, RESET_FORMATION)
- `useAnalysis` — manages streaming analysis state

## Env vars

| Variable                 | Required | Description                           |
| ------------------------ | -------- | ------------------------------------- |
| `VITE_ANTHROPIC_API_KEY` | Yes      | Anthropic API key — never commit this |

## ⚠️ Security note

The Anthropic API key is exposed client-side. For production, proxy requests through a backend endpoint and remove `dangerouslyAllowBrowser: true`.
