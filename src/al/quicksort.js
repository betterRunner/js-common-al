// 快速排序（英语：Quicksort），又称划分交换排序（partition-exchange sort），
// 简称快排，一种排序算法，最早由东尼·霍尔提出。在平均状况下，排序n个项目要O(nLogn)次比较。
// 在最坏状况下则需要O(n^2)次比较，但这种状况并不常见。
// 事实上，快速排序O(nLogn)通常明显比其他算法更快，因为它的内部循环（inner loop）可以在大部分的架构上很有效率地达成

// https://segmentfault.com/a/1190000017814119


// 1. 简单版本
function fn(arr) {
  if (!arr.length) return []

  const left = [], right = []
  const pivot = arr[0] // 顺便选择一个数作为基点（TODO:选择接近中位数）
  for (let m=1; m<arr.length; m++) {
    const item = arr[m]
    if (item <= pivot) { // 小的放左边
      left.push(item)
    } else { // 大的放右边
      right.push(item)
    }
  }
  return [...fn(left), pivot, ...fn(right)] // 递归
}


// 2. 优化版本
function swap(arr, m, n) {
  const tmp = arr[m]
  arr[m] = arr[n]
  arr[n] = tmp
}
function divide(arr, s, e) {
  const pivot = arr[e-1] // 以最后一个节点为基准
  let p = s - 1 // 以起点-1作为p的坐标
  for (let m=s; m<e-1; m++) {
    const item = arr[m]
    // 找到比基准点小的s，以p+1为分割线，把p+1原有位置（大的）和s互换位置
    // 这样遍历完就相当于以p+1为分割线把小的放在左边，大的放在右边（很巧妙）
    if (item <= pivot) {
      p += 1
      swap(arr, p, m)
    }
  }
  swap(arr, p + 1, e - 1) // 把基准点放到对应中间位置
  return p + 1
}
function fn2(arr, s = 0, e) {
  e = e === undefined ? arr.length : e
  if (s >= e || arr.length <= 1) return
  
  p = divide(arr, s, e) // 最后一个作为基准，小的放前面，大的放后面，在把基准点放到对应中间位置
  fn2(arr, s, p) // 小的部分递归
  fn2(arr, p + 1, e) // 大的部分递归
  return arr
}

const test = [12, 3, 1, 17, 8, 20, 0, 2]
const res = fn(test)
console.log(res)

const res2 = fn2(test)
console.log(res2)