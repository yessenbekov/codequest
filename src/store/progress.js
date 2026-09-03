import { supabase } from '../lib/supabase'

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

export async function loadProgressFromSupabase(userId) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('data')
    .eq('user_id', userId)
    .single()

  if (error || !data) return null
  return { ...defaultState(), ...data.data }
}

export async function saveProgressToSupabase(userId, state) {
  await supabase
    .from('user_progress')
    .upsert({ user_id: userId, data: state, updated_at: new Date().toISOString() })
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
