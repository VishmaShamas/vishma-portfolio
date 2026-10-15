import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" style={{ padding: '100px 6%', background: 'var(--black2)' }}>
      <div className="max-w-[680px] mx-auto">
        <div
          ref={ref}
          className={`rounded-2xl p-16 text-center relative overflow-hidden transition-all duration-700 ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <div className="absolute pointer-events-none" style={{
            width: 360, height: 360, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,.06), transparent 65%)',
            top: -80, left: '50%', transform: 'translateX(-50%)',
          }} />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[2.5px] mb-4" style={{ color: 'var(--green)' }}>
              <span className="w-5 h-px" style={{ background: 'var(--green)' }} />Contact
              <span className="w-5 h-px" style={{ background: 'var(--green)' }} />
            </div>

            <h3 className="text-4xl font-black mb-4" style={{ letterSpacing: '-2px' }}>
              Ready to build<br />
              <span style={{ color: 'var(--green)' }}>something real?</span>
            </h3>

            <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: 'var(--gray)' }}>
              Got a problem that keeps blocking you, or an idea you're ready to turn into something real? Drop me a message. I'll give you an honest take on what's worth building and the clearest path to get there.
            </p>

            <div className="flex justify-center gap-3 flex-wrap">
              <a
                href="https://www.upwork.com/freelancers/~015298a2ee1e85782f"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-[9px] font-bold text-sm text-black transition-all duration-200"
                style={{ background: 'var(--green)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--green-lt)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(34,197,94,.35)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                Hire on Upwork →
              </a>
              <a
                href="https://www.fiverr.com/vishmashamas"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-[9px] font-semibold text-sm transition-all duration-200"
                style={{ background: 'transparent', color: 'var(--white)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,.4)'; e.currentTarget.style.color = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.transform = '' }}
              >
                View Fiverr
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
