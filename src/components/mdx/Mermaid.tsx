import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

let idCounter = 0
let initialized = false

function init() {
  if (initialized) return
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      background: '#141414',
      primaryColor: '#1e3a5f',
      primaryBorderColor: '#3b82f6',
      primaryTextColor: '#e5e7eb',
      lineColor: '#4b5563',
      secondaryColor: '#1f2937',
      tertiaryColor: '#111827',
      fontSize: '14px',
    },
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true,
    },
  })
  initialized = true
}

export function Mermaid({ chart }: { chart: string }) {
  const id = `mermaid-${++idCounter}`
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    init()
    const el = ref.current
    if (!el) return

    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        el.innerHTML = svg
        const svgEl = el.querySelector('svg')
        if (svgEl) {
          svgEl.style.maxWidth = '100%'
          svgEl.style.height = 'auto'
        }
      })
      .catch(() => {
        el.textContent = chart
      })
  }, [chart, id])

  return <div ref={ref} className="my-6 flex justify-center [&_svg]:overflow-visible" />
}
