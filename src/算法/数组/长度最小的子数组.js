/**
 * 长度最小的子数组
 * 
 * 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
 * 
 * 示例：
 *  输入：s = 7, nums = [2,3,1,2,4,3] 输出：2 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 * 
 * 思路：
 * 在本题中实现滑动窗口，主要确定如下三点：
 *  窗口内是什么？
 *  如何移动窗口的起始位置？
 *  如何移动窗口的结束位置？
 * 
 * 时间复杂度：$O(n)$ 空间复杂度：$O(1)$
 * 不要以为for里放一个while就以为是$O(n^2)$啊， 主要是看每一个元素被操作的次数，每个元素在滑动窗后进来操作一次，出去操作一次，每个元素都是被被操作两次，所以时间复杂度是 2 × n 也就是$O(n)$。
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

