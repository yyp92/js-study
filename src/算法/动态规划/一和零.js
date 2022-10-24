/**
 * 474.一和零
 * https://leetcode.cn/problems/ones-and-zeroes/
 * 
 * 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
 * 请你找出并返回 strs 的最大子集的大小，该子集中 最多 有 m 个 0 和 n 个 1 。
 * 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
 * 
 * 示例 1：
 *  输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3 
 *  输出：4
 *  解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。 其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1 ，大于 n 的值 3 。
 * 
 * 示例 2： 
 *  输入：strs = ["10", "0", "1"], m = 1, n = 1 
 *  输出：2 
 *  解释：最大的子集是 {"0", "1"} ，所以答案是 2 。
 * 
 * 提示：
 *  1 <= strs.length <= 600
 *  1 <= strs[i].length <= 100
 *  strs[i] 仅由 '0' 和 '1' 组成
 *  1 <= m, n <= 100
 */
const findMaxForm = (strs, m, n) => {
    // 初始化，默认为0
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
    let numOfZeros, numOfOnes;

    // 遍历物品
    for (let str of strs) {
        numOfZeros = 0;
        numOfOnes = 0;
    
        // 统计每个字符串0和1的个数
        for (let c of str) {
            if (c === '0') {
                numOfZeros++;
            } else {
                numOfOnes++;
            }
        }

        // 遍历背包容量且从后向前遍历！
        for (let i = m; i >= numOfZeros; i--) {
            for (let j = n; j >= numOfOnes; j--) {
                // 推导公式
                dp[i][j] = Math.max(dp[i][j], dp[i - numOfZeros][j - numOfOnes] + 1);
            }
        }
    }

    return dp[m][n];
};


// 测试
const strs = ["10", "0001", "111001", "1", "0"]
const m = 5
const n = 3 
const strs1 = ["10", "0", "1"]
const m1 = 1
const n1 = 1
console.log('1: ', findMaxForm(strs, m, n))
console.log('2: ', findMaxForm(strs1, m1, n1))