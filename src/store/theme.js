export function loadTheme() {
  return localStorage.getItem('cq_theme') || 'dark'
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('cq_theme', theme)
}
