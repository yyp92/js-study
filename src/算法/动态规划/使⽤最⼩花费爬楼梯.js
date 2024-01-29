/**
 * 使⽤最⼩花费爬楼梯
 * https://leetcode.cn/problems/min-cost-climbing-stairs/
 * 
 * 数组的每个下标作为一个阶梯，第 i 个阶梯对应着一个非负数的体力花费值 cost[i]（下标从 0 开始）。
 * 每当你爬上一个阶梯你都要花费对应的体力值，一旦支付了相应的体力值，你就可以选择向上爬一个阶梯或者爬两个阶梯。
 * 请你找出达到楼层顶部的最低花费。在开始时，你可以选择从下标为 0 或 1 的元素作为初始阶梯。
 * 
 * 示例 1：
 *  输入：cost = [10, 15, 20] 输出：15 解释：最低花费是从 cost[1] 开始，然后走两步即可到阶梯顶，一共花费 15 。
 * 示例 2：
 *  输入：cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1] 输出：6 解释：最低花费方式是从 cost[0] 开始，逐个经过那些 1 ，跳过 cost[3] ，一共花费 6 。
 * 
 * 提示：
 *  cost 的长度范围是 [2, 1000]。
 *  cost[i] 将会是一个整型数据，范围为 [0, 999] 。
 */

// 时间复杂度：O(n)
// 空间复杂度：O(n)
// const minCostClimbingStairs = (cost) => {
//     const dp = [cost[0], cost[1]]

//     for (let i = 2; i <= cost.length - 1; i++) {
//         dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i]
//     }

//     return Math.min(dp[cost.length - 1], dp[cost.length - 2])
// }


// 时间复杂度：O(n)
// 空间复杂度：O(1)
// const minCostClimbingStairs = (cost) => {
//     // dp数组数组的含义： 到达 i 位置的最小花费为 dp[i]
//     const dp = [cost[0], cost[1]]

//     for (let i = 2; i <= cost.length - 1; i++) {
//         dp[i] = Math.min(dp[0], dp[1]) + cost[i]
//         dp[0] = dp[1]
//         dp[1] = dp[i]
//     }

//     return Math.min(dp[0], dp[1])
// }


// 最新 leetcode 题意， 2021-01-15
const minCostClimbingStairs = function(cost) {
    /**
     * * dp[i]的定义：到达第i台阶所花费的最少体力为dp[i]。
     * 
     * 初始化
     * 你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
     * 因为只有跳了才会花费,所有初始化 dp[0] = 0, dp[1] = 0
     */
    const dp = [0, 0]

    for (let i = 2; i <= cost.length; i++) {
      dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
    }

    return dp[cost.length]
};



// 测试
const cost1 = [10, 15, 20]
const cost2 = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
console.log(minCostClimbingStairs(cost1))
console.log(minCostClimbingStairs(cost2))