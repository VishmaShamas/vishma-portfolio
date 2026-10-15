const items = [
  'React.js','Next.js','Node.js','Express.js','MongoDB','TypeScript',
  'PostgreSQL','Tailwind CSS','React Native','Flutter','OpenAI API',
  'Stripe','Supabase','Firebase','Clerk','AWS','Vercel','CI/CD',
]

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div
      className="overflow-hidden"
      style={{
        background: 'var(--black2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        height: 44,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="marquee-anim flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 font-mono text-xs px-6 transition-colors duration-200 cursor-default"
            style={{
              color: 'var(--gray-dk)',
              borderRight: '1px solid var(--border)',
              height: 44,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-dk)')}
          >
            <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: 'var(--green)', opacity: 0.6 }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
