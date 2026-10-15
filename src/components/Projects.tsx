import { useEffect, useRef, useState } from 'react'

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.08 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return { ref, v }
}

const projects = [
  {
    num: '01', featured: true,
    type: 'SaaS · Identity · OSINT',
    icon: '🔐',
    title: 'Background Check & Identity Verification SaaS',
    desc: 'Multi-tenant enterprise SaaS for background checks at scale. Full monorepo: customer frontend, admin portal, Node.js backend, background workers. Three KYC providers (Onfido, Veriff, Sumsub), Stripe billing, Clerk with MFA, full audit logging, role-based access.',
    tags: ['Next.js 15','TypeScript','Node.js','MongoDB','Clerk','Stripe','Onfido','Veriff','Monorepo'],
  },
  {
    num: '02', type: 'AI · Enterprise', icon: '🤖',
    title: 'AI Policy Search Platform',
    desc: 'Public safety agencies query thousands of documents in plain English. AI surfaces the right policy with cited context. Multi-tenant RBAC, MFA, audit logs built for enterprise.',
    tags: ['Next.js 16','React 19','OpenAI','TypeScript','RBAC'],
  },
  {
    num: '03', type: 'Web · Mobile', icon: '🍽️',
    title: 'Restaurant Discovery Platform',
    desc: 'Next.js admin portal with OpenAI-powered PDF menu extraction. React Native consumer app with location features, campaigns, and push notifications.',
    tags: ['Next.js','React Native','Expo','Node.js','OpenAI','Supabase'],
  },
  {
    num: '04', type: 'Crypto · Web3', icon: '💎',
    title: 'Crypto & Web3 Trading Platform',
    desc: 'Live wallet management, fiat/crypto deposits, real-time trading UI with charts, multi-step KYC identity verification flows.',
    tags: ['React','TypeScript','Redux Toolkit','Recharts','Sumsub','Vite'],
  },
  {
    num: '05', type: 'Mobile · Flutter', icon: '💪',
    title: 'Cross-Platform Fitness App',
    desc: 'Recipe matching engine and workout tracker for iOS and Android. Firebase backend, Google/Apple sign-in, Lottie animations, Riverpod state management.',
    tags: ['Flutter','Dart','Riverpod','Firebase','go_router','Freezed'],
  },
]

function ProjectCard({ p, delay = 0 }: { p: typeof projects[0]; delay?: number }) {
  const { ref, v } = useInView()
  return (
    <div
      ref={ref}
      className="rounded-2xl p-7 relative overflow-hidden cursor-default transition-all duration-300 group"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        opacity: v ? 1 : 0,
        transform: v ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity .65s ${delay}ms, transform .65s ${delay}ms, border-color .3s, box-shadow .3s`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(34,197,94,.3)'
        e.currentTarget.style.boxShadow = '0 0 40px rgba(34,197,94,.07), 0 20px 60px rgba(0,0,0,.4)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = ''
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* green left bar */}
      <div className="absolute top-0 left-0 w-[3px] h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'var(--green)' }} />

      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(34,197,94,.07)', border: '1px solid rgba(34,197,94,.2)' }}>
          {p.icon}
        </div>
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'rgba(34,197,94,.07)', border: '1px solid rgba(34,197,94,.2)' }}>
          {p.type}
        </span>
      </div>

      <div className="font-mono text-[11px] mb-2" style={{ color: 'var(--gray-dk)' }}>{p.num}</div>
      <div className="text-lg font-extrabold mb-3" style={{ letterSpacing: '-.4px' }}>{p.title}</div>
      <div className="text-sm leading-[1.75] mb-5" style={{ color: 'var(--gray)' }}>{p.desc}</div>

      <div className="flex flex-wrap gap-2">
        {p.tags.map(t => (
          <span key={t} className="font-mono text-[11px] px-[10px] py-1 rounded-md" style={{ background: 'var(--black2)', border: '1px solid var(--border)', color: 'var(--gray-dk)' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, v } = useInView()
  const [feat, ...rest] = projects

  return (
    <section id="work" style={{ padding: '100px 6%', background: 'var(--black)' }}>
      <div className="max-w-[1160px] mx-auto">
        <div ref={ref} className={`transition-all duration-700 mb-12 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[2.5px] mb-3" style={{ color: 'var(--green)' }}>
            <span className="w-5 h-px" style={{ background: 'var(--green)' }} />Work
          </div>
          <h2 className="text-4xl font-black mb-3" style={{ letterSpacing: '-1.5px' }}>Things I've shipped.</h2>
          <p className="text-sm" style={{ color: 'var(--gray)' }}>Not demos. Production systems with real users and real stakes behind them.</p>
        </div>

        {/* Featured */}
        <div className="mb-4">
          <div
            className="rounded-2xl p-8 relative overflow-hidden cursor-default transition-all duration-300 group"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,.3)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(34,197,94,.07)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
          >
            <div className="absolute top-0 left-0 w-[3px] h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'var(--green)' }} />
            <div className="grid gap-10 items-center" style={{ gridTemplateColumns: '1fr 280px' }}>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(34,197,94,.07)', border: '1px solid rgba(34,197,94,.2)' }}>
                    {feat.icon}
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'rgba(34,197,94,.07)', border: '1px solid rgba(34,197,94,.2)' }}>
                    {feat.type}
                  </span>
                </div>
                <div className="font-mono text-[11px] mb-2" style={{ color: 'var(--gray-dk)' }}>{feat.num} / Featured</div>
                <div className="text-2xl font-extrabold mb-3" style={{ letterSpacing: '-1px' }}>{feat.title}</div>
                <div className="text-sm leading-[1.75] mb-5" style={{ color: 'var(--gray)' }}>{feat.desc}</div>
                <div className="flex flex-wrap gap-2">
                  {feat.tags.map(t => (
                    <span key={t} className="font-mono text-[11px] px-[10px] py-1 rounded-md" style={{ background: 'var(--black2)', border: '1px solid var(--border)', color: 'var(--gray-dk)' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl flex flex-col items-center justify-center gap-3" style={{ height: 200, background: 'var(--black2)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 60% 40%, rgba(34,197,94,.06), transparent 60%)' }} />
                <div className="text-5xl relative z-10">🔐</div>
                <div className="font-mono text-[11px] relative z-10" style={{ color: 'var(--gray-dk)' }}>Identity · Verification · SaaS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          {rest.map((p, i) => <ProjectCard key={p.num} p={p} delay={i * 100} />)}
        </div>
      </div>
    </section>
  )
}
