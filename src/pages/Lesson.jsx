import { useState } from 'react'
import { ArrowLeft, Lightbulb, CheckCircle, XCircle } from 'lucide-react'

function parseMarkdown(text) {
  return text
    .replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) =>
      `<pre style="background:#0A0A14;border:1px solid #2E2E50;border-radius:8px;padding:14px 16px;overflow-x:auto;margin:8px 0"><code>${code.replace(/</g,'&lt;')}</code></pre>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code style="background:#1A1A2E;padding:2px 6px;border-radius:4px">$1</code>')
    .replace(/\n/g, '<br/>')
}

function checkAnswer(code, lesson) {
  const normalized = code.trim()
  if (!normalized) return null

  // Extract what would be printed/logged
  const printMatch = normalized.match(/print\(["'](.+?)["']\)/)
  const consoleMatch = normalized.match(/console\.log\((.+?)\)/)

  let output = null
  if (printMatch) {
    output = printMatch[1]
  } else if (consoleMatch) {
    const val = consoleMatch[1].trim()
    if (val.startsWith('"') || val.startsWith("'")) {
      output = val.slice(1, -1)
    } else {
      try { output = String(eval(val)) } catch { output = val }
    }
  }

  if (output === null) {
    // Try evaluating simple expressions
    try {
      const result = eval(normalized)
      if (result !== undefined) output = String(result)
    } catch { /* ignore */ }
  }

  return output === lesson.expectedOutput ? 'correct' : 'wrong'
}

export default function Lesson({ lesson, course, onBack, onComplete, alreadyDone }) {
  const [tab, setTab] = useState('theory') // theory | task
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null) // null | 'correct' | 'wrong'
  const [showHint, setShowHint] = useState(false)

  function handleRun() {
    const verdict = checkAnswer(code, lesson)
    setResult(verdict)
    if (verdict === 'correct' && !alreadyDone) {
      setTimeout(() => onComplete(lesson), 800)
    }
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button className="btn btn-secondary" onClick={onBack} style={{ padding: '8px 14px' }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>{course.title}</div>
          <div style={{ fontWeight: 700 }}>{lesson.title}</div>
        </div>
        <div style={{
          marginLeft: 'auto',
          background: 'var(--surface2)',
          borderRadius: 99,
          padding: '4px 12px',
          fontSize: 13,
          color: 'var(--yellow)',
        }}>
          ⚡ {lesson.xp} XP
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'var(--surface)', borderRadius: 'var(--radius)', padding: 4 }}>
        {['theory', 'task'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              background: tab === t ? 'var(--accent)' : 'transparent',
              color: tab === t ? '#fff' : 'var(--text-dim)',
              transition: 'background 0.2s',
            }}
          >
            {t === 'theory' ? '📖 Теория' : '💻 Задача'}
          </button>
        ))}
      </div>

      {tab === 'theory' && (
        <div>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 24,
              lineHeight: 1.7,
              fontSize: 15,
            }}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(lesson.theory) }}
          />
          <button
            className="btn btn-primary"
            onClick={() => setTab('task')}
            style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
          >
            Перейти к задаче →
          </button>
        </div>
      )}

      {tab === 'task' && (
        <div>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: 20,
            marginBottom: 16,
            fontSize: 15,
            lineHeight: 1.6,
          }}>
            {lesson.task}
          </div>

          <textarea
            rows={6}
            value={code}
            onChange={e => { setCode(e.target.value); setResult(null) }}
            placeholder="Напиши код здесь..."
            style={{ marginBottom: 12 }}
          />

          {result && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              borderRadius: 'var(--radius)',
              marginBottom: 12,
              background: result === 'correct' ? '#10B98122' : '#EF444422',
              border: `1px solid ${result === 'correct' ? 'var(--green)' : 'var(--red)'}`,
              color: result === 'correct' ? 'var(--green)' : 'var(--red)',
              fontWeight: 600,
            }}>
              {result === 'correct'
                ? <><CheckCircle size={18} /> Правильно! +{lesson.xp} XP</>
                : <><XCircle size={18} /> Не то. Попробуй ещё раз.</>
              }
            </div>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn btn-primary"
              onClick={handleRun}
              style={{ flex: 1, justifyContent: 'center' }}
            >
              ▶ Проверить
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowHint(!showHint)}
              style={{ padding: '12px 16px' }}
              title="Подсказка"
            >
              <Lightbulb size={18} />
            </button>
          </div>

          {showHint && (
            <div style={{
              marginTop: 12,
              padding: '12px 16px',
              background: '#F59E0B22',
              border: '1px solid var(--yellow)',
              borderRadius: 'var(--radius)',
              color: 'var(--yellow)',
              fontSize: 14,
            }}>
              💡 {lesson.hint}
            </div>
          )}

          {alreadyDone && (
            <div style={{ marginTop: 12, textAlign: 'center', color: 'var(--text-dim)', fontSize: 13 }}>
              ✅ Этот урок уже пройден
            </div>
          )}
        </div>
      )}
    </div>
  )
}
