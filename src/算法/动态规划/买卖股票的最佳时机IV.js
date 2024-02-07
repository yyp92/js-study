/**
 * 188.买卖股票的最佳时机IV
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/
 * 
 * 给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 示例 1： 
 *  输入：k = 2, prices = [2,4,1] 
 *  输出：2 
 *  解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2。
 * 
 * 示例 2： 
 *  输入：k = 2, prices = [3,2,6,5,0,3] 
 *  输出：7 
 *  解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4。随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
 * 
 * 提示：
 *  0 <= k <= 100
 *  0 <= prices.length <= 1000
 *  0 <= prices[i] <= 1000
 */

/**
 * * j的状态表示为：
 *  * 0 表示不操作
 *  * 1 第一次买入
 *  * 2 第一次卖出
 *  * 3 第二次买入
 *  * 4 第二次卖出
 *  * .....
 */
// 方法一：动态规划
const maxProfit = (k, prices) => {
    // * dp[i][j] ：第i天的状态为j，所剩下的最大现金是dp[i][j]
    if (prices == null || prices.length < 2 || k == 0) {
        return 0;
    }
    
    // 初始化
    let dp = Array.from(new Array(prices.length), () => new Array(2 * k + 1).fill(0));

    // k为偶数是卖出
    for (let j = 1; j < 2 * k; j += 2) {
        dp[0][j] = 0 - prices[0];
    }
    
    for (let i = 1; i < prices.length; i++) {
        for (let j = 0; j < 2 * k - 1; j += 2) {
            // 第i天买入
            dp[i][j + 1] = Math.max(dp[i - 1][j + 1], dp[i - 1][j] - prices[i]);

            // 第i天卖出
            dp[i][j + 2] = Math.max(dp[i - 1][j + 2], dp[i - 1][j + 1] + prices[i]);
        }
    }

    return dp[prices.length - 1][2 * k];
};

// 方法二：动态规划+空间优化
const maxProfit1 = function(k, prices) {
    // * dp[j]: 每天的状态为j，所剩下的最大现金是dp[j]
    let n = prices.length;
    let dp = new Array(2 * k + 1).fill(0);

    // dp 持有状态初始化
    for (let i = 1; i <= 2 * k; i += 2) {
        dp[i] = - prices[0];
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j < 2 * k + 1; j++) {
            // j 为奇数：持有状态
            if (j % 2) {
                dp[j] = Math.max(dp[j], dp[j - 1] - prices[i]);
            }
            else {
                // j为偶数：不持有状态
                dp[j] = Math.max(dp[j], dp[j - 1] + prices[i]);
            }
        }
    }

    return dp[2 * k];
};



// 测试
const k1 = 2
const prices1 = [2,4,1] 
const k2 = 2
const prices2 = [3,2,6,5,0,3]
console.log(maxProfit(k1, prices1))
console.log(maxProfit(k2, prices2))
console.log(maxProfit1(k1, prices1))
console.log(maxProfit1(k2, prices2))