/**
 * 300.最长递增子序列
 * https://leetcode.cn/problems/longest-increasing-subsequence/
 * 
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 * 子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 * 
 * 示例 1： 
 *  输入：nums = [10,9,2,5,3,7,101,18] 
 *  输出：4 
 *  解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 * 
 * 示例 2： 输入：nums = [0,1,0,3,2,3] 输出：4
 * 
 * 示例 3： 输入：nums = [7,7,7,7,7,7,7] 输出：1
 * 
 * 提示：
 *  1 <= nums.length <= 2500
 *  -10^4 <= nums[i] <= 104
 */
const lengthOfLIS = (nums) => {
    // * dp[i]表示i之前包括i的以nums[i]结尾的最长递增子序列的长度
    
    // dp[i]: 前i个元素中，以nums[i]结尾，最长子序列的长度
    // 初始化，所有的元素都应该初始化为1
    let dp = Array(nums.length).fill(1);
    let result = 1;

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }

        // 取长的子序列
        result = Math.max(result, dp[i]);
    }

    return result;
}


// 测试
const nums1 = [10,9,2,5,3,7,101,18] 
const nums2 = [0,1,0,3,2,3] 
const nums3 = [7,7,7,7,7,7,7]
console.log(lengthOfLIS(nums1))
console.log(lengthOfLIS(nums2))
console.log(lengthOfLIS(nums3))