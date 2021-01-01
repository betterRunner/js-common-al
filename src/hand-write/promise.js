class MyPromise {
  constructor(fn) {
    this._status = 'pending' // promise实际是一个状态机，三种状态：pending, resolved, reject
    this._value = null // 缓存resolve带的value，后续then的时候使用
    this._reason = null // 缓存错误原因，后续catch的时候用
    this._resolveCbs = [] // 缓存then链多个依赖resolve的回调函数
    this._rejectCbs = [] // 缓存then链多个依赖reject的回调函数

    const _resolve = (val) => {
      // 为什么resolve 加setTimeout?
      // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
      // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
      setTimeout(() => {
        this._status = 'resolved' // 更新状态为resolved
        this._value = val // 缓存value
        this._resolveCbs.forEach((cb) => cb(val)) // 触发所有resolve回调函数
        console.log('resolved')
      })
    }
    const _reject = (reason) => {
      setTimeout(() => {
        this._status = 'rejected' // 更新状态为rejected
        this._reason = reason
        this._rejectCbs.forEach((cb) => cb(reason)) // 触发所有reject回调函数
        console.log('rejected')
      })
    }
    try {
      fn(_resolve, _reject) // 立即执行fn函数，即是状态机的开始
    } catch (e) {
      _reject(e) // 报错，执行reject回调函数
    }
  }

  // then函数：返回的又是一个promise，promise的状态需要再次管理
  then(onFulfilled, onRejected = err => err) {
    // then接收一个onFulfilled和onRejected
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      const fulfillFn = (val) => {
        try {
          const res = onFulfilled(val)
          if (res instanceof MyPromise) {
            // 如果onFulfilled返回了一个promise，把onFulfilledNext和onRejectedNext放入then执行
            res.then(onFulfilledNext, onRejectedNext)
          } else {
            // 如果返回普通对象，直接执行onFulfilledNext
            onFulfilledNext(res)
          }
        } catch (err) {
          onRejectedNext(err)
        }
      }

      const rejectFn = (error) => {
        const res = onRejected(error)
        if (res instanceof MyPromise) {
          // 如果onRejected返回了一个promise，把onFulfilledNext和onRejectedNext放入then执行
          res.then(onFulfilledNext, onRejectedNext)
        } else {
          // 如果返回普通对象，直接执行onRejectedNext
          onRejectedNext(res)
        }
      }

      if (this._status === 'pending') {
        this._resolveCbs.push(fulfillFn)
        this._rejectCbs.push(rejectFn)
      } else if (this._status === 'resolved') {
        fulfillFn(this._value)
      } else if (this._status === 'rejectd') {
        rejectFn(this._reason)
      }
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
})
  .then((data) => {
    console.log('then', data)
    return '2'
  })
  .then((data2) => {
    console.log('then2', data2)
    return '3'
  })
  .catch((err) => {
    console.log(err)
  })
// console.log(p1)
