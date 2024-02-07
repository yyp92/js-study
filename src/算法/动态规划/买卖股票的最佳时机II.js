/**
 * 122.买卖股票的最佳时机II
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/
 * 
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 示例 1:
 *  输入: [7,1,5,3,6,4]
 *  输出: 7
 *  解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4。随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
 * 
 * 示例 2:
 *  输入: [1,2,3,4,5]
 *  输出: 4
 *  解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
 * 
 * 示例 3:
 *  输入: [7,6,4,3,1]
 *  输出: 0
 *  解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 * 
 * 提示：
 *  1 <= prices.length <= 3 * 10 ^ 4
 *  0 <= prices[i] <= 10 ^ 4
 */
// 方法一：动态规划（dp 数组）
const maxProfit = (prices) => {
    let dp = Array.from(new Array(prices.length), () => new Array(2).fill(0));
    // * dp[i][0] 表示第i天持有股票所得现金。
    // * dp[i][1] 表示第i天不持有股票所得最多现金
    dp[0][0] = 0 - prices[0];
    dp[0][1] = 0;

    for (let i = 1; i < prices.length; i++) {
        // 如果第i天持有股票即dp[i][0]， 那么可以由两个状态推出来
        // 第i-1天就持有股票，那么就保持现状，所得现金就是昨天持有股票的所得现金 即：dp[i - 1][0]
        // 第i天买入股票，所得现金就是昨天不持有股票的所得现金减去 今天的股票价格 即：dp[i - 1][1] - prices[i]
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
        
        // 在来看看如果第i天不持有股票即dp[i][1]的情况， 依然可以由两个状态推出来
        // 第i-1天就不持有股票，那么就保持现状，所得现金就是昨天不持有股票的所得现金 即：dp[i - 1][1]
        // 第i天卖出股票，所得现金就是按照今天股票佳价格卖出后所得现金即：prices[i] + dp[i - 1][0]
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
    }

    return dp[prices.length - 1][1];
}

// 方法二：动态规划（滚动数组）
const maxProfit1 = (prices) => {
    // 滚动数组
    // have: 第i天持有股票最大收益; notHave: 第i天不持有股票最大收益
    let n = prices.length
    let have = -prices[0]
    let notHave = 0

    for (let i = 1; i < n; i++) {
        have = Math.max(have, notHave - prices[i]);
        notHave = Math.max(notHave, have + prices[i]);
    }

    // 最终手里不持有股票才能保证收益最大化
    return notHave;
}


// 测试
const arr1 = [7,1,5,3,6,4]
const arr2 = [1,2,3,4,5]
const arr3 = [7,6,4,3,1]
console.log(maxProfit(arr1))
console.log(maxProfit(arr2))
console.log(maxProfit(arr3))
console.log(maxProfit1(arr1))
console.log(maxProfit1(arr2))
console.log(maxProfit1(arr3))