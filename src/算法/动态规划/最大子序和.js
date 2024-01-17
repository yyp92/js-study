/**
 * 53.最大子序和
 * https://leetcode.cn/problems/maximum-subarray/
 * 
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 示例: 输入: [-2,1,-3,4,-1,2,1,-5,4] 输出: 6 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 * 
 * 
 * 思路：
 *  动规五部曲如下：
 *      1. 确定dp数组（dp table）以及下标的含义
 *          dp[i]：包括下标i之前的最大连续子序列和为dp[i]。
 * 
 *      2. 确定递推公式
 *          dp[i]只有两个方向可以推出来：
 *              dp[i - 1] + nums[i]，即：nums[i]加入当前连续子序列和
 *              nums[i]，即：从头开始计算当前连续子序列和
 *          一定是取最大的，所以dp[i] = max(dp[i - 1] + nums[i], nums[i]);
 * 
 *      3. dp数组如何初始化
 *          从递推公式可以看出来dp[i]是依赖于dp[i - 1]的状态，dp[0]就是递推公式的基础。
 *          dp[0]应该是多少呢?
 *          根据dp[i]的定义，很明显dp[0]应为nums[0]即dp[0] = nums[0]。
 * 
 *      4. 确定遍历顺序
 *          递推公式中dp[i]依赖于dp[i - 1]的状态，需要从前向后遍历。
 * 
 *      5. 举例推导dp数组
 *          注意最后的结果可不是dp[nums.size() - 1]！ ，而是dp[6]。
 *          在回顾一下dp[i]的定义：包括下标i之前的最大连续子序列和为dp[i]。
 *          那么我们要找最大的连续子序列，就应该找每一个i为终点的连续最大子序列。
 *          所以在递推公式的时候，可以直接选出最大的dp[i]。
 * 
 * 复杂度：
 *  时间复杂度：O(n)
 *  空间复杂度：O(n)
 */
const maxSubArray = nums => {
    // * dp[i]：包括下标i（以nums[i]为结尾）的最大连续子序列和为dp[i]

    // 数组长度，dp初始化
    const len = nums.length;
    let dp = new Array(len).fill(0);
    dp[0] = nums[0];

    // 最大值初始化为dp[0]
    let max = 0;

    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);

        // 更新最大值
        max = Math.max(max, dp[i]);
    }

    return max;
};



// 测试
const nums = [-2,1,-3,4,-1,2,1,-5,4]
console.log(maxSubArray(nums))