/**
 * 摆动序列
 * 如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为摆动序列。第一个差（如果存在的话）可能是正数或负数。少于两个元素的序列也是摆动序列。
 * 
 * 动态规划：https://juejin.cn/post/7083876369238753317
 * 
 * 示例 1:
 *  输入: [1,7,4,9,2,5]
 *  输出: 6
 *  解释: 整个序列均为摆动序列。
 * 
 * 示例 2:
 *  输入: [1,17,5,10,13,15,10,5,16,8]
 *  输出: 7
 *  解释: 这个序列包含几个长度为 7 摆动序列，其中一个可为[1,17,10,13,10,16,8]。
 * 
 * 示例 3:
 *  输入: [1,2,3,4,5,6,7,8,9]
 *  输出: 2
 */

// 思路1：贪心算法
// 因为题目要求的是最长摆动子序列的长度，所以只需要统计数组的峰值数量就可以了（相当于是删除单一坡度上的节点，然后统计长度）
// 这就是贪心所贪的地方，让峰值尽可能的保持峰值，然后删除单一坡度上的节点。
// 时间复杂度：O(n)
// 空间复杂度：O(1)
const wiggleMaxLength = function(nums) {
    if (nums.length <= 1) return nums.length

    // 记录峰值个数，序列默认序列最右边有一个峰值
    let result = 1
    // 前一对差值
    let preDiff = 0
    // 当前一对差值
    let curDiff = 0

    for (let i = 0; i < nums.length - 1; i++) {
        curDiff = nums[i + 1] - nums[i]

        if ((curDiff > 0 && preDiff <= 0) || (curDiff < 0 && preDiff >= 0)) {
            result++
            preDiff = curDiff
        }
    }

    return result
};

/**
 * 动态规划
 * 
 * 思路：
 *  很容易可以发现，对于我们当前考虑的这个数，要么是作为山峰（即nums[i] > nums[i-1]），要么是作为山谷（即nums[i] < nums[i - 1]）。
 *  设dp状态dp[i][0]，表示考虑前i个数，第i个数作为山峰的摆动子序列的最长长度
 *  设dp状态dp[i][1]，表示考虑前i个数，第i个数作为山谷的摆动子序列的最长长度
 * 
 * 则转移方程为：
 *  dp[i][0] = max(dp[i][0], dp[j][1] + 1)，其中0 < j < i且nums[j] < nums[i]，表示将nums[i]接到前面某个山谷后面，作为山峰。
 *  dp[i][1] = max(dp[i][1], dp[j][0] + 1)，其中0 < j < i且nums[j] > nums[i]，表示将nums[i]接到前面某个山峰后面，作为山谷。
 * 
 * 初始状态：
 *  由于一个数可以接到前面的某个数后面，也可以以自身为子序列的起点，所以初始状态为：dp[0][0] = dp[0][1] = 1。
 * 
 * 
 * 复杂度：
 *  时间复杂度：O(n^2)
 *  空间复杂度：O(n)
 */
const wiggleMaxLength1 = function(nums) {
    if (nums.length === 1) return 1; 

    // 考虑前i个数，当第i个值作为峰谷时的情况（则第i-1是峰顶）
    let down = 1;
    // 考虑前i个数，当第i个值作为峰顶时的情况（则第i-1是峰谷）
    let up = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i - 1]) {
            down = Math.max(up + 1, down);
        }
        else if (nums[i] > nums[i - 1]) {
            up = Math.max(down + 1, up)
        }
    }

    return Math.max(down, up);
};


/**
 * @TODO: 以后有时间了再研究？
 * 动态规划 - 进阶 
 * 可以用两棵线段树来维护区间的最大值
 * 每次更新dp[i][0]，则在tree1的nums[i]位置值更新为dp[i][0]
 * 每次更新dp[i][1]，则在tree2的nums[i]位置值更新为dp[i][1]
 * 则dp转移方程中就没有必要j从0遍历到i-1，可以直接在线段树中查询指定区间的值即可。
 * 
 * 
 * 复杂度：
 *  时间复杂度：O(n\log * n)
 *  空间复杂度：O(n)
 */





// 测试
const list = [1,7,4,9,2,5]
const list1 = [1,17,5,10,13,15,10,5,16,8]
const list2 = [1,2,3,4,5,6,7,8,9]

// 贪心
// console.log(wiggleMaxLength(list))
// console.log(wiggleMaxLength(list1))
// console.log(wiggleMaxLength(list2))

// 动态规划
console.log(wiggleMaxLength(list))
console.log(wiggleMaxLength(list1))
console.log(wiggleMaxLength(list2))
