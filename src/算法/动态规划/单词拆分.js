/**
 * 139.单词拆分
 * https://leetcode.cn/problems/word-break/
 * 
 * 给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
 * 说明：
 *  拆分时可以重复使用字典中的单词。
 *  你可以假设字典中没有重复的单词。
 * 
 * 示例 1： 
 *  输入: s = "leetcode", wordDict = ["leet", "code"] 
 *  输出: true 
 *  解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
 * 
 * 示例 2： 
 *  输入: s = "applepenapple", wordDict = ["apple", "pen"] 
 *  输出: true 
 *  解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。   注意你可以重复使用字典中的单词。
 * 
 * 示例 3： 
 *  输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"] 
 *  输出: false
 * 
 * 时间复杂度：O(n^3)，因为substr返回子串的副本是O(n)的复杂度（这里的n是substring的长度）
 * 空间复杂度：O(n)
 */
const wordBreak = (s, wordDict) => {
    // * dp[i] : 字符串长度为i的话，dp[i]为true，表示可以拆分为一个或多个在字典中出现的单词。
    
    // 初始化
    let dp = Array(s.length + 1).fill(false);
    dp[0] = true;

    // 遍历背包
    for (let i = 0; i <= s.length; i++) {
        // 遍历物品
        for (let j = 0; j < wordDict.length; j++) {
            if (i >= wordDict[j].length) {
                if (s.slice(i - wordDict[j].length, i) === wordDict[j] && dp[i - wordDict[j].length]) {
                    dp[i] = true
                }
            }
        }
    }

    return dp[s.length];
}



// 测试
const s1 = "leetcode"
const wordDict1 = ["leet", "code"] 
const s2 = "applepenapple"
const wordDict2 = ["apple", "pen"] 
const s3 = "catsandog"
const wordDict3 = ["cats", "dog", "sand", "and", "cat"] 
console.log(wordBreak(s1, wordDict1))
console.log(wordBreak(s2, wordDict2))
console.log(wordBreak(s3, wordDict3))