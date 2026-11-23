let activeScroll = null
let wheelCleanup = null
let wheelState = null

/**
 * Slower, eased page scroll used for sidebar / in-page navigation.
 */
export function smoothScrollTo(target, { duration = 1100, offset = 0 } = {}) {
  const el =
    typeof target === 'string' ? document.getElementById(target) || document.querySelector(target) : target

  if (!el) return Promise.resolve()

  if (activeScroll) {
    cancelAnimationFrame(activeScroll)
    activeScroll = null
  }

  // Pause wheel lerp while navigating to a section.
  if (wheelState) wheelState.paused = true

  const startY = window.scrollY || window.pageYOffset
  const rect = el.getBoundingClientRect()
  const endY = Math.max(0, startY + rect.top - offset)
  const distance = endY - startY

  if (Math.abs(distance) < 2) {
    if (wheelState) {
      wheelState.current = endY
      wheelState.target = endY
      wheelState.paused = false
    }
    return Promise.resolve()
  }

  const startTime = performance.now()
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

  return new Promise((resolve) => {
    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / duration)
      const y = startY + distance * ease(progress)
      window.scrollTo(0, y)

      if (progress < 1) {
        activeScroll = requestAnimationFrame(step)
      } else {
        activeScroll = null
        if (wheelState) {
          wheelState.current = y
          wheelState.target = y
          wheelState.paused = false
        }
        resolve()
      }
    }

    activeScroll = requestAnimationFrame(step)
  })
}

function isScrollable(el) {
  if (!el || el === document.body || el === document.documentElement) return false
  const style = window.getComputedStyle(el)
  const overflowY = style.overflowY
  return (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') && el.scrollHeight > el.clientHeight + 1
}

function findScrollableParent(start) {
  let node = start
  while (node && node !== document.body && node !== document.documentElement) {
    if (isScrollable(node)) return node
    node = node.parentElement
  }
  return null
}

/**
 * Makes normal mouse-wheel / trackpad page scrolling slower and smoother
 * so browsing top → bottom takes more time and feels calmer.
 */
export function initSmoothWheelScroll({
  speed = 0.38,
  friction = 0.085,
} = {}) {
  if (typeof window === 'undefined') return () => {}
  if (wheelCleanup) return wheelCleanup

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return () => {}

  wheelState = {
    current: window.scrollY || 0,
    target: window.scrollY || 0,
    paused: false,
    raf: null,
  }

  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

  const tick = () => {
    if (wheelState.paused) {
      wheelState.raf = null
      return
    }

    const diff = wheelState.target - wheelState.current
    if (Math.abs(diff) < 0.4) {
      wheelState.current = wheelState.target
      window.scrollTo(0, wheelState.current)
      wheelState.raf = null
      return
    }

    wheelState.current += diff * friction
    window.scrollTo(0, wheelState.current)
    wheelState.raf = requestAnimationFrame(tick)
  }

  const onWheel = (event) => {
    if (wheelState.paused) return

    const nested = findScrollableParent(event.target)
    if (nested) return

    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

    event.preventDefault()

    if (!wheelState.raf) {
      wheelState.current = window.scrollY || 0
      wheelState.target = wheelState.current
    }

    let delta = event.deltaY
    if (event.deltaMode === 1) delta *= 16
    if (event.deltaMode === 2) delta *= window.innerHeight

    // Lower speed = slower travel down the page.
    wheelState.target = Math.min(maxScroll(), Math.max(0, wheelState.target + delta * speed))

    if (!wheelState.raf) wheelState.raf = requestAnimationFrame(tick)
  }

  const onScroll = () => {
    if (wheelState.paused || wheelState.raf) return
    wheelState.current = window.scrollY || 0
    wheelState.target = wheelState.current
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('scroll', onScroll, { passive: true })

  wheelCleanup = () => {
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('scroll', onScroll)
    if (wheelState?.raf) cancelAnimationFrame(wheelState.raf)
    wheelState = null
    wheelCleanup = null
  }

  return wheelCleanup
}
