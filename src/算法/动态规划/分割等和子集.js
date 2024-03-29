/**
 * 分割等和子集
 * https://leetcode.cn/problems/partition-equal-subset-sum/
 * 
 * 题目难易：中等
 * 
 * 题意：
 *  给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 *  注意: 每个数组中的元素不会超过 100 数组的大小不会超过 200
 * 
 * 示例 1: 
 *  输入: [1, 5, 11, 5] 输出: true 解释: 数组可以分割成 [1, 5, 5] 和 [11].
 * 示例 2: 
 *  输入: [1, 2, 3, 5] 输出: false 解释: 数组不能分割成两个元素和相等的子集.
 * 
 * 提示：
 *  1 <= nums.length <= 200
 *  1 <= nums[i] <= 100
 * 
 * 
 * 思路：
 *  这道题目初步看，是如下两题几乎是一样的，大家可以用回溯法，解决如下两题
 *      698.划分为k个相等的子集
 *      473.火柴拼正方形
 *  这道题目是要找是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 *  那么只要找到集合里能够出现 sum / 2 的子集总和，就算是可以分割成两个相同元素和子集了。
 *  本题是可以用回溯暴力搜索出所有答案的，但最后超时了，也不想再优化了，放弃回溯，直接上01背包吧。
 *  如果对01背包不够了解，建议仔细看完如下两篇：
 *      动态规划：关于01背包问题，你该了解这些！
 *      动态规划：关于01背包问题，你该了解这些！（滚动数组）
 * 
 *  01背包问题：
 *      首先，本题要求集合里能否出现总和为 sum / 2 的子集。
 *      那么来一一对应一下本题，看看背包问题如果来解决。
 *      只有确定了如下四点，才能把01背包问题套到本题上来。
 *          背包的体积为sum / 2
 *          背包要放入的商品（集合里的元素）重量为 元素的数值，价值也为元素的数值
 *          背包如果正好装满，说明找到了总和为 sum / 2 的子集。
 *          背包中每一个元素是不可重复放入。
 * 
 *  动规五部曲分析如下：
 *      1.确定dp数组以及下标的含义
 *          01背包中，dp[j] 表示： 容量为j的背包，所背的物品价值可以最大为dp[j]。
 *          套到本题，dp[j]表示 背包总容量是j，最大可以凑成j的子集总和为dp[j]。
 * 
 *      2.确定递推公式
 *          01背包的递推公式为：dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
 *          本题，相当于背包里放入数值，那么物品i的重量是nums[i]，其价值也是nums[i]。
 *          所以递推公式：dp[j] = max(dp[j], dp[j - nums[i]] + nums[i]);
 * 
 *      3.dp数组如何初始化
 *          在01背包，一维dp如何初始化，已经讲过，
 *          从dp[j]的定义来看，首先dp[0]一定是0。
 *          如果题目给的价值都是正整数那么非0下标都初始化为0就可以了，如果题目给的价值有负数，那么非0下标就要初始化为负无穷。
 *          这样才能让dp数组在递归公式的过程中取的最大的价值，而不是被初始值覆盖了。
 *          本题题目中 只包含正整数的非空数组，所以非0下标的元素初始化为0就可以了。
 * 
 *      4.确定遍历顺序
 *          在动态规划：关于01背包问题，你该了解这些！（滚动数组）中就已经说明：如果使用一维dp数组，物品遍历的for循环放在外层，遍历背包的for循环放在内层，且内层for循环倒序遍历！
 * 
 *      5.举例推导dp数组
 *          dp[j]的数值一定是小于等于j的。
 *          如果dp[j] == j 说明，集合中的子集总和正好可以凑成总和j，理解这一点很重要。
 * 
 * 
 * 复杂度：
 *  时间复杂度：O(n^2)
 *  空间复杂度：O(n)，虽然dp数组大小为一个常数，但是大常数
 * 
 * 
 * 总结：
 *  这道题目就是一道01背包应用类的题目，需要我们拆解题目，然后套入01背包的场景。
 *  01背包相对于本题，主要要理解，题目中物品是nums[i]，重量是nums[i]，价值也是nums[i]，背包体积是sum/2。
 */

/**
 * *相关题目：
 * 698.划分为k个相等的子集
 * 473.火柴拼正方形
 */
const canPartition = function(nums) {
    // * 01背包中，dp[j] 表示： 容量为j的背包，所背的物品价值最大可以为dp[j]。
    
    // 计算总和
    const sum = (nums.reduce((p, v) => p + v));

    // 22 -> 10110, 21 -> 10101
    // 奇数的肯定是不能等和拆分
    // if (sum & 1) return false;
    if (sum % 2 === 1) {
        return false;
    }

    const target = sum / 2;
    const dp = new Array(target + 1).fill(0);

    // 开始 01背包，物品数量
    for (let i = 0; i < nums.length; i++) {
        // 每一个元素一定是不可重复放入，所以从大到小遍历
        // 背包容量
        for (let j = target; j >= nums[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
        }
    }

    // 集合中的元素正好可以凑成总和target
    if (dp[target] === target) {
        return true;
    }

    return false
};


// 测试
const arr1 = [1, 5, 11, 5]
const arr2 = [1, 2, 3, 5]
console.log(canPartition(arr1))
console.log(canPartition(arr2))