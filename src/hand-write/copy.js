function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function isArray(obj) {
  return Array.isArray(obj)
}

function copy(obj) {
  if (isObject(obj)) {
    const res = isArray(obj) ? [] : {}
    for(const key in obj) {
      res[key] = obj[key]
    }
    return res
  }
  return obj
}

function deepcopy(obj) {
  if (isObject(obj)) {
    if (isArray(obj)) {
      obj = obj.slice()
    }
    const res = isArray(obj) ? [] : {}
    for(const key in obj) {
      res[key] = deepcopy(obj[key])
    }
    return res
  }
  return obj
}

const obj = { a: '1', b: [ { c: '1'}  ] }
const copyed = copy(obj)
const deepcopyed = deepcopy(obj)
obj.b[0].c = '2'
console.log(copyed)
console.log(deepcopyed)