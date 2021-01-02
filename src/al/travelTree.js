// 创建新的item
const map = {}
function _newItem(val) {
  // 用一个map缓存已创建的item
  if (!map[val]) {
    map[val] = {
      left: null,
      right: null,
      val: val
    }
  }
  return map[val]
}

// 获取左节点或右节点的id
const _getChildId = (cid, id, leftOfRight) => {
  if (cid.length <= id.length) return false
  const ids = cid.split('-')
  const tail = ids[ids.length - 1]
  return (ids.slice(0, -1).join('-') === id) && (tail === (leftOfRight ? '1' : '2'))
}

function makeTree(arr) {
  let root
  for (let m = 0; m < arr.length; m++) {
    const id = arr[m]
    const item = _newItem(id)
    if (!root) {
      root = item
    }
    const leftChildId = arr.find(cid => _getChildId(cid, id, true))
    leftChildId && (item.left = _newItem(leftChildId))
    const rightChildId = arr.find(cid => _getChildId(cid, id, false))
    rightChildId && (item.right = _newItem(rightChildId))
  }
  return root
}

// 非递归版本
function front(root) {
  let node = root
  let stack = []
  while (node || stack.length) {
    if (node) {
      console.log(node.val)
      stack.push(node)
      node = node.left
    } else {
      node = stack.pop()
      node = node.right
    }
  }
}

// 非递归版本
function middle(root) {
  let node = root
  let stack = []
  while (node || stack.length) {
    if (node) {
      stack.push(node)
      node = node.left
    } else {
      node = stack.pop()
      console.log(node.val)
      node = node.right
    }
  }
}

// 非递归版本
function end(root) {
  let node = root
  let stack = []
  let map = {}
  while (node || stack.length) {
    if (node) {
      stack.push(node)
      node = node.left
    } else {
      node = stack[stack.length - 1]
      if (!map[node.val]) {
        map[node.val] = node
        node = node.right
      } else {
        console.log(map[node.val].val)
        stack.pop()
        node = null
      }
    }
  }
}

const arr = ['1', '1-1', '1-2', '1-1-1', '1-1-2', '1-1-1-1']
const root = makeTree(arr)

console.log('先序')
front(root)
console.log('中序')
middle(root)
console.log('后序')
end(root)