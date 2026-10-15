import { useEffect, useState } from 'react'

const links = ['About', 'Work', 'Stack', 'Process', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[900] flex justify-between items-center px-[6%] transition-all duration-300"
      style={{
        padding: scrolled ? '14px 6%' : '20px 6%',
        background: scrolled ? 'rgba(7,9,13,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <a href="#" className="font-mono font-semibold text-base text-white no-underline tracking-tight">
        vishma<span style={{ color: 'var(--green)' }}>.</span>dev
      </a>

      <ul className="hidden md:flex gap-8 list-none">
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className="no-underline text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--gray)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray)')}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="flex items-center gap-2 text-xs font-semibold rounded-full px-4 py-[7px] tracking-wide transition-all duration-200"
        style={{
          color: 'var(--green)',
          background: 'rgba(34,197,94,.08)',
          border: '1px solid var(--green-border)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(34,197,94,.15)'
          e.currentTarget.style.borderColor = 'rgba(34,197,94,.5)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(34,197,94,.08)'
          e.currentTarget.style.borderColor = 'var(--green-border)'
        }}
      >
        <span className="w-[6px] h-[6px] rounded-full bg-green-400 dot-pulse" />
        Available for Work
      </a>
    </nav>
  )
}
