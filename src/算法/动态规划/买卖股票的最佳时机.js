/**
 * 121.买卖股票的最佳时机
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/
 * 
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 * 
 * 示例 1：
 *  输入：[7,1,5,3,6,4]
 *  输出：5
 *  解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
 * 
 * 示例 2：
 *  输入：prices = [7,6,4,3,1]
 *  输出：0
 *  解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
 * 
 * 使用滚动数组复杂度
 *  时间复杂度：$O(n)$
 *  空间复杂度：$O(1)$
 */
const maxProfit = prices => {
    // * dp[i][0] 表示第i天持有股票所得最多现金 
    // * dp[i][1] 表示第i天不持有股票所得最多现金
    const len = prices.length;

    // 创建dp数组
    // 记录一次交易，一次交易有买入卖出两种状态
    // [0, 0] --> 0代表持有，1代表卖出
    const dp = new Array(len).fill([0, 0]);

    // dp数组初始化
    // 第0天持有股票，此时的持有股票就一定是买入股票了
    // 第0天不持有股票，不持有股票那么现金就是0
    dp[0] = [-prices[0], 0];

    for (let i = 1; i < len; i++) {
        // 更新dp[i]
        dp[i] = [
            // 前一天持有；或当天买入
            Math.max(dp[i - 1][0], -prices[i]),

            // 前一天就不持有股票，或者当天卖出股票
            Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0]),
        ];
    }

    return dp[len - 1][1];
}

// 使用滚动数组复杂度
const maxProfit1 = prices => {
    // * dp[i][0] 表示第i天持有股票所得最多现金 
    // * dp[i][1] 表示第i天不持有股票所得最多现金
    const len = prices.length;

    // * 注意这里只开辟了一个2 * 2大小的二维数组
    // 创建dp数组
    // 记录一次交易，一次交易有买入卖出两种状态
    // [0, 0] --> 0代表持有，1代表卖出
    const dp = new Array(2).fill([0, 0]);

    // dp数组初始化
    // 第0天持有股票，此时的持有股票就一定是买入股票了
    // 第0天不持有股票，不持有股票那么现金就是0
    dp[0] = [-prices[0], 0];

    for (let i = 1; i < len; i++) {
        // 更新dp[i]
        dp[i % 2] = [
            // 前一天持有；或当天买入
            Math.max(dp[(i - 1) % 2][0], -prices[i]),

            // 前一天就不持有股票，或者当天卖出股票
            Math.max(dp[(i - 1) % 2][1], prices[i] + dp[(i - 1) % 2][0]),
        ];
    }

    return dp[(len - 1) % 2][1];
}



// 测试
const prices1 = [7,1,5,3,6,4]
const prices2 = [7,6,4,3,1]
// console.log(maxProfit(prices1))
// console.log(maxProfit(prices2))

console.log(maxProfit1(prices1))
console.log(maxProfit1(prices2))