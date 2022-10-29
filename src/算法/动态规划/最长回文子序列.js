/**
 * 516.最长回文子序列
 * https://leetcode.cn/problems/longest-palindromic-subsequence/
 * 
 * 回文子串是要连续的，回文子序列可不是连续的！
 * 
 * 给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的长度。可以假设 s 的最大长度为 1000 。
 * 示例 1: 输入: "bbbab" 输出: 4 一个可能的最长回文子序列为 "bbbb"。
 * 示例 2: 输入:"cbbd" 输出: 2 一个可能的最长回文子序列为 "bb"。
 * 
 * 提示：
 *  1 <= s.length <= 1000
 *  s 只包含小写英文字母
 */
const longestPalindromeSubseq = (s) => {
    const strLen = s.length;
    let dp = Array.from(Array(strLen), () => Array(strLen).fill(0));
    
    // 初始化
    for (let i = 0; i < strLen; i++) {
        dp[i][i] = 1;
    }

    // 自下而上，自左往右遍历
    for (let i = strLen - 1; i >= 0; i--) {
        for (let j = i + 1; j < strLen; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } 
            else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[0][strLen - 1];
};



// 测试
const str1 = 'bbbab'
const str2 = 'cbbd'
console.log(longestPalindromeSubseq(str1))
console.log(longestPalindromeSubseq(str2))
