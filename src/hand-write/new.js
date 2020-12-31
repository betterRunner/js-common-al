function myNew(fn) {
  const ret = {}
  ret.__proto__ = fn.protoType
  fn.apply(ret, Array.from(arguments).slice(1))
  return ret
}

function fn(name, age) {
  this.name = name
  this.age = age
}
const obj = myNew(fn, 'name', 20)
console.log(obj)
