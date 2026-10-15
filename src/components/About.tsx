import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Counter({ to }: { to: number }) {
  const [val, setVal] = useState(0)
  const { ref, visible } = useInView(0.5)
  useEffect(() => {
    if (!visible) return
    const dur = 1600
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      setVal(Math.floor(p * to))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [visible, to])
  return <div ref={ref}>{val}+</div>
}

const pills = ['React.js','Next.js','Node.js','Express.js','MongoDB','TypeScript','React Native','Flutter','OpenAI API','Stripe','Supabase','PostgreSQL','Clerk','Tailwind CSS','AWS','Vercel']

export default function About() {
  const { ref, visible } = useInView()

  return (
    <section id="about" style={{ padding: '100px 6%', background: 'var(--black2)' }}>
      <div className="max-w-[1160px] mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[2.5px] mb-3" style={{ color: 'var(--green)' }}>
            <span className="w-5 h-px" style={{ background: 'var(--green)' }} />About
          </div>
          <h2 className="text-4xl font-black mb-12" style={{ letterSpacing: '-1.5px' }}>Who's behind the code.</h2>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(12,1fr)' }}>
          {/* About text */}
          <div className="card-hover rounded-xl p-7 col-span-7" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <p className="text-sm mb-4 leading-[1.85]" style={{ color: 'var(--gray)' }}>
              I'm <strong className="font-semibold" style={{ color: 'var(--white)' }}>Vishma</strong>, a full-stack MERN developer who builds products people actually use. Not proof-of-concepts. Not agency landing pages. Real SaaS platforms, real mobile apps, real backend systems running in production.
            </p>
            <p className="text-sm mb-4 leading-[1.85]" style={{ color: 'var(--gray)' }}>
              The work includes a background check SaaS with full monorepo architecture and three KYC providers, an AI-powered document search platform for public safety agencies, a restaurant discovery app across web and mobile with OpenAI-driven menu processing, and a crypto platform with live wallet flows.
            </p>
            <p className="text-sm leading-[1.85]" style={{ color: 'var(--gray)' }}>
              I own the full stack — <strong className="font-semibold" style={{ color: 'var(--white)' }}>frontend, backend, mobile, integrations, deployment</strong> — so you don't manage two developers for one product.
            </p>
          </div>

          {/* Green stat */}
          <div className="rounded-xl p-7 col-span-5 relative overflow-hidden" style={{ background: 'var(--green)', border: 'none' }}>
            <div className="absolute w-60 h-60 rounded-full top-[-60px] right-[-60px]" style={{ background: 'rgba(0,0,0,.1)' }} />
            <div className="relative z-10">
              <div className="font-mono text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(0,0,0,.55)' }}>Experience</div>
              <div className="text-6xl font-black leading-none" style={{ letterSpacing: '-3px', color: '#000' }}>4+</div>
              <div className="text-xs font-bold uppercase tracking-widest mt-2 mb-4" style={{ color: 'rgba(0,0,0,.6)' }}>Years in Production</div>
              <div className="h-px my-4" style={{ background: 'rgba(0,0,0,.15)' }} />
              <div className="text-xs leading-relaxed" style={{ color: 'rgba(0,0,0,.55)' }}>Building real products for real clients across SaaS, AI, mobile, and Web3.</div>
            </div>
          </div>

          {/* Counter cards */}
          {[
            { icon: '📦', label: 'Projects Shipped', sub: 'End-to-end delivery', count: 20 },
            { icon: '🌍', label: 'Domains Covered', sub: 'SaaS · AI · Mobile · Web3 · OSINT', count: null },
            { icon: '⚡', label: 'Full-Stack Ownership', sub: 'Frontend · Backend · Mobile · Deploy', count: null },
          ].map((c, i) => (
            <div key={i} className="card-hover rounded-xl p-7 col-span-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <div className="text-2xl mb-3">{c.icon}</div>
              {c.count ? (
                <div className="text-4xl font-black leading-none mb-1" style={{ letterSpacing: '-2px', color: 'var(--green)' }}>
                  <Counter to={c.count} />
                </div>
              ) : (
                <div className="text-2xl font-black leading-none mb-1" style={{ color: 'var(--green)' }}>5</div>
              )}
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--gray-dk)' }}>{c.label}</div>
              <div className="text-xs" style={{ color: 'var(--gray-dk)' }}>{c.sub}</div>
            </div>
          ))}

          {/* What I bring */}
          <div className="card-hover rounded-xl p-7 col-span-12" style={{ background: 'var(--black3)', border: '1px solid var(--border)' }}>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest mr-2" style={{ color: 'var(--gray-dk)' }}>Stack</span>
              {pills.map(p => (
                <span
                  key={p}
                  className="font-mono text-[12px] px-3 py-1 rounded-full cursor-default transition-all duration-200"
                  style={{ background: 'var(--card2)', border: '1px solid var(--border)', color: 'var(--gray)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,.4)'; e.currentTarget.style.color = 'var(--green)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--gray)' }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
