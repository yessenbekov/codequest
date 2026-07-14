import { courses } from '../data/courses'
import { isLessonCompleted } from '../store/progress'

export default function Home({ progress, onSelectCourse }) {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px' }}>
      <header style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🚀</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)' }}>CodeQuest</h1>
        <p style={{ color: 'var(--text-dim)', marginTop: 6 }}>Учись программировать играя</p>
      </header>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
        <Stat label="XP" value={progress.xp} emoji="⚡" />
        <Stat label="Стрик" value={`${progress.streak} дн`} emoji="🔥" />
        <Stat
          label="Уроков"
          value={Object.keys(progress.completedLessons).length}
          emoji="✅"
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {courses.map(course => {
          const done = course.lessons.filter(l => isLessonCompleted(progress, l.id)).length
          const pct = Math.round((done / course.lessons.length) * 100)
          return (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: 20,
                textAlign: 'left',
                transition: 'border-color 0.2s, transform 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = course.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <span style={{ fontSize: 36 }}>{course.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17 }}>{course.title}</div>
                  <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 2 }}>
                    {course.description}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', color: 'var(--text-dim)', fontSize: 13 }}>
                  {done}/{course.lessons.length}
                </div>
              </div>
              <ProgressBar pct={pct} color={course.color} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Stat({ emoji, value, label }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '12px 20px',
      textAlign: 'center',
      minWidth: 80,
    }}>
      <div style={{ fontSize: 20 }}>{emoji}</div>
      <div style={{ fontWeight: 700, fontSize: 18, marginTop: 2 }}>{value}</div>
      <div style={{ color: 'var(--text-dim)', fontSize: 12 }}>{label}</div>
    </div>
  )
}

function ProgressBar({ pct, color }) {
  return (
    <div style={{ background: 'var(--surface2)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
      <div style={{
        width: `${pct}%`,
        height: '100%',
        background: color,
        borderRadius: 99,
        transition: 'width 0.4s',
      }} />
    </div>
  )
}
