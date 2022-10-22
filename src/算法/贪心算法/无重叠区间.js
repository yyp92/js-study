/**
 * 435.无重叠区间
 * 
 * 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
 * 注意: 可以认为区间的终点总是大于它的起点。 区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
 * 
 * 示例 1:
 *  输入: [ [1,2], [2,3], [3,4], [1,3] ]
 *  输出: 1
 *  解释: 移除 [1,3] 后，剩下的区间没有重叠。
 * 
 * 示例 2:
 *  输入: [ [1,2], [1,2], [1,2] ]
 *  输出: 2
 *  解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
 * 
 * 示例 3:
 *  输入: [ [1,2], [2,3] ]
 *  输出: 0
 *  解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
 * 
 * 时间复杂度：O(nlog n) ，有一个快排
 * 空间复杂度：O(n)，有一个快排，最差情况(倒序)时，需要n次递归调用。因此确实需要O(n)的栈空间
 * 
 * 总结如下难点：
 *  难点一：一看题就有感觉需要排序，但究竟怎么排序，按左边界排还是右边界排。
 *  难点二：排完序之后如何遍历，如果没有分析好遍历顺序，那么排序就没有意义了。
 *  难点三：直接求重复的区间是复杂的，转而求最大非重复区间个数。
 *  难点四：求最大非重复区间个数时，需要一个分割点来做标记。
 */

// 按右边界排序
const eraseOverlapIntervals = function(intervals) {
    // 排序
    intervals.sort((a, b) => {
        return a[1] - b[1]
    })

    // 记录非交叉区间的个数
    let count = 1
    // 记录区间分割点
    let end = intervals[0][1]

    for (let i = 1; i < intervals.length; i++) {
        let interval = intervals[i]

        if (interval[0] >= end) {
            end = interval[1]
            count += 1
        }
    }
    
    return intervals.length - count
};

// 按左边界排序
const eraseOverlapIntervals1 = function(intervals) {
    // 按照左边界升序排列
    intervals.sort((a, b) => a[0] - b[0])

    // 记录非交叉区间的个数
    let count = 1
    // 记录区间分割点
    let end = intervals[intervals.length - 1][0]

    // 倒序遍历，对单个区间来说，左边界越大越好，因为给前面区间的空间越大
    for (let i = intervals.length - 2; i >= 0; i--) {
        if (intervals[i][1] <= end) {
            count++
            end = intervals[i][0]
        }
    }

    // count 记录的是最大非重复区间的个数
    return intervals.length - count
}


// 测试
const arr1 = [ [1,2], [2,3], [3,4], [1,3] ]
const arr2 = [ [1,2], [1,2], [1,2] ]
const arr3 = [ [1,2], [2,3] ]
console.log(eraseOverlapIntervals(arr1))
console.log(eraseOverlapIntervals(arr2))
console.log(eraseOverlapIntervals(arr3))
console.log(eraseOverlapIntervals1(arr1))
console.log(eraseOverlapIntervals1(arr2))
console.log(eraseOverlapIntervals1(arr3))