/**
 * 1143.最长公共子序列
 * https://leetcode.cn/problems/longest-common-subsequence/
 * 
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。
 * 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。
 * 若这两个字符串没有公共子序列，则返回 0。
 * 
 * 示例 1:
 *  输入：text1 = "abcde", text2 = "ace" 
 *  输出：3 
 *  解释：最长公共子序列是 "ace"，它的长度为 3。
 * 
 * 示例 2: 
 *  输入：text1 = "abc", text2 = "abc" 
 *  输出：3 
 *  解释：最长公共子序列是 "abc"，它的长度为 3。
 * 
 * 示例 3: 
 *  输入：text1 = "abc", text2 = "def" 
 *  输出：0 
 *  解释：两个字符串没有公共子序列，返回 0。
 * 
 * 提示:
 *  1 <= text1.length <= 1000
 *  1 <= text2.length <= 1000 输入的字符串只含有小写英文字符。
 */
 
const longestCommonSubsequence = (text1, text2) => {
    // * dp[i][j]：长度为[0, i - 1]的字符串text1与长度为[0, j - 1]的字符串text2的最长公共子序列为dp[i][j]

    let dp = Array.from(new Array(text1.length + 1), () => new Array(text2.length + 1).fill(0));

    for (let i = 1; i <= text1.length; i++) {
        for (let j = 1; j <= text2.length; j++) {
            // 如果text1[i - 1] 与 text2[j - 1]相同，那么找到了一个公共元素，所以dp[i][j] = dp[i - 1][j - 1] + 1;
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            }
            // 如果text1[i - 1] 与 text2[j - 1]不相同，那就看看text1[0, i - 2]与text2[0, j - 1]的最长公共子序列 和 text1[0, i - 1]与text2[0, j - 2]的最长公共子序列，取最大的。
            // 即：dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }

    return dp[text1.length][text2.length];
};


// 测试
const text1 = "abcde"
const text11 = "ace" 
const text2 = "abc"
const text22 = "abc" 
const text3 = "abc"
const text33 = "def" 
console.log(longestCommonSubsequence(text1, text11))
console.log(longestCommonSubsequence(text2, text22))
console.log(longestCommonSubsequence(text3, text33))