// 思路：call()、apply()、bind() 都是用来重定义 this 这个对象的

Function.prototype.mycall = function (context) {
  context = context || window
  context.fn = this
  
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.myapply = function (context) {
  context = context || window
  context.fn = this
  
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

Function.prototype.mybind = function (context) {
  let _this = this
  const args = [...arguments].slice(1)
  return function F() {
    if (this instanceof F) { // 支持柯里化
      return new _this(...args, ...arguments)
    } else {
      return _this.apply(context, args.concat(...arguments))
    }
  }
}

// 记住demo有助于理解call, apply, bind有什么用
let name = '1', age = 1
const obj1 = {
  name: '2',
  age: 2,
  test: function (param) {
    console.log(this.name, this.age, param)
  }
}
const obj2 = {
  name: '3',
  age: 3
}

obj1.test('test')
obj1.test.mycall(obj2, 'test')
obj1.test.myapply(obj2, ['test'])
obj1.test.mybind(obj2, 'test')()
// obj1.test.mycall(window) // 浏览器有效
// obj1.test.myapply(window, ['test'])
// obj1.test.mybind(window, 'test')()