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
 * 解释: 能够达到的最大利润: 在此处买入 prices[0] = 1 在此处卖出 prices[3] = 8 在此处买入 prices[4] = 4 在此处卖出 prices[5] = 9 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
 * 
 * 注意:
 *  0 < prices.length <= 50000
 *  0 < prices[i] < 50000
 *  0 <= fee < 50000
 * 
 * 做收获利润操作的时候其实有三种情况：
 *  情况一：收获利润的这一天并不是收获利润区间里的最后一天（不是真正的卖出，相当于持有股票），所以后面要继续收获利润。
 *  情况二：前一天是收获利润区间里的最后一天（相当于真正的卖出了），今天要重新记录最小价格了。
 *  情况三：不作操作，保持原有状态（买入，卖出，不买不卖）
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
const maxProfit = function(prices, fee) {
    let result = 0
    // 记录最低价格
    let minPrice = prices[0]

    for (let i = 1; i < prices.length; i++) {
        // 情况二：相当于买入
        if (prices[i] < minPrice) {
            minPrice = prices[i]
        }

        // 可以删除
        // 情况三：保持原有状态（因为此时买则不便宜，卖则亏本）
        if (prices[i] >= minPrice && prices[i] <= minPrice + fee) {
            continue
        }

        // 计算利润，可能有多次计算利润，最后一次计算利润才是真正意义的卖出
        if (prices[i] > minPrice + fee) {
            result += prices[i] - minPrice - fee

            // 情况一，这一步很关键
            // 买入和卖出只需要支付一次手续费
            minPrice = prices[i] -fee
        }
    }

    return result
};


// 测试
const prices = [1, 3, 2, 8, 4, 9]
const fee = 2
console.log(maxProfit(prices, fee))