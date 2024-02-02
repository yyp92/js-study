/**
 * 377. 组合总和 Ⅳ
 * https://leetcode.cn/problems/combination-sum-iv/
 * 
 * 难度：中等
 * 给定一个由正整数组成且不存在重复数字的数组，找出和为给定目标正整数的组合的个数。
 * 示例:
 *  nums = [1, 2, 3] target = 4
 *  所有可能的组合为： (1, 1, 1, 1) (1, 1, 2) (1, 2, 1) (1, 3) (2, 1, 1) (2, 2) (3, 1)
 *  请注意，顺序不同的序列被视作不同的组合。
 *  因此输出为 7。
 */
 const combinationSum4 = (nums, target) => {
    /**
     * * dp[i]: 凑成目标正整数为i的排列个数为dp[i]
     */
    
    let dp = Array(target + 1).fill(0);
    dp[0] = 1;

    // 遍历背包
    for (let i = 0; i <= target; i++) {
        // 遍历物品
        for (let j = 0; j < nums.length; j++) {
            if (i >= nums[j]) {
                dp[i] += dp[i - nums[j]];
            }
        }
    }

    return dp[target];
};


// 测试
const nums = [1, 2, 3]
const target = 4
console.log(combinationSum4(nums, target))