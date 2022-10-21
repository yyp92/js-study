/**
 * 322.零钱兑换
 * 
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 * 你可以认为每种硬币的数量是无限的。
 * 
 * 示例 1： 
 *  输入：coins = [1, 2, 5], amount = 11 
 *  输出：3 
 *  解释：11 = 5 + 5 + 1
 * 
 * 示例 2： 输入：coins = [2], amount = 3 输出：-1
 * 
 * 示例 3： 输入：coins = [1], amount = 0 输出：0
 * 
 * 示例 4： 输入：coins = [1], amount = 1 输出：1
 * 
 * 示例 5： 输入：coins = [1], amount = 2 输出：2
 * 
 * 提示：
 *  1 <= coins.length <= 12
 *  1 <= coins[i] <= 2^31 - 1
 *  0 <= amount <= 10^4
 */
 const coinChange = (coins, amount) => {
    if (!amount) {
        return 0;
    }

    let dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    // 遍历物品
    for (let i = 0; i < coins.length; i++) {
        // 遍历背包
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j]);
        }
    }

    // 没找到能装满背包的, 就返回-1
    return dp[amount] === Infinity ? -1 : dp[amount];
}


// 测试
const coins1 = [1, 2, 5]
const amount1 = 11 
const coins2 = [2]
const amount2 = 3
const coins3 = [1]
const amount3 = 0
const coins4 = [1]
const amount4 = 1
const coins5 = [1]
const amount5 = 2
console.log(coinChange(coins1, amount1))
console.log(coinChange(coins2, amount2))
console.log(coinChange(coins3, amount3))
console.log(coinChange(coins4, amount4))
console.log(coinChange(coins5, amount5))
