# battleformations.dev

A tactical football analysis tool that lets you pit two formations head-to-head and get AI-powered insights.

## Features

- **Formation picker** — choose from 10 classic formations for each team (4-3-3, 4-4-2, 4-2-3-1, 3-5-2, and more)
- **Interactive pitch** — drag any player dot to a new position; the formation label updates live
- **AI analysis** — powered by Claude, generates Strengths, Weaknesses, Tricks, and Tips for the matchup
- **Streaming output** — analysis streams in real time as Claude responds
- **Dark theme** — green pitch on a dark canvas, home in blue, away in red

## Getting started

```bash
cp .env.example .env.local
# Add your Anthropic API key to .env.local

npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier format |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `VITE_ANTHROPIC_API_KEY` | Yes | Your Anthropic API key |

> **Note:** The API key is used directly in the browser for development. For production deployments, proxy requests through a backend and remove `dangerouslyAllowBrowser: true` from `src/lib/claude.ts`.

## Stack

- [Vite](https://vitejs.dev) + [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v3](https://tailwindcss.com) — dark theme
- [@dnd-kit](https://dndkit.com) — drag-and-drop for player positions
- [@anthropic-ai/sdk](https://github.com/anthropics/anthropic-sdk-typescript) — streaming Claude analysis
- [Framer Motion](https://www.framer.com/motion) — animations

## How it works

The pitch is an SVG with a `600×840` viewBox (stacked layout: away on top, home on bottom). Each player position is stored as a normalized coordinate `{ x: [0,1], y: [0,1] }` relative to their team's half. Dragging a dot computes the pixel delta from dnd-kit, scales it to SVG units, then converts to normalized coords.

After any drag, `inferFormationLabel()` re-clusters outfield players into rows by y-proximity and rebuilds the formation string (e.g. `4-2-3-1`).

Clicking **Analyze Match** calls the Claude API with a tactical prompt and streams the response, parsing `## SECTION` headers to route content to the correct card.
