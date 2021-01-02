function debouce(fn, n) {
  let timer
  return function() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn
    }, n)
  }
}

function throttle(fn, n) {
  let prev = Date.now()
  return function() {
    let now = Date.now()
    if (now - prev >= n) {
      fn()
      prev = now
    }
  }
}
