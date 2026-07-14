import { useState, useCallback } from 'react'
import { loadProgress, saveProgress, markLessonComplete, isLessonCompleted } from './store/progress'
import Home from './pages/Home'
import CourseMap from './pages/CourseMap'
import Lesson from './pages/Lesson'
import './index.css'

export default function App() {
  const [progress, setProgress] = useState(() => loadProgress())
  const [view, setView] = useState('home')
  const [activeCourse, setActiveCourse] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)

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

  return (
    <div style={{ minHeight: '100dvh' }}>
      {view === 'home' && (
        <Home progress={progress} onSelectCourse={handleSelectCourse} />
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
          onBack={() => setView('course')}
          onComplete={handleCompleteLesson}
        />
      )}
    </div>
  )
}
