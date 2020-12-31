function curry(fn, ...arr) {
  return (...args) => {
    if (args.length === 0) { // 当输入空参数才调用
      return fn(...arr, ...args)
    } else {
      return curry(fn, ...arr, ...args)
    }
  }
}

function testFn(n1 = 0, n2 = 0, n3 = 0) {
  return n1 + n2 + n3
}

const test = curry(testFn)
const ret1 = test(1, 2)(3)()
const ret2 = test(1)(2)(3)()
const ret3 = test(1, 2, 3)()
console.log(ret1)
console.log(ret2)
console.log(ret3)