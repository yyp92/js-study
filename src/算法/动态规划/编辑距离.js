/**
 * 72.编辑距离
 * https://leetcode.cn/problems/edit-distance/
 * 
 * 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。
 * 你可以对一个单词进行如下三种操作：
 *  插入一个字符
 *  删除一个字符
 *  替换一个字符
 * 
 * 示例 1： 
 *  输入：word1 = "horse", word2 = "ros" 
 *  输出：3 
 *  解释： horse -> rorse (将 'h' 替换为 'r') rorse -> rose (删除 'r') rose -> ros (删除 'e')
 * 
 * 示例 2： 
 *  输入：word1 = "intention", word2 = "execution" 
 *  输出：5 
 *  解释： intention -> inention (删除 't') inention -> enention (将 'i' 替换为 'e') enention -> exention (将 'n' 替换为 'x') exention -> exection (将 'n' 替换为 'c') exection -> execution (插入 'u')
 * 
 * 提示：
 *  0 <= word1.length, word2.length <= 500
 *  word1 和 word2 由小写英文字母组成
 */
const minDistance = (word1, word2) => {
    // * dp[i][j] 表示以下标i-1为结尾的字符串word1，和以下标j-1为结尾的字符串word2，最近编辑距离为dp[i][j]
    
    // 初始化
    let dp = Array.from(Array(word1.length + 1), () => Array(word2.length + 1).fill(0));
    for (let i = 1; i <= word1.length; i++) {
        dp[i][0] = i; 
    }
    for (let j = 1; j <= word2.length; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            // 那么说明不用任何编辑
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            // 操作一：word1删除一个元素，那么就是以下标i - 2为结尾的word1 与 j-1为结尾的word2的最近编辑距离 再加上一个操作。
            // 操作二：word2删除一个元素，那么就是以下标i - 1为结尾的word1 与 j-2为结尾的word2的最近编辑距离 再加上一个操作。
            // 操作三：替换元素，word1替换word1[i - 1]，使其与word2[j - 1]相同，此时不用增加元素，那么以下标i-2为结尾的word1 与 j-2为结尾的word2的最近编辑距离 加上一个替换元素的操作。
            else {
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
            }
        }
    }
    
    return dp[word1.length][word2.length];
}


// 测试
const word1 = "horse"
const word2 = "ros"
const word3 = "intention"
const word4 = "execution" 
console.log(minDistance(word1, word2))
console.log(minDistance(word3, word4))