/**
 * 最后一块石头的重量 II
 * https://leetcode.cn/problems/last-stone-weight-ii/
 * 
 * 题目难度：中等
 * 
 * 题意：
 *  有一堆石头，每块石头的重量都是正整数。
 *  每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：
 *      如果 x == y，那么两块石头都会被完全粉碎； 
 *      如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。 最后，最多只会剩下一块石头。返回此石头最小的可能重量。
 *      如果没有石头剩下，就返回 0。
 *  
 * 示例： 
 *  输入：[2,7,4,1,8,1] 
 *  输出：1 
 *  解释： 组合 2 和 4，得到 2，所以数组转化为 [2,7,1,8,1]， 组合 7 和 8，得到 1，所以数组转化为 [2,1,1,1]， 组合 2 和 1，得到 1，所以数组转化为 [1,1,1]， 组合 1 和 1，得到 0，所以数组转化为 [1]，这就是最优值。
 * 
 * 提示：
 *  1 <= stones.length <= 30
 *  1 <= stones[i] <= 1000
 * 
 * 
 * 思路：
 *  本题其实就是尽量让石头分成重量相同的两堆，相撞之后剩下的石头最小，这样就化解成01背包问题了。
 *  是不是感觉和昨天讲解的416. 分割等和子集 非常像了。
 *  本题物品的重量为store[i]，物品的价值也为store[i]。
 *  对应着01背包里的物品重量weight[i]和 物品价值value[i]。
 * 
 *  动规五步曲：
 *      1.确定dp数组以及下标的含义
 *          dp[j]表示容量（这里说容量更形象，其实就是重量）为j的背包，最多可以背dp[j]这么重的石头。
 *      2.确定递推公式
 *          01背包的递推公式为：dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
 *          本题则是：dp[j] = max(dp[j], dp[j - stones[i]] + stones[i]);
 *          一些同学可能看到这dp[j - stones[i]] + stones[i]中 又有- stones[i] 又有+stones[i]，看着有点晕乎。
 *          还是要牢记dp[j]的含义，要知道dp[j - stones[i]]为 容量为j - stones[i]的背包最大所背重量。
 *      3.dp数组如何初始化
 *          既然 dp[j]中的j表示容量，那么最大容量（重量）是多少呢，就是所有石头的重量和。
 *          因为提示中给出1 <= stones.length <= 30，1 <= stones[i] <= 1000，所以最大重量就是30 * 1000 。
 *          而我们要求的target其实只是最大重量的一半，所以dp数组开到15000大小就可以了。
 *          当然也可以把石头遍历一遍，计算出石头总重量 然后除2，得到dp数组的大小。
 *          我这里就直接用15000了。
 *          接下来就是如何初始化dp[j]呢，因为重量都不会是负数，所以dp[j]都初始化为0就可以了，这样在递归公式dp[j] = max(dp[j], dp[j - stones[i]] + stones[i]);中dp[j]才不会初始值所覆盖。
 *      4.确定遍历顺序
 *          在动态规划：关于01背包问题，你该了解这些！（滚动数组） 中就已经说明：如果使用一维dp数组，物品遍历的for循环放在外层，遍历背包的for循环放在内层，且内层for循环倒序遍历！
 *      5.举例推导dp数组
 *          举例，输入：[2,4,1,1]，此时target = (2 + 4 + 1 + 1)/2 = 4。
 *          最后dp[target]里是容量为target的背包所能背的最大重量。
 *          那么分成两堆石头，一堆石头的总重量是dp[target]，另一堆就是sum - dp[target]。
 *          在计算target的时候，target = sum / 2 因为是向下取整，所以sum - dp[target] 一定是大于等于dp[target]的。
 *          那么相撞之后剩下的最小石头重量就是 (sum - dp[target]) - dp[target]。
 * 
 * 
 * 总结：
 *  本题其实和416. 分割等和子集 几乎是一样的，只是最后对dp[target]的处理方式不同。
 *  416. 分割等和子集 相当于是求背包是否正好装满，而本题是求背包最多能装多少。
 * 
 * 
 * 复杂度：
 *  时间复杂度：O(m × n) , m是石头总重量（准确的说是总重量的一半），n为石头块数
 *  空间复杂度：O(m)
 */

const lastStoneWeightII = function (stones) {
    // 计算总质量
    let sum = stones.reduce((s, n) => s + n);

    let dpLen = Math.floor(sum / 2);
    let dp = new Array(dpLen + 1).fill(0);

    // 遍历物品
    for (let i = 0; i < stones.length; ++i) {
        // 遍历背包
        for (let j = dpLen; j >= stones[i]; --j) {
            dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i]);
        }
    }

    return sum - dp[dpLen] - dp[dpLen];
};


// 测试
const arr  = [2,7,4,1,8,1] // 1
console.log(lastStoneWeightII(arr))