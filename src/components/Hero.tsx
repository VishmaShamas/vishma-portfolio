import { useEffect, useRef, useState } from 'react'
import HeroCanvas from './HeroCanvas'

const words = ['SaaS platforms', 'web apps', 'mobile products', 'AI features']

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const charRef = useRef(0)

  useEffect(() => {
    const word = words[wordIdx]
    const speed = deleting ? 55 : 95

    const t = setTimeout(() => {
      if (!deleting) {
        charRef.current++
        setTyped(word.slice(0, charRef.current))
        if (charRef.current === word.length) {
          setTimeout(() => setDeleting(true), 1600)
        }
      } else {
        charRef.current--
        setTyped(word.slice(0, charRef.current))
        if (charRef.current === 0) {
          setDeleting(false)
          setWordIdx(i => (i + 1) % words.length)
        }
      }
    }, speed)

    return () => clearTimeout(t)
  }, [typed, deleting, wordIdx])

  const termLines = [
    { cmd: 'vishma --info', outs: [
      { k: 'role    ', v: 'Full-Stack MERN Developer' },
      { k: 'exp     ', v: '4+ years in production' },
      { k: 'stack   ', v: 'React · Next.js · Node.js' },
      { k: 'mobile  ', v: 'React Native · Flutter' },
      { k: 'ai      ', v: 'OpenAI · Automation' },
      { k: 'status  ', v: 'Available ✓', green: true },
    ]},
    { cmd: 'vishma --recent-work', outs: [
      { k: '01 ', v: 'Identity Verification SaaS' },
      { k: '02 ', v: 'AI Policy Search Platform' },
      { k: '03 ', v: 'Restaurant Discovery App' },
      { k: '04 ', v: 'Crypto Trading Platform' },
    ]},
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ padding: '120px 6% 80px' }}
    >
      <HeroCanvas />

      {/* subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          zIndex: 0,
        }}
      />

      {/* green glow top right */}
      <div className="absolute pointer-events-none" style={{
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,.055) 0%, transparent 70%)',
        top: -100, right: -100, zIndex: 0,
      }} />

      <div
        className="relative w-full max-w-[1200px] mx-auto grid items-center gap-16"
        style={{ gridTemplateColumns: '1fr 480px', zIndex: 1 }}
      >
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--green)' }}>
            <span className="block w-8 h-px" style={{ background: 'var(--green)' }} />
            Full-Stack Developer
          </div>

          <h1 className="font-black leading-[1.02] mb-6" style={{ fontSize: 'clamp(3rem,6vw,5rem)', letterSpacing: '-3px' }}>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg,#fff 20%,#94A3B8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Vishma.
            </span>
            <span className="block text-2xl md:text-4xl font-bold mt-2" style={{ color: 'var(--gray)', letterSpacing: '-1.5px', fontSize: 'clamp(1.5rem,3.2vw,2.5rem)' }}>
              MERN Stack &amp;&nbsp;
              <span style={{ color: 'var(--green)' }}>AI</span> Builder.
            </span>
          </h1>

          <div className="text-base mb-6 max-w-[460px] leading-relaxed" style={{ color: 'var(--gray)' }}>
            I build <strong className="font-semibold" style={{ color: 'var(--white)' }}>
              <span style={{ color: 'var(--green)' }}>{typed}</span>
              <span className="cursor-blink inline-block w-[3px] h-[1em] ml-0.5 align-middle" style={{ background: 'var(--green)' }} />
            </strong> that ship to production and hold up under real usage.
            4+ years. 20+ projects. Everything from identity verification systems to AI-powered search.
          </div>

          <div className="flex gap-3 flex-wrap mb-12">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[9px] font-bold text-sm text-black transition-all duration-200"
              style={{ background: 'var(--green)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--green-lt)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(34,197,94,.3)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              View My Work →
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[9px] font-semibold text-sm transition-all duration-200"
              style={{ background: 'transparent', color: 'var(--white)', border: '1px solid var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,.4)'; e.currentTarget.style.color = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.transform = '' }}
            >
              Get In Touch
            </a>
          </div>

          <div className="flex gap-10">
            {[['4+', 'Years Exp.'], ['20+', 'Shipped'], ['5', 'Domains']].map(([n, l]) => (
              <div key={l} className="pl-3" style={{ borderLeft: '2px solid var(--green)' }}>
                <div className="text-2xl font-black" style={{ letterSpacing: '-1px' }}>{n}</div>
                <div className="text-[11px] font-semibold uppercase tracking-widest mt-0.5" style={{ color: 'var(--gray-dk)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TERMINAL */}
        <div
          className="rounded-2xl overflow-hidden hidden lg:block"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: '0 0 0 1px rgba(0,0,0,.4), 0 32px 64px rgba(0,0,0,.5), 0 0 80px rgba(34,197,94,.04)',
          }}
        >
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'var(--card2)', borderBottom: '1px solid var(--border)' }}>
            <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
            <span className="mx-auto font-mono text-[11px]" style={{ color: 'var(--gray-dk)' }}>~/vishma — terminal</span>
          </div>
          <div className="p-5 font-mono text-[13px] leading-7">
            {termLines.map((block, bi) => (
              <div key={bi} className={bi > 0 ? 'mt-3' : ''}>
                <div>
                  <span style={{ color: 'var(--green)', marginRight: 6 }}>$</span>
                  <span style={{ color: 'var(--white)' }}>{block.cmd}</span>
                </div>
                {block.outs.map((o, oi) => (
                  <div key={oi} className="pl-4" style={{ color: 'var(--gray)' }}>
                    <span style={{ color: 'var(--green-xlt)' }}>{o.k}</span>
                    <span style={{ color: o.green ? 'var(--green)' : 'var(--white)' }}>{o.v}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="mt-3">
              <span style={{ color: 'var(--green)', marginRight: 6 }}>$</span>
              <span className="cursor-blink inline-block w-2 h-3.5 align-middle" style={{ background: 'var(--green)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
