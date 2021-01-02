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
  const pivot = arr[e] // 以最后一个节点为基准
  let p = s - 1 // 以起点-1作为p的坐标
  for (let m=s; m<e; m++) {
    const item = arr[m]
    // 找到比基准点小的s，以p+1为分割线，把p+1原有位置（大的）和s互换位置
    // 这样遍历完就相当于以p+1为分割线把小的放在左边，大的放在右边（很巧妙）
    if (item <= pivot) {
      p += 1
      swap(arr, p, m)
    }
  }
  swap(arr, p + 1, e) // 把基准点放到对应中间位置
  return p + 1
}
function fn2(arr, s = 0, e) {
  e = e === undefined ? arr.length - 1 : e
  if (s > e) return arr
  
  p = divide(arr, s, e) // 最后一个作为基准，小的放前面，大的放后面，在把基准点放到对应中间位置
  fn2(arr, s, p - 1) // 小的部分递归
  fn2(arr, p + 1, e) // 大的部分递归
  return arr
}

const test = [12, 3, 1, 17, 8, 20, 0, 2]
const ret = fn(test)
console.log(ret)

const ret2 = fn2(test)
console.log(ret2)

// 扩展：找到第K大的数
// https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/shu-zu-zhong-de-di-kge-zui-da-yuan-su-by-leetcode-/
// 思路：在快速排序过程中，当基准点到了第k位置的时候就可以停止递归了
// 因此我们可以改进快速排序算法来解决这个问题：在分解的过程当中，我们会对子数组进行划分，如果划分得到的 qq 正好就是我们需要的下标，就直接返回 a[q]a[q]；否则，如果 qq 比目标下标小，就递归右子区间，否则递归左子区间。这样就可以把原来递归两个区间变成只递归一个区间，提高了时间效率。这就是「快速选择」算法。

// 为什么第k大的数和快排算法有关？因为快排算法核心是以某个数为分割点，左边比它小，右边比它大，所以第k个分割点就是第k大的数
function findKVal(arr, s, e, k) {
  const p = divide(arr, s, e) // 小的在基准点左边，大的在基准点右边
  console.log(arr, p, k)
  if (p === k) { // 基准点就是k
    return arr[k] // 返回arr[k]就是第k大的数
  } else { // 根据p和k的大小关系决定是左边递归还是右边递归（这样就不需要两边都递归节省运算）
    return p > k ? findKVal(arr, s, p - 1, k) : findKVal(arr, p + 1, e, k)
  }
}
const k = 1
const kIndex = test.length - k - 1
const ret3= findKVal(test, 0, test.length - 1, kIndex)
console.log(ret3)