/**
 * 714.买卖股票的最佳时机含手续费
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
 * 
 * 给定一个整数数组 prices，其中第 i 个元素代表了第 i 天的股票价格 ；非负整数 fee 代表了交易股票的手续费用。
 * 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
 * 返回获得利润的最大值。
 * 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
 * 
 * 示例 1: 输入: prices = [1, 3, 2, 8, 4, 9], fee = 2 输出: 8
 * 解释: 能够达到的最大利润: 在此处买入 prices[0] = 1 在此处卖出 prices[3] = 8 在此处买入 prices[4] = 4 在此处卖出 prices[5] = 9 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8
 * 
 * 注意:
 *  0 < prices.length <= 50000
 *  0 < prices[i] < 50000
 *  0 <= fee < 50000
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */

const maxProfit = function(prices, fee) {
    // 滚动数组
    // have表示当天持有股票的最大收益
    // notHave表示当天不持有股票的最大收益
    // 把手续费算在买入价格中
    let n = prices.length

    // 第0天持有股票的最大收益
    let have = -prices[0]-fee
    // 第0天不持有股票的最大收益 
    let notHave = 0            

    for (let i = 1; i < n; i++) {
        // 第i天持有股票的最大收益由两种情况组成
        // 1、第i-1天就已经持有股票，第i天什么也没做
        // 2、第i-1天不持有股票，第i天刚买入
        have = Math.max(have, notHave - prices[i] - fee);

        // 第i天不持有股票的最大收益由两种情况组成
        // 1、第i-1天就已经不持有股票，第i天什么也没做
        // 2、第i-1天持有股票，第i天刚卖出
        notHave = Math.max(notHave, have + prices[i]);
    }

    // 最后手中不持有股票，收益才能最大化
    return notHave;
}

const maxProfit1 = (prices, fee) => {
    // * dp[i][0] 表示第i天持有股票所省最多现金。 dp[i][1] 表示第i天不持有股票所得最多现金
    let dp = Array.from(new Array(prices.length), () => new Array(2).fill(0));
    // 持股票
    dp[0][0] = 0 - prices[0];

    for (let i = 1; i < prices.length; i++) {
        // 不持有
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);

        // 持有
        dp[i][1] = Math.max(dp[i - 1][0] + prices[i] - fee, dp[i - 1][1]);
    }

    return Math.max(dp[prices.length - 1][0], dp[prices.length - 1][1]);
}

console.log(maxProfit([1, 3, 2, 8, 4, 9], 2))
console.log(maxProfit1([1, 3, 2, 8, 4, 9], 2))