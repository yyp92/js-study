/**
 * 爬楼梯
 * https://leetcode.cn/problems/climbing-stairs/
 * 
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 注意：给定 n 是一个正整数。
 * 
 * 示例 1：
 *  输入： 2
 *  输出： 2
 *  解释： 有两种方法可以爬到楼顶。
 *  1 阶 + 1 阶
 *  2 阶
 * 
 * 示例 2：
 *  输入： 3
 *  输出： 3
 *  解释： 有三种方法可以爬到楼顶。
 *  1 阶 + 1 阶 + 1 阶
 *  1 阶 + 2 阶
 *  2 阶 + 1 阶
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */

const climbStairs = function(n) {
    // * dp[i] 为第 i 阶楼梯有多少种方法爬到楼顶
    // dp[i] = dp[i - 1] + dp[i - 2]

    /**
     * 我就认为跑到第0层，方法就是0啊，一步只能走一个台阶或者两个台阶，然而楼层是0，直接站楼顶上了，就是不用方法，dp[0]就应该是0.
     * 需要注意的是：题目中说了n是一个正整数，题目根本就没说n有为0的情况。
     * 所以本题其实就不应该讨论dp[0]的初始化！
     */
    let dp = [0, 1, 2]

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }

    return dp[n]
};


/**
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
// const climbStairs = function(n) {
//     // * dp[i]： 爬到第i层楼梯，有dp[i]种方法
//     const dp = [1, 2]

//     if (n === 1) {
//         return dp[0]
//     }

//     for (let i = 3; i <= n; i++) {
//         const sum = dp[0] + dp[1] 
//         dp[0] = dp[1]
//         dp[1] = sum
//     }

//     return dp[1]
// }


// 测试
console.log(climbStairs(1))
console.log(climbStairs(2))
console.log(climbStairs(3))
console.log(climbStairs(4))
console.log(climbStairs(5))




/**
 * @TODO:
 * 扩展
 * ⼀步⼀个台阶，两个台阶，三个台阶，直到 m个台阶，有多少种⽅法爬
到n阶楼顶。
 */

