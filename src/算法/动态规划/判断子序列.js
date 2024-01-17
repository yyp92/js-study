/**
 * 392.判断子序列
 * https://leetcode.cn/problems/is-subsequence/
 * 
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
 * 
 * 示例 1： 输入：s = "abc", t = "ahbgdc" 输出：true
 * 示例 2： 输入：s = "axc", t = "ahbgdc" 输出：false
 * 
 * 提示：
 *  0 <= s.length <= 100
 *  0 <= t.length <= 10^4
 * 
 * 两个字符串都只由小写字符组成。
 * 
 * 时间复杂度：O(n × m)
 * 空间复杂度：O(n × m)
 */
const isSubsequence = (s, t) => {
    // * dp[i][j]: 表示以下标i-1为结尾的字符串s，和以下标j-1为结尾的字符串t，相同子序列的长度为dp[i][j]

    // s、t的长度
    const [m, n] = [s.length, t.length];

    // dp全初始化为0
    const dp = new Array(m + 1).fill(0).map(x => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // 更新dp[i][j]，两种情况
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }
            else {
                dp[i][j] = dp[i][j - 1];
            }
        }
    }

    // 遍历结束，判断dp右下角的数是否等于s的长度
    return dp[m][n] === m ? true : false;
}


// 测试
const s1 = 'abc'
const t1 = 'ahbgdc'
const s2 = 'axc'
const t2 = 'ahbgdc'
console.log(isSubsequence(s1, t1))
console.log(isSubsequence(s2, t2))