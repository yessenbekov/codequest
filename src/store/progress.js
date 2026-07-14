const KEY = 'codequest_progress'

const defaultState = () => ({
  completedLessons: {},
  xp: 0,
  streak: 0,
  lastActiveDate: null,
})

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...defaultState(), ...JSON.parse(raw) } : defaultState()
  } catch {
    return defaultState()
  }
}

export function saveProgress(state) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function markLessonComplete(state, lessonId, xpGain) {
  if (state.completedLessons[lessonId]) return state

  const today = new Date().toDateString()
  const wasActiveYesterday =
    state.lastActiveDate === new Date(Date.now() - 86400000).toDateString()

  return {
    ...state,
    completedLessons: { ...state.completedLessons, [lessonId]: true },
    xp: state.xp + xpGain,
    streak: wasActiveYesterday || state.lastActiveDate === today
      ? state.streak + (state.lastActiveDate === today ? 0 : 1)
      : 1,
    lastActiveDate: today,
  }
}

export function isLessonCompleted(state, lessonId) {
  return !!state.completedLessons[lessonId]
}
