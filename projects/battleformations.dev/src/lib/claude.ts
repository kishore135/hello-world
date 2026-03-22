import Anthropic from '@anthropic-ai/sdk'
import type { AnalysisCategory, AnalysisSectionData } from '../types'

const CATEGORIES: AnalysisCategory[] = ['strengths', 'weaknesses', 'tricks', 'tips']

const HEADERS: Record<AnalysisCategory, string> = {
  strengths: '## STRENGTHS',
  weaknesses: '## WEAKNESSES',
  tricks: '## TRICKS',
  tips: '## TIPS',
}

export async function streamAnalysis(
  homeLabel: string,
  awayLabel: string,
  onSection: (sections: AnalysisSectionData[]) => void,
  onComplete: (sections: AnalysisSectionData[]) => void,
  onError: (message: string) => void
) {
  const apiKey = (import.meta.env as Record<string, string | undefined>)['VITE_ANTHROPIC_API_KEY']
  if (!apiKey) {
    onError('No API key found. Set VITE_ANTHROPIC_API_KEY in your .env.local file.')
    return
  }

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

  const prompt = `You are an expert football/soccer tactical analyst. Analyze this head-to-head formation matchup:

Home team: **${homeLabel}**
Away team: **${awayLabel}**

Provide a detailed tactical analysis using EXACTLY this format with these exact headers:

## STRENGTHS
How the home ${homeLabel} exploits the structural weaknesses of the away ${awayLabel}. Focus on positional mismatches, numerical advantages, and key attacking channels.

## WEAKNESSES
Vulnerabilities the home ${homeLabel} faces against the ${awayLabel}. What the away team can exploit.

## TRICKS
Specific tactical set-pieces, pressing triggers, overloads, and in-play patterns the home team can deploy.

## TIPS
Practical coaching tips for maximizing the ${homeLabel} against ${awayLabel}. Player instructions and key matchups to target.

Use bullet points (•) for each point. Be specific, tactical, and concise. 3–5 bullets per section.`

  const sections: AnalysisSectionData[] = CATEGORIES.map((cat) => ({ category: cat, content: '' }))

  let buffer = ''
  let currentCategory: AnalysisCategory | null = null

  try {
    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        buffer += event.delta.text

        // Check for new section headers
        for (const cat of CATEGORIES) {
          const header = HEADERS[cat]
          if (buffer.includes(header)) {
            currentCategory = cat
            buffer = buffer.substring(buffer.indexOf(header) + header.length)
          }
        }

        if (currentCategory !== null) {
          const idx = sections.findIndex((s) => s.category === currentCategory)
          if (idx !== -1) {
            // Check if the next header is starting in the buffer
            let content = buffer
            for (const cat of CATEGORIES) {
              if (cat === currentCategory) continue
              const nextHeader = HEADERS[cat]
              const nextIdx = content.indexOf(nextHeader.substring(0, 4)) // "## "
              if (nextIdx > -1 && content.includes('##')) {
                const headerStart = content.indexOf('##')
                if (headerStart > -1) content = content.substring(0, headerStart)
                break
              }
            }
            sections[idx] = { ...sections[idx]!, content: content.trimStart() }
            onSection([...sections])
          }
        }
      }
    }

    onComplete([...sections])
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error occurred'
    onError(message)
  }
}
