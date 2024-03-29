/**
 * 打家劫舍
 * https://leetcode.cn/problems/house-robber/
 * 
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 * 
 * 示例 1： 
 *  输入：[1,2,3,1]
 *  输出：4 
 *  解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。   偷窃到的最高金额 = 1 + 3 = 4 。
 * 
 * 示例 2： 
 *  输入：[2,7,9,3,1] 
 *  输出：12 
 *  解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。   偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 * 
 * 提示：
 *  0 <= nums.length <= 100
 *  0 <= nums[i] <= 400
 */
const rob = nums => {
    // * dp[i]：考虑下标i（包括i）以内的房屋，最多可以偷窃的金额为dp[i]。
    
    // 数组长度
    const len = nums.length;
    // dp数组初始化
    // const dp = new Array(nums.length).fill(0)
    const dp = [nums[0], Math.max(nums[0], nums[1])];

    // 从下标2开始遍历
    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }

    return dp[len - 1];
};



// 测试
const arr1 = [1,2,3,1] // 4
const arr2 = [2,7,9,3,1] // 12
console.log(rob(arr1))
console.log(rob(arr2))