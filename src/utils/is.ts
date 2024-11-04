export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768
}

export const getWindowWidth = () => {
  if (typeof window === 'undefined') return 0
  return window.innerWidth
}
