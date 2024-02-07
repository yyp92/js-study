/**
 * 123.买卖股票的最佳时机III
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/
 * 
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 示例 1: 
 *  输入：prices = [3,3,5,0,0,3,1,4] 
 *  输出：6 
 *  解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3。
 * 
 * 示例 2： 
 *  输入：prices = [1,2,3,4,5] 
 *  输出：4 
 *  解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4。注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
 * 
 * 示例 3： 输入：prices = [7,6,4,3,1] 输出：0 解释：在这个情况下, 没有交易完成, 所以最大利润为0。
 * 
 * 示例 4： 输入：prices = [1] 输出：0
 * 
 * 提示：
 *  1 <= prices.length <= 10^5
 *  0 <= prices[i] <= 10^5
 * 
 * 一天一共就有五个状态：
 *  0 没有操作 （其实我们也可以不设置这个状态）
 *  1 第一次持有股票
 *  2 第一次不持有股票
 *  3 第二次持有股票
 *  4 第二次不持有股票
 */

// 版本一
// 时间复杂度：O(n)
// 空间复杂度：O(n × 5)
const maxProfit = prices => {
    // * dp[i][j] 表示第i天状态j所剩最大现金
    // * i表示第i天，j为 [0 - 4] 五个状态
    const len = prices.length;
    const dp = new Array(len).fill(0).map(x => new Array(5).fill(0));

    dp[0][1] = -prices[0];
    dp[0][3] = -prices[0];

    for (let i = 1; i < len; i++) {
        // 没有操作 （其实我们也可以不设置这个状态）
        dp[i][0] = dp[i - 1][0];
        // 第一次持有股票
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
        // 第一次不持有股票
        dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i]);
        // 第二次持有股票
        dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i]);
        // 第二次不持有股票
        dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i]);
    }

    return dp[len - 1][4];
}

// 版本二
// 时间复杂度：O(n)
// 空间复杂度：O(1)
const maxProfit1 = prices => {
    const len = prices.length;
    // dp代表股票的状态
    const dp = new Array(5).fill(0);

    // 初始化
    dp[1] = -prices[0];
    dp[3] = -prices[0];

    for (let i = 1; i < len; i++) {
        // dp[1] = max(dp[1], dp[0] - prices[i]); 如果dp[1]取dp[1]，即保持买入股票的状态，那么 dp[2] = max(dp[2], dp[1] + prices[i]);中dp[1] + prices[i] 就是今天卖出。
        // 如果dp[1]取dp[0] - prices[i]，今天买入股票，那么dp[2] = max(dp[2], dp[1] + prices[i]);中的dp[1] + prices[i]相当于是尽在再卖出股票，一买一卖收益为0，对所得现金没有影响。相当于今天买入股票又卖出股票，等于没有操作，保持昨天卖出股票的状态了。
        dp[1] = Math.max(dp[1], dp[0] - prices[i]);
        dp[2] = Math.max(dp[2], dp[1] + prices[i]);
        dp[3] = Math.max(dp[3], dp[2] - prices[i]);
        dp[4] = Math.max(dp[4], dp[3] + prices[i]);
    }

    return dp[4];
};


// 测试
const prices1 = [3,3,5,0,0,3,1,4] 
const prices2 = [1,2,3,4,5] 
const prices3 = [7,6,4,3,1]
const prices4 = [1] 
console.log(maxProfit(prices1))
console.log(maxProfit(prices2))
console.log(maxProfit(prices3))
console.log(maxProfit(prices4))
// console.log(maxProfit1(prices1))
// console.log(maxProfit1(prices2))
// console.log(maxProfit1(prices3))
// console.log(maxProfit1(prices4))