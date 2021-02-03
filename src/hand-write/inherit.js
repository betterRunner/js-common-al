function Person(name) {
  this.name = name
}

// 1. 继承原型
function Teacher() {
  this.name = 'name'
}
Teacher.prototype = new Person()
const teacher = new Teacher()

// 缺点：1. 无法向构造函数传参
// 2. person所有原型链的属性都是公用的
// 3. 继承单一

// 2. 继承构造函数
function Teacher() {
  Person.call(this, 'name')
}
const teacher = new Teacher()

// 缺点：1. 无法继承person原型链属性

// 3. 组合型
function Teacher(name) {
  Person.call(this, name)
}
Teacher.propotype = new Person()
const teacher = new Teacher('name')

// 缺点：1. 调用了两次Person

// 4. 寄生组合
function F(obj) {
  function f() {}
  f.propotype = obj
  return new f()
}

const temp = F(Person.propotype)
const constructorFn = () => {
  Person.call(this, 'name')
}
constructorFn.propotype = new temp()
temp.constructor = temp

const teacher = new constructorFn()

// 解决了上述缺点