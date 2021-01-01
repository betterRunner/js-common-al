class EventEmitter {
  constructor() {
    this.listeners = Object.create(null)
  }

  _isEvtBind(event) {
    return Array.isArray(this.listeners[event])
  }

  on(event, listener) {
    if (!event || !listener) {
      return
    }
    this.listeners[event] = this.listeners[event] || []
    const find = this.listeners[event].find(ele => ele === listener)
    !find && this.listeners[event].push(listener)
    return listener
  }

  emit(event, ...args) {
    if (!this._isEvtBind(event)) {
      return
    }
    this.listeners[event].forEach(cb => cb(...args))
  }

  off(event, listener) {
    if (!this._isEvtBind(event)) {
      return
    }
    if (listener) {
      const index = this.listeners[event].findIndex(ele => ele === listener)
      console.log('off', listener, this.listeners[event], index)
      index !== -1 && this.listeners[event].splice(index, 1)
    } else {
      delete this.listeners[event]
    }
  }

  once(event, listener) {
    const _once = (listener) => { // 借助闭包实现添加一些其他功能进函数
      const _this = this
      return function fn(...args) { // 具名函数实现把自己放入数组的问题
        listener(...args)
        _this.off(event, fn)
      }
    }
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(_once(listener))
  }
}

const emitter = new EventEmitter()
emitter.on('test', (...args) => {
  console.log('test', ...args)
})
emitter.once('test2', (...args) => {
  console.log('test2', ...args)
})
const listener = emitter.on('test3', (...args) => {
  console.log('test3', ...args) // should not show
})
// emitter.off('test3', listener)
for (let m=0; m<2; m++) {
  emitter.emit('test', 1, 2, 3)
  emitter.emit('test2', 1, 2, 3)
  emitter.emit('test3', 1, 2, 3)
}