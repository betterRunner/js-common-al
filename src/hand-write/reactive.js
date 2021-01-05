const isObject = (obj) => typeof obj === 'object' && obj !== null

// VUE2
function reactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val)
      return val
    },
    set(v) {
      console.log('set', v)
      val = v
      // update()
    }
  })
}
const obj = {}
reactive(obj, 'a', 1)
obj.a

// VUE3
function reactive2(obj) {
  if (!isObject(obj)) {
    return obj
  }

  return new Proxy(obj, {
    get(target, key) {
      const res = Reflect.get(target, key)
      console.log('get', key)
      return isObject(res) ? reactive2(res) : res
    },
    set(target, key, val) {
      const res = Reflect.set(target, key, val)
      console.log('set', key)
      // update()
      return res
    }
  })
}
const p = reactive2({ a: [] })
p.a.push(1)
console.log(p.a)