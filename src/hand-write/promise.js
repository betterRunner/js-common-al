
class MyPromise {
  constructor(fn) {
    this._status = 'pending' // promise实际是一个状态机，三种状态：pending, resolved, reject
    this._value = null // 缓存resolve带的value，后续then的时候使用
    this._resolveCbs = [] // 缓存then链多个依赖resolve的回调函数
    this._rejectCbs = [] // 缓存then链多个依赖reject的回调函数

    const _resolve = (val) => {
      this._status = 'resolved' // 更新状态为resolved
      this._value = val // 缓存value
      this._resolveCbs.forEach(cb => cb(val)) // 触发所有resolve回调函数
      console.log('resolved')
    }
    const _reject = (err) => {
      this._status = 'rejected' // 更新状态为rejected
      this._rejectCbs.forEach(cb => cb(err)) // 触发所有reject回调函数
      console.log('rejected')
    }
    try {
      fn(_resolve, _reject) // 立即执行fn函数，即是状态机的开始
    } catch(e) {
      _reject(e) // 报错，执行reject回调函数
    }
  }

  // then函数
  then(resolveFn, rejectFn) { // then接收一个rejectFn和resolveFn
    if (this._status === 'pending') { // 如果状态为pending则放入缓存数组
      this._resolveCbs.push(resolveFn)
    } else if (this._status === 'resolved') { // 如果状态为resolved则立即执行resolveFn
      resolveFn(this._value)
    } else if (this._status === 'rejected') { // 如果状态为reject则立即执行rejectFn
      rejectFn()
    }
    return new MyPromise((newResolveFn, newRejectFn) => {
      this._resolveCbs.push(newResolveFn)
      this._rejectCbs.push(newRejectFn)
    })
  }
  
  // catch函数
  catch(rejectFn) {
    if (this._status === 'pending') {
      this._rejectCbs.push(rejectFn)
    } else if (this._status === 'rejected') {
      rejectFn()
    }
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('1')
  }, 2000)
  // setTimeout(() => {
  //   reject('2')
  // }, 1000)
}).then((data) => {
  console.log('then', data)
}).then(data2 => {
  console.log('then2', data2)
}).then(data3 => {
  console.log('then3', data3)
})
// console.log(p1)