/**
 * 长度最小的子数组
 * https://leetcode.cn/problems/minimum-size-subarray-sum/
 * 
 * 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
 * 
 * 示例：
 *  输入：s = 7, nums = [2,3,1,2,4,3] 输出：2 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 * 
 * 时间复杂度：$O(n)$ 空间复杂度：$O(1)$
 */
var minSubArrayLen = function(target, nums) {
    // 长度计算一次
    const len = nums.length;
    let l = 0
    let r = 0
    let sum = 0 
    // 子数组最大不会超过自身
    let res = len + 1;

    while(r < len) {
        sum += nums[r++];

        // 窗口滑动
        while(sum >= target) {
            // r始终为开区间 [l, r)
            res = res < r - l ? res : r - l;
            sum -= nums[l++];
        }
    }

    return res > len ? 0 : res;
};

// 测试
const s = 7
const nums = [2,3,1,2,4,3]
console.log(minSubArrayLen(s, nums))
console.log(minSubArrayLen(20, nums))

