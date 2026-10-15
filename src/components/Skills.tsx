import { useEffect, useRef, useState } from 'react'

const cats = [
  { icon: '⚛️', name: 'Frontend', skills: [['React.js',95],['Next.js',95],['TypeScript',90],['Tailwind CSS',95],['Framer Motion',80]] },
  { icon: '🟢', name: 'Backend', skills: [['Node.js',92],['Express.js',90],['MongoDB',88],['PostgreSQL',80],['Stripe + Auth',88]] },
  { icon: '📱', name: 'Mobile', skills: [['React Native',88],['Flutter',82],['Expo',88],['Firebase',85],['Supabase',82]] },
  { icon: '🤖', name: 'AI + DevOps', skills: [['OpenAI API',85],['Vercel',92],['AWS',76],['CI/CD',80],['Docker',72]] },
]

function SkillCat({ cat, delay = 0 }: { cat: typeof cats[0]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.25 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="rounded-xl p-6 transition-all duration-300 cursor-default"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity .65s ${delay}ms, transform .65s ${delay}ms, border-color .25s, box-shadow .25s`,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,.3)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(34,197,94,.07)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '' }}
    >
      <div className="flex items-center gap-3 pb-4 mb-5" style={{ borderBottom: '1px solid var(--border)' }}>
        <span className="text-lg">{cat.icon}</span>
        <span className="font-mono text-xs font-semibold tracking-wide" style={{ color: 'var(--white)' }}>{cat.name}</span>
      </div>
      <div className="flex flex-col gap-3">
        {cat.skills.map(([name, pct]) => (
          <div key={name}>
            <div className="flex justify-between mb-1.5">
              <span className="text-[13px] font-medium" style={{ color: 'var(--gray)' }}>{name}</span>
              <span className="font-mono text-[11px]" style={{ color: 'var(--green)' }}>{pct}%</span>
            </div>
            <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, var(--green-dk), var(--green))',
                  width: visible ? `${pct}%` : '0%',
                  transition: `width 1.3s cubic-bezier(.4,0,.2,1) ${delay + 200}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="stack" style={{ padding: '100px 6%', background: 'var(--black2)' }}>
      <div className="max-w-[1160px] mx-auto">
        <div ref={ref} className={`mb-12 transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[2.5px] mb-3" style={{ color: 'var(--green)' }}>
            <span className="w-5 h-px" style={{ background: 'var(--green)' }} />Tech Stack
          </div>
          <h2 className="text-4xl font-black mb-3" style={{ letterSpacing: '-1.5px' }}>What I build with.</h2>
          <p className="text-sm" style={{ color: 'var(--gray)' }}>Everything here has been used in a live production project.</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {cats.map((c, i) => <SkillCat key={c.name} cat={c} delay={i * 100} />)}
        </div>
      </div>
    </section>
  )
}
