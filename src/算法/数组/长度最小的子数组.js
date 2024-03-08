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
const minSubArrayLen = function(target, nums) {
    // 长度计算一次
    const len = nums.length;
    // 滑动窗口起始位置
    let start = 0
    let end = 0
    // 滑动窗口数值之和
    let sum = 0 
    // 子数组最大不会超过自身
    let res = Infinity;
    // 滑动窗口的长度
    let subLength = 0; 

    while(end < len) {
        sum += nums[end++];

        // 窗口滑动
        // 注意这里使用while，每次更新 start（起始位置），并不断比较子序列是否符合条件
        while(sum >= target) {
            // end始终为开区间 [start, end)
            // 取子序列的长度
            // 因为 sum += nums[end++]; end已经加1了，所以下边不需要加1了
            subLength = end - start
            res = res < subLength ? res : subLength;

            // 这里体现出滑动窗口的精髓之处，不断变更start（子序列的起始位置）
            sum -= nums[start++];
        }
    }

    // 如果 res 没有被赋值的话，就返回0，说明没有符合条件的子序列
    return res === Infinity  ? 0 : res;
};

// 测试
const s = 7
const nums = [2,3,1,2,4,3]
console.log(minSubArrayLen(s, nums))
console.log(minSubArrayLen(20, nums))

