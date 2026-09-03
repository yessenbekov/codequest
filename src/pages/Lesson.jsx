import { useState } from 'react'
import { ArrowLeft, Lightbulb, CheckCircle, XCircle } from 'lucide-react'

function parseMarkdown(text) {
  return text
    .replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) =>
      `<pre style="background:var(--code-bg);border:1px solid var(--border);border-radius:8px;padding:14px 16px;overflow-x:auto;margin:8px 0;color:var(--text)"><code>${code.replace(/</g,'&lt;')}</code></pre>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code style="background:var(--surface2);color:var(--text);padding:2px 6px;border-radius:4px">$1</code>')
    .replace(/\n/g, '<br/>')
}

function evalCode(code) {
  const vars = {}
  const funcs = {}
  const outputs = []

  function resolveVal(expr, localVars = vars) {
    expr = expr.trim()
    if (!expr) return undefined

    // String literal
    if ((expr.startsWith('"') && expr.endsWith('"')) ||
        (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1)
    }
    // Number
    if (!isNaN(Number(expr))) return Number(expr)

    // f-string: f"...{var}..."
    if ((expr.startsWith('f"') && expr.endsWith('"')) ||
        (expr.startsWith("f'") && expr.endsWith("'"))) {
      return expr.slice(2, -1).replace(/\{(\w+)\}/g, (_, v) =>
        v in localVars ? String(localVars[v]) : v
      )
    }

    // List literal [a, b, c]
    if (expr.startsWith('[') && expr.endsWith(']')) {
      const inner = expr.slice(1, -1).trim()
      if (!inner) return []
      return inner.split(',').map(e => resolveVal(e.trim(), localVars))
    }

    // list[index]
    const idxM = expr.match(/^(\w+)\[(\d+)\]$/)
    if (idxM) {
      const arr = localVars[idxM[1]]
      if (Array.isArray(arr)) return arr[Number(idxM[2])]
    }

    // string methods: var.upper() / .lower() / .capitalize() / .strip() / .toUpperCase() etc
    const methodM = expr.match(/^(\w+)\.(upper|lower|capitalize|strip|toUpperCase|toLowerCase|trim)\(\)$/)
    if (methodM) {
      const val = String(resolveVal(methodM[1], localVars))
      switch (methodM[2]) {
        case 'upper': case 'toUpperCase': return val.toUpperCase()
        case 'lower': case 'toLowerCase': return val.toLowerCase()
        case 'capitalize': return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
        case 'strip': case 'trim': return val.trim()
      }
    }

    // len(expr)
    const lenM = expr.match(/^len\((\w+)\)$/)
    if (lenM) {
      const v = localVars[lenM[1]]
      return Array.isArray(v) ? v.length : String(v).length
    }

    // Function call: name(args)
    const callM = expr.match(/^(\w+)\(([^)]*)\)$/)
    if (callM && funcs[callM[1]]) {
      const args = callM[2] ? callM[2].split(',').map(a => resolveVal(a.trim(), localVars)) : []
      return callFunc(callM[1], args)
    }

    // Variable
    if (expr in localVars) return localVars[expr]

    // Math / concatenation — substitute known vars and evaluate
    try {
      const resolved = expr.replace(/\b([a-zA-Z_]\w*)\b/g, tok => {
        if (tok in localVars) return JSON.stringify(localVars[tok])
        return tok
      })
      // eslint-disable-next-line no-new-func
      return new Function(`return (${resolved})`)()
    } catch { return expr }
  }

  function callFunc(name, argVals) {
    const fn = funcs[name]
    if (!fn) return undefined
    const local = { ...vars }
    fn.params.forEach((p, i) => { local[p] = argVals[i] })
    for (const line of fn.body) {
      const retM = line.trim().match(/^return\s+(.+)$/)
      if (retM) return resolveVal(retM[1], local)
    }
  }

  function execPrint(argStr, localVars = vars) {
    argStr = argStr.trim()
    const val = resolveVal(argStr, localVars)
    outputs.push(val === undefined ? '' : String(val))
  }

  function execLine(line, localVars = vars) {
    line = line.trim()
    if (!line || line.startsWith('#')) return

    // print(...) / console.log(...)
    const printM = line.match(/^(?:print|console\.log)\((.+)\)$/)
    if (printM) { execPrint(printM[1], localVars); return }

    // var.append(value)
    const appendM = line.match(/^(\w+)\.append\((.+)\)$/)
    if (appendM) {
      const arr = localVars[appendM[1]]
      if (Array.isArray(arr)) arr.push(resolveVal(appendM[2], localVars))
      return
    }

    // Assignment: [let/const/var] name = value
    const assignM = line.match(/^(?:(?:let|const|var)\s+)?(\w+)\s*=\s*(.+)$/)
    if (assignM) {
      localVars[assignM[1]] = resolveVal(assignM[2], localVars)
      return
    }

    // i++ / i--
    const incM = line.match(/^(\w+)(\+\+|--)$/)
    if (incM) {
      localVars[incM[1]] = Number(localVars[incM[1]]) + (incM[2] === '++' ? 1 : -1)
      return
    }

    // i += n / i -= n
    const compM = line.match(/^(\w+)\s*([+\-])=\s*(.+)$/)
    if (compM) {
      const cur = Number(localVars[compM[1]]) || 0
      const delta = Number(resolveVal(compM[3], localVars))
      localVars[compM[1]] = compM[2] === '+' ? cur + delta : cur - delta
      return
    }

    // Standalone function call
    const callM = line.match(/^(\w+)\(([^)]*)\)$/)
    if (callM && funcs[callM[1]]) {
      const args = callM[2] ? callM[2].split(',').map(a => resolveVal(a.trim(), localVars)) : []
      callFunc(callM[1], args)
    }
  }

  const lines = code.split('\n')
  let i = 0

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trim()
    if (!line || line.startsWith('#')) { i++; continue }

    // def funcname(params):
    if (line.startsWith('def ')) {
      const m = line.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/)
      if (m) {
        const fname = m[1]
        const params = m[2].split(',').map(p => p.trim()).filter(Boolean)
        const body = []
        i++
        while (i < lines.length && /^(\s{4}|\t)/.test(lines[i])) {
          body.push(lines[i].trim())
          i++
        }
        funcs[fname] = { params, body }
        continue
      }
    }

    // JS for loop: for (let i = 0; i < n; i++) {
    const jsForM = line.match(/^for\s*\(\s*(?:let|var|const)?\s*(\w+)\s*=\s*([^;]+);\s*(\w+)\s*([<>]=?|!==?|===?)\s*([^;]+);\s*(\w+)(\+\+|--|\s*[+\-]=\s*\d+)\s*\)/)
    if (jsForM) {
      const [, loopVar, initExpr, condVar, condOp, condVal, , stepExpr] = jsForM
      const body = []
      i++
      while (i < lines.length && /^(\s{4}|\t|\s{2})/.test(lines[i])) {
        body.push(lines[i].trim())
        i++
      }
      // also consume single-line {} body
      vars[loopVar] = resolveVal(initExpr.trim(), vars)
      let guard = 0
      while (guard++ < 500) {
        const cv = Number(resolveVal(condVal.trim(), vars))
        const lv = Number(vars[loopVar])
        let cond = false
        if (condOp === '<') cond = lv < cv
        else if (condOp === '<=') cond = lv <= cv
        else if (condOp === '>') cond = lv > cv
        else if (condOp === '>=') cond = lv >= cv
        else if (condOp === '!=' || condOp === '!==') cond = lv !== cv
        else if (condOp === '==' || condOp === '===') cond = lv === cv
        if (!cond) break
        for (const bl of body) execLine(bl)
        if (stepExpr === '++') vars[loopVar] = Number(vars[loopVar]) + 1
        else if (stepExpr === '--') vars[loopVar] = Number(vars[loopVar]) - 1
        else {
          const dm = stepExpr.match(/([+\-])=\s*(\d+)/)
          if (dm) vars[loopVar] = Number(vars[loopVar]) + Number(dm[1] + dm[2])
        }
      }
      continue
    }

    // for var in range(...):
    const forM = line.match(/^for\s+(\w+)\s+in\s+range\(([^)]+)\)\s*:/)
    if (forM) {
      const loopVar = forM[1]
      const rawArgs = forM[2].split(',').map(a => Number(resolveVal(a.trim())))
      const [rStart, rEnd, rStep] =
        rawArgs.length === 1 ? [0, rawArgs[0], 1] :
        rawArgs.length === 2 ? [rawArgs[0], rawArgs[1], 1] : rawArgs
      const body = []
      i++
      while (i < lines.length && /^(\s{4}|\t)/.test(lines[i])) {
        body.push(lines[i].trim())
        i++
      }
      for (let v = rStart; v < rEnd; v += rStep) {
        vars[loopVar] = v
        for (const bl of body) execLine(bl)
      }
      continue
    }

    // for var in list:
    const forListM = line.match(/^for\s+(\w+)\s+in\s+(\w+)\s*:/)
    if (forListM) {
      const loopVar = forListM[1]
      const arr = vars[forListM[2]]
      const body = []
      i++
      while (i < lines.length && /^(\s{4}|\t)/.test(lines[i])) {
        body.push(lines[i].trim())
        i++
      }
      if (Array.isArray(arr)) {
        for (const v of arr) {
          vars[loopVar] = v
          for (const bl of body) execLine(bl)
        }
      }
      continue
    }

    // while condition:
    const whileM = line.match(/^while\s+(.+?)\s*:/)
    if (whileM) {
      const body = []
      i++
      while (i < lines.length && /^(\s{4}|\t)/.test(lines[i])) {
        body.push(lines[i].trim())
        i++
      }
      let guard = 0
      while (guard++ < 200) {
        try {
          const condExpr = whileM[1].replace(/\b([a-zA-Z_]\w*)\b/g, tok =>
            tok in vars ? JSON.stringify(vars[tok]) : tok
          )
          // eslint-disable-next-line no-new-func
          if (!new Function(`return (${condExpr})`)()) break
        } catch { break }
        for (const bl of body) execLine(bl)
      }
      continue
    }

    execLine(line)
    i++
  }

  return outputs
}

function checkAnswer(code, lesson) {
  const trimmed = code.trim()
  if (!trimmed) return null

  const outputs = evalCode(trimmed)
  const expected = lesson.expectedOutput.trim()
  const joined = outputs.join('\n')

  if (joined === expected) return 'correct'
  if (joined.toLowerCase() === expected.toLowerCase()) return 'correct'
  if (outputs.some(o => o.trim() === expected)) return 'correct'
  if (outputs.some(o => o.trim().toLowerCase() === expected.toLowerCase())) return 'correct'

  return 'wrong'
}

const CONFETTI_COLORS = ['#6C63FF','#10B981','#F59E0B','#EF4444','#3B82F6','#EC4899','#8B5CF6']
const PARTICLE_COUNT = 60

function Confetti() {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.2 + Math.random() * 1.2,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
  }))

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999, overflow: 'hidden' }}>
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
        @keyframes confetti-sway {
          0%,100% { margin-left: 0; }
          33%     { margin-left: 20px; }
          66%     { margin-left: -20px; }
        }
      `}</style>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: 0,
            width: p.size,
            height: p.shape === 'rect' ? p.size * 0.5 : p.size,
            borderRadius: p.shape === 'circle' ? '50%' : 2,
            background: p.color,
            animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards, confetti-sway ${p.duration * 0.6}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}

function WinOverlay({ lesson, hasNext, onNext, onBack }) {
  return (
    <>
      <Confetti />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 998,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        animation: 'fadeIn 0.2s ease',
      }}>
        <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
          @keyframes popIn { from { transform:scale(0.7); opacity:0 } to { transform:scale(1); opacity:1 } }`}
        </style>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 24,
          padding: '40px 32px',
          textAlign: 'center',
          maxWidth: 340,
          width: '100%',
          animation: 'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🏆</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Отлично!</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: 20 }}>Урок «{lesson.title}» завершён</p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--surface2)', borderRadius: 99,
            padding: '8px 20px', fontSize: 20, fontWeight: 700,
            color: 'var(--yellow)', marginBottom: 28,
          }}>
            ⚡ +{lesson.xp} XP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {hasNext ? (
              <button className="btn btn-success" onClick={onNext}
                style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}>
                Следующий урок →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={onBack}
                style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}>
                🎉 Курс завершён!
              </button>
            )}
            <button className="btn btn-secondary" onClick={onBack}
              style={{ width: '100%', justifyContent: 'center' }}>
              Назад к урокам
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Lesson({ lesson, course, onBack, onComplete, onNext, hasNext, alreadyDone }) {
  const [tab, setTab] = useState('theory')
  const [code, setCode] = useState('')
  const [result, setResult] = useState(alreadyDone ? 'correct' : null)
  const [showHint, setShowHint] = useState(false)
  const [showWin, setShowWin] = useState(false)

  function handleRun() {
    const verdict = checkAnswer(code, lesson)
    setResult(verdict)
    if (verdict === 'correct' && !alreadyDone) {
      onComplete(lesson)
      setShowWin(true)
    }
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px' }}>
      {showWin && (
        <WinOverlay
          lesson={lesson}
          hasNext={hasNext}
          onNext={() => { setShowWin(false); onNext() }}
          onBack={() => { setShowWin(false); onBack() }}
        />
      )}
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

          {result === 'correct' && alreadyDone && (
            <div style={{ marginTop: 12 }}>
              {hasNext ? (
                <button
                  className="btn btn-success"
                  onClick={onNext}
                  style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}
                >
                  Следующий урок →
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={onBack}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  🏆 Курс завершён! Вернуться назад
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
