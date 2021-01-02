function curry(fn, ...arr) {
  return (...args) => {
    console.log(fn.length, args, arr)
    if (args.length + arr.length >= fn.length) {
      return fn.call(this, ...arr, ...args)
    } else {
      return curry(fn, ...arr, ...args)
    }
  }
}

function testFn(n1, n2, n3) {
  return n1 + n2 + n3
}

const test = curry(testFn)
const ret1 = test(1, 2)(3)
const ret2 = test(1)(2)(3)
const ret3 = test(1, 2, 3)
console.log(ret1)
console.log(ret2)
console.log(ret3)
