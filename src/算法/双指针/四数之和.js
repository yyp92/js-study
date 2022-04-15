/**
 * 四数之和
 * 
 * 题意：
 * 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
 * 
 * 示例：
 * 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。 满足要求的四元组集合为： [ [-1, 0, 0, 1], [-2, -1, 1, 2], [-2, 0, 0, 2] ]
 * 
 * 思路：
 *  1. 但是有一些细节需要注意，例如： 不要判断nums[k] > target 就返回了，三数之和 可以通过 nums[i] > 0 就返回了，因为 0 已经是确定的数了，四数之和这道题目 target是任意值。（大家亲自写代码就能感受出来）。
 *  2. 四数之和的双指针解法是两层for循环nums[k] + nums[i]为确定值，依然是循环内有left和right下标作为双指针，找出nums[k] + nums[i] + nums[left] + nums[right] == target的情况，三数之和的时间复杂度是$O(n^2)$，四数之和的时间复杂度是$O(n^3)$ 。
 */

var fourSum = function(nums, target) {
    const len = nums.length;
    if (len < 4) return [];

    nums.sort((a, b) => a - b);
    const res = [];

    for (let i = 0; i < len - 3; i++) {
        // 去重i
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        for (let j = i + 1; j < len - 2; j++) {
            // 去重j
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            let l = j + 1, r = len - 1;

            while (l < r) {
                const sum = nums[i] + nums[j] + nums[l] + nums[r];
                if (sum < target) { l++; continue}
                if (sum > target) { r--; continue}
                res.push([nums[i], nums[j], nums[l], nums[r]]);

                // 去重
                while (l < r && nums[l] === nums[++l]);
                while (l < r && nums[r] === nums[--r]);
            }
        } 
    }
    return res;
};


// 测试
const nums = [1, 0, -1, 0, -2, 2]
const target = 0
console.log(fourSum(nums, target))
