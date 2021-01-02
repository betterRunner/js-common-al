function getList(arr) {
  const map = {}
  for (let m=0; m<arr.length; m++) {
    const ele = arr[m]
    let lastEle
    if (m > 0) {
      lastEle = map[arr[m-1]]
    }
    map[ele] = map[ele] || {
      ele: ele,
      next: lastEle,
      isVisited: false
    }
    if (!map[ele].next) {
      map[ele].next = map[arr[m-1]]
    }
  }
  return arr.reverse().map(ele => map[ele])
}
const arr = [3, 1, 2, 3, 4, 5]
const list = getList(arr)

function listRing1(list) {
  let node = list
  while(node) {
    if (node.isVisited) return true
    node.isVisited = true
    node = node.next
  }
  return false
}
const res = listRing1(list[0])
console.log(res)

function listRing2(list) {
  let fast = list.next && list.next.next
  let slow = list.next
  while(fast) {
    if (fast === slow) {
      return true
    }
    fast = fast.next && fast.next.next
    slow = slow.next
  }
  return false
}
const res2 = listRing2(list[0])
console.log(res2)
