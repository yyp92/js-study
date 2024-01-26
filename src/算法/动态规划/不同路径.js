/**
 * 不同路径
 * https://leetcode.cn/problems/unique-paths/
 * 
 * ⼀个机器⼈位于⼀个 m x n ⽹格的左上⻆ （起始点在下图中标记为 “Start” ）。
 * 机器⼈每次只能向下或者向右移动⼀步。机器⼈试图达到⽹格的右下⻆（在下图中标记为 “Finish” ）。
 * 问总共有多少条不同的路径？
 * 
 * 示例1：
 *  输⼊：m = 3, n = 7
 *  输出：28
 * 
 * 示例2：
 *  输⼊：m = 2, n = 3
 *  输出：3
 *  解释：
 *      从左上⻆开始，总共有 3 条路径可以到达右下⻆。
 *      1. 向右 -> 向右 -> 向下
 *      2. 向右 -> 向下 -> 向右
 *      3. 向下 -> 向右 -> 向右
 * 
 * 示例3：
 *  输⼊：m = 7, n = 3
 *  输出：28
 * 
 * 示例 4：
 *  输⼊：m = 3, n = 3
 *  输出：6
 * 
 * 提示：
 *  1 <= m, n <= 100
 *  题⽬数据保证答案⼩于等于 2 * 10^9
 */

// 深搜解法
// 时间复杂度O(2^(m + n - 1) - 1)
// const solution = (i, j, m, n) => {
//     // 越界了
//     if (i > m || j > n) {
//         return 0
//     }

//     // 找到⼀种⽅法，相当于找到了叶⼦节点
//     if (i == m && j == n) {
//         return 1
//     }

//     return solution(i + 1, j, m, n) + solution(i, j + 1, m, n)
// }


// 动态规划
/**
 * 1. 确定dp数组（dp table）以及下标的含义
 *  dp[i][j] ：表示从（0 ，0）出发，到(i, j) 有dp[i][j]条不同的路径。
 * 
 * 2. 确定递推公式
 *  想要求dp[i][j]，只能有两个⽅向来推导出来，即dp[i - 1][j] 和 dp[i][j - 1]。
 *  此时在回顾⼀下 dp[i - 1][j] 表示啥，是从(0, 0)的位置到(i - 1, j)有⼏条路径，dp[i][j - 1]同理。
 *  那么很⾃然，dp[i][j] = dp[i - 1][j] + dp[i][j - 1]，因为dp[i][j]只有这两个⽅向过来。
 */
// 二维数组
// 时间复杂度：O(m * n)
// 空间复杂度：O(m * n)
// const solution = (m, n) => {
//     // * dp[i][j] ：表示从（0 ，0）出发，到(i, j) 有dp[i][j]条不同的路径。

//     const dp = Array.from({length: m}).map(
//         () => new Array(n).fill(0)
//     );

//     for (let i = 0; i < m; i++ ) {
//         dp[i][0] = 1
//     }

//     for (let j = 0; j < n; j++ ) {
//         dp[0][j] = 1
//     }

//     for (let i = 1; i < m; i++) {
//         for (let j = 1; j < n; j++) {
//             dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
//         }
//     }

//     return dp[m - 1][n - 1]
// }


// 一维数组
// 时间复杂度：O(m * n)
// 空间复杂度：O(n)
// const solution = (m, n) => {
//     const dp = []

//     for (let i = 0; i < n; i++) {
//         dp[i] = 1
//     }

//     for (let j = 1; j < m; j++) {
//         for (let i = 1; i < n; i++) {
//             dp[i] += dp[i - 1]
//         }
//     }

//     return dp[n - 1]
// }



// 数论方法
// 时间复杂度：O(m)
// 空间复杂度：O(1)
// 可以转化为，给你m + n - 2个不同的数，随便取m - 1个数，有⼏种取法。
const solution = (m, n) => {
    let numerator = 1; // 分⼦
    let denominator = m - 1; // 分⺟
    let count = m - 1;
    let t = m + n - 2;

    while (count--) {
        numerator *= (t--);
        // console.log('end----')
        // while (denominator != 0 && numerator % denominator == 0) {
        //     console.log('end11----')
        //     numerator /= denominator;
        //     denominator--;
        // }

        if (denominator != 0) {
            numerator /= denominator;
            denominator--;
        }
    }
        
    return numerator;
}


// 测试
const m = 3, n = 7
const m1 = 2, n1 = 3
const m2 = 7, n2 = 3
const m3 = 3, n3 = 3
// console.log(solution(1, 1, m, n))
// console.log(solution(1, 1, m1, n1))
// console.log(solution(1, 1, m2, n2))
// console.log(solution(1, 1, m3, n3))

console.log(solution(m, n))
console.log(solution(m1, n1))
console.log(solution(m2, n2))
console.log(solution(m3, n3))