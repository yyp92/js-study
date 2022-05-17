/**
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * 
 * 示例:
 * 输入: n = 4, k = 2
 * 输出:
 * [
 *  [2,4],
 *  [3,4],
 *  [2,3],
 *  [1,2],
 *  [1,3],
 *  [1,4],
 * ]
 */

let result = []
let path = []
var combine = function(n, k) {
    result = []
    combineHelper(n, k, 1)
    return result
};

const combineHelper = (n, k, startIndex) => {
    if (path.length === k) {
        result.push([...path])
        return
    }

    // 剪枝操作，至多从哪里开始 n - (k - path.length) + 1 ---> 因为i=startIndex,所以加1
    for (let i = startIndex; i <= n - (k - path.length) + 1; ++i) {
        path.push(i)
        combineHelper(n, k, i + 1)
        
        // 回溯操作
        path.pop()
    }
}

// 测试
// console.log(combine(5, 2))
console.log(combine(4, 2))