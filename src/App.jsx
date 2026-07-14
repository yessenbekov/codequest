import { useState, useCallback, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { loadProgress, saveProgress, markLessonComplete, isLessonCompleted } from './store/progress'
import { loadTheme, applyTheme } from './store/theme'
import Home from './pages/Home'
import CourseMap from './pages/CourseMap'
import Lesson from './pages/Lesson'
import Auth from './pages/Auth'
import './index.css'

export default function App() {
  const [session, setSession] = useState(undefined)
  const [progress, setProgress] = useState(() => loadProgress())
  const [theme, setTheme] = useState(() => {
    const t = loadTheme()
    applyTheme(t)
    return t
  })

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }
  const [view, setView] = useState('home')
  const [activeCourse, setActiveCourse] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  const updateProgress = useCallback((next) => {
    setProgress(next)
    saveProgress(next)
  }, [])

  function handleSelectCourse(course) {
    setActiveCourse(course)
    setView('course')
  }

  function handleSelectLesson(lesson) {
    setActiveLesson(lesson)
    setView('lesson')
  }

  function handleCompleteLesson(lesson) {
    updateProgress(markLessonComplete(progress, lesson.id, lesson.xp))
  }

  function handleNextLesson() {
    const lessons = activeCourse.lessons
    const idx = lessons.findIndex(l => l.id === activeLesson.id)
    if (idx < lessons.length - 1) {
      setActiveLesson(lessons[idx + 1])
    }
  }

  const hasNext = activeCourse && activeLesson
    ? activeCourse.lessons.findIndex(l => l.id === activeLesson.id) < activeCourse.lessons.length - 1
    : false

  if (session === undefined) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-dim)' }}>Загрузка...</div>
      </div>
    )
  }

  if (!session) {
    return <Auth theme={theme} onToggleTheme={toggleTheme} />
  }

  return (
    <div style={{ minHeight: '100dvh' }}>
      {view === 'home' && (
        <Home
          progress={progress}
          onSelectCourse={handleSelectCourse}
          user={session.user}
          onLogout={() => supabase.auth.signOut()}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      {view === 'course' && (
        <CourseMap
          course={activeCourse}
          progress={progress}
          onBack={() => setView('home')}
          onSelectLesson={handleSelectLesson}
        />
      )}
      {view === 'lesson' && (
        <Lesson
          lesson={activeLesson}
          course={activeCourse}
          alreadyDone={isLessonCompleted(progress, activeLesson.id)}
          hasNext={hasNext}
          onBack={() => setView('course')}
          onComplete={handleCompleteLesson}
          onNext={handleNextLesson}
        />
      )}
    </div>
  )
}
