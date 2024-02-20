/**
 * 673.最长递增子序列的个数
 * https://leetcode.cn/problems/number-of-longest-increasing-subsequence/
 * 
 * 给定一个未排序的整数数组，找到最长递增子序列的个数。
 * 
 * 示例 1:
 *  输入: [1,3,5,4,7]
 *  输出: 2
 *  解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。
 * 
 * 示例 2:
 *  输入: [2,2,2,2,2]
 *  输出: 5
 *  解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。
 * 
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n)
 */
const findNumberOfLIS = function(nums) {

    const len = nums.length;

    if (len <= 1) return len;

    // i之前（包括i）最长递增子序列的长度为dp[i]
    let dp = new Array(len).fill(1); 
    // 以nums[i]为结尾的字符串，最长递增子序列的个数为count[i]
    let count = new Array(len).fill(1); 
    let res = 0;

    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                // 第 j 个数字为前一个数字的子序列是否更更长
                if (dp[j] + 1 > dp[i]) { 
                    // 更新 dp[i] 
                    dp[i] = dp[j] + 1; 

                    // 重置count[i]
                    count[i] = count[j]; 
                }
                // 和原来一样长
                else if(dp[j] + 1 === dp[i]){ 
                    // 更新count[i]
                    count[i] += count[j]; 
                }
            }
        }
    }

    // 扩展运算符找到最大长度
    let max = Math.max(...dp); 
    for (let i = 0; i < len; i++) {
        if (dp[i] === max) {
            // 累加
            res += count[i]; 
        }
    }

    return res;
}


// 测试
const arr1 = [1,3,5,4,7]
const arr2 = [2,2,2,2,2]
console.log(findNumberOfLIS(arr1))
console.log(findNumberOfLIS(arr2))