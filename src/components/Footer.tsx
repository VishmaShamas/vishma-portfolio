export default function Footer() {
  return (
    <footer
      className="flex justify-between items-center flex-wrap gap-3 px-[6%] py-6"
      style={{ background: 'var(--black)', borderTop: '1px solid var(--border)' }}
    >
      <p className="font-mono text-xs" style={{ color: 'var(--gray-dk)' }}>
        © 2025 <span style={{ color: 'var(--green)' }}>Vishma</span> — Full-Stack Developer
      </p>
      <div className="flex gap-6">
        {['About','Work','Stack','Process','Contact'].map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="text-xs no-underline transition-colors duration-200"
            style={{ color: 'var(--gray-dk)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-dk)')}
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  )
}
