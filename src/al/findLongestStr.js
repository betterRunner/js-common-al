function findLongestStr(s) {
  let str = ''
  let len = 0
  for (let m=0; m<s.length; m++) {
    const char = s[m]
    const index = str.indexOf(char)
    if (index === -1) {
      str += char
      len = len < str.length ? str.length : len
    } else {
      str = str.substring(index + 1) + char
    }
  }
  return len
}

const test1 = 'abcdefghijabecdfg'
const test2 = 'abcdefghijabecdfghijk'
const test3 = 'abcabcdabcd'
const len1 = findLongestStr(test1)
const len2 = findLongestStr(test2)
const len3 = findLongestStr(test3)
console.log(len1, len2, len3)