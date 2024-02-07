/**
 * 309.最佳买卖股票时机含冷冻期
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/
 * 
 * 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。
 * 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
 *  你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 *  卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
 * 
 * 示例: 输入: [1,2,3,0,2] 输出: 3 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
 * 
 * 时间复杂度：$O(n)$
 * 空间复杂度：$O(n)$
 * 
 * j的状态为：
 *  0：状态一: 前一天就是持有股票状态
 *  1：状态二: 前一天是保持卖出股票状态
 *  2：状态三: 达到今天就卖出股票状态
 *  3：状态四: 达到冷冻期状态
 */
const maxProfit = (prices) => {
    // * dp[i][j]: 第i天状态为j，所剩的最多现金为dp[i][j]。
    if (prices.length < 2) {
        return 0
    }
    else if (prices.length < 3) {
        return Math.max(0, prices[1] - prices[0]);
    }

    let dp = Array.from(new Array(prices.length), () => new Array(4).fill(0));
    dp[0][0] = 0 - prices[0];

    for (i = 1; i < prices.length; i++) {
        // * 达到买入股票状态（状态一）即：dp[i][0]，有两个具体操作：
        // 操作一：前一天就是持有股票状态（状态一），dp[i][0] = dp[i - 1][0]
        // 操作二：今天买入了，有两种情况
        // 前一天是冷冻期（状态四），dp[i - 1][3] - prices[i]
        // 前一天是保持卖出股票状态（状态二），dp[i - 1][1] - prices[i]
        // 所以操作二取最大值，即：max(dp[i - 1][3], dp[i - 1][1]) - prices[i]
        dp[i][0] = Math.max(dp[i - 1][0], Math.max(dp[i - 1][1], dp[i - 1][3]) - prices[i]);

        // * 达到保持卖出股票状态（状态二）即：dp[i][1]，有两个具体操作：
        // 操作一：前一天就是状态二
        // 操作二：前一天是冷冻期（状态四）
        // dp[i][1] = max(dp[i - 1][1], dp[i - 1][3]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3]);

        // * 达到今天就卖出股票状态（状态三），即：dp[i][2] ，只有一个操作：
        // 操作一：昨天一定是买入股票状态（状态一），今天卖出
        // 即：dp[i][2] = dp[i - 1][0] + prices[i];
        dp[i][2] = dp[i - 1][0] + prices[i];

        // * 达到冷冻期状态（状态四），即：dp[i][3]，只有一个操作：
        // 操作一：昨天卖出了股票（状态三）
        // dp[i][3] = dp[i - 1][2];
        dp[i][3] = dp[i - 1][2];
    }

    return Math.max(dp[prices.length - 1][1], dp[prices.length - 1][2], dp[prices.length - 1][3]);
};

// 一维数组空间优化
const maxProfit1 = (prices) => {
    const n = prices.length
    const dp = new Array(4).fill(0)
    dp[0] = -prices[0]

    for (let i = 1; i < n; i ++) {
        // 缓存上一次的状态
        const temp = dp[0] 
        const temp1 = dp[2]

        // 持有状态
        dp[0] = Math.max(dp[0], Math.max(dp[3] - prices[i], dp[1] - prices[i])) 

        // 今天不操作且不持有股票
        dp[1] = Math.max(dp[1], dp[3]) 

        // 今天卖出股票
        dp[2] = temp + prices[i] 

        // 冷冻期
        dp[3] = temp1 
    }

    return Math.max(...dp)
}


// 测试
const prices = [1,2,3,0,2]
console.log(maxProfit(prices))
console.log(maxProfit1(prices))