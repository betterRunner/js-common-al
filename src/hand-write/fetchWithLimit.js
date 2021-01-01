function myFetch(url) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(url), 1000))
}

function fetchWithLimit(urls, max, callback) {
  const len = urls.length

  const requestQueue = []
  const results = []
  let m = 0
  const handleReuqest = (url) => {
    const req = myFetch(url).then(res => {
      const rLen = results.push(res)
      console.log('res', len, rLen)
      if (rLen < len && m + 1 < len) {
        requestQueue.shift()
        m += 1
        handleReuqest(requestQueue[m])
      } else if (rLen === len) {
        callback()
      }
    })
    requestQueue.push(req)
    if (requestQueue.length < max) {
      m += 1
      handleReuqest(urls[m])
    }
  }
  handleReuqest(urls[m])
}
fetchWithLimit(Array.from(Array(10).keys()), 2, () => {
  console.log('cb')
})
