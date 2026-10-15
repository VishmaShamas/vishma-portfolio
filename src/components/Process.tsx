import { useEffect, useRef, useState } from 'react'

const steps = [
  { n: '01', title: 'Understand the goal', desc: 'Product goal first, feature list second. I need to know what success looks like before writing code.' },
  { n: '02', title: 'Scope it precisely', desc: 'Work broken into clear, testable milestones. No open-ended contracts or vague sprints.' },
  { n: '03', title: 'Build clean', desc: 'TypeScript, clean architecture, small reviewable commits. Code the next developer won\'t rewrite.' },
  { n: '04', title: 'Test properly', desc: 'Full user flows, edge cases, and API failures tested before shipping. Not just the happy path.' },
  { n: '05', title: 'Deploy and hand off', desc: 'Deployed to Vercel or AWS with documentation your team can actually use after I\'m gone.' },
  { n: '06', title: 'Leave it better', desc: 'The codebase should be cleaner when I leave than when I arrived. Non-negotiable.' },
]

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="process" style={{ padding: '100px 6%', background: 'var(--black)' }}>
      <div className="max-w-[1160px] mx-auto">
        <div ref={ref} className={`mb-12 transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[2.5px] mb-3" style={{ color: 'var(--green)' }}>
            <span className="w-5 h-px" style={{ background: 'var(--green)' }} />How I Work
          </div>
          <h2 className="text-4xl font-black mb-3" style={{ letterSpacing: '-1.5px' }}>From idea to production.</h2>
          <p className="text-sm" style={{ color: 'var(--gray)' }}>Six steps. No ambiguity. Repeatable on every project.</p>
        </div>

        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="p-7 transition-all duration-250 cursor-default group"
              style={{
                background: 'var(--card)',
                borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--border)' : 'none',
                borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--card2)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--card)' }}
            >
              <div
                className="font-mono text-3xl font-bold mb-4 leading-none transition-colors duration-250"
                style={{ color: 'var(--border)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              >
                {s.n}
              </div>
              <div className="text-sm font-bold mb-2">{s.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--gray)' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
