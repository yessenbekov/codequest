import { isLessonCompleted } from '../store/progress'
import { ArrowLeft } from 'lucide-react'

export default function CourseMap({ course, progress, onBack, onSelectLesson }) {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px' }}>
      <button className="btn btn-secondary" onClick={onBack} style={{ marginBottom: 24 }}>
        <ArrowLeft size={16} /> Назад
      </button>

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48 }}>{course.emoji}</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>{course.title}</h2>
        <p style={{ color: 'var(--text-dim)', marginTop: 4 }}>{course.description}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {course.lessons.map((lesson, idx) => {
          const done = isLessonCompleted(progress, lesson.id)
          const prevDone = idx === 0 || isLessonCompleted(progress, course.lessons[idx - 1].id)
          const locked = !prevDone && !done

          return (
            <button
              key={lesson.id}
              onClick={() => !locked && onSelectLesson(lesson)}
              disabled={locked}
              style={{
                background: done ? `${course.color}22` : 'var(--surface)',
                border: `1px solid ${done ? course.color : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                opacity: locked ? 0.4 : 1,
                cursor: locked ? 'not-allowed' : 'pointer',
                transition: 'transform 0.1s',
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: done ? course.color : 'var(--surface2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                flexShrink: 0,
              }}>
                {done ? '✓' : locked ? '🔒' : idx + 1}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600 }}>{lesson.title}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 2 }}>
                  +{lesson.xp} XP
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
