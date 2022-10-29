/**
 * 132.分割回文串 II
 * https://leetcode.cn/problems/palindrome-partitioning-ii/
 * 
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文。
 * 返回符合要求的 最少分割次数 。
 * 
 * 示例 1：
 *  输入：s = "aab" 
 *  输出：1 
 *  解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
 * 
 * 示例 2： 输入：s = "a" 输出：0
 * 
 * 示例 3： 输入：s = "ab" 输出：1
 * 
 * 提示：
 *  1 <= s.length <= 2000
 *  s 仅由小写英文字母组成
 */
var minCut = function(s) {
    const len = s.length;
    
    // 二维数组isPalindromic来保存整个字符串的回文情况
    const isPalindromic = new Array(len).fill(false).map(() => new Array(len).fill(false));
    for (let i = len - 1; i >= 0; i--){
        for (let j = i; j < len; j++){
            if (s[i] === s[j] && (j - i <= 1 || isPalindromic[i + 1][j - 1])){
                isPalindromic[i][j] = true;
            }
        }
    }

    // dp[i]：范围是[0, i]的回文子串，最少分割次数是dp[i]
    const dp = new Array(len).fill(0);

    // 初始化 dp[i]的最大值其实就是i，也就是把每个字符分割出来
    for (let i = 0; i < len; i++) dp[i] = i; 

    for (let i = 1; i < len; i++){
        // 判断是不是回文子串
        if (isPalindromic[0][i]) { 
            dp[i] = 0;
            continue;
        }

        /* 
        如果要对长度为[0, i]的子串进行分割，分割点为j。
        那么如果分割后，区间[j + 1, i]是回文子串，那么dp[i] 就等于 dp[j] + 1。
        这里可能有同学就不明白了，为什么只看[j + 1, i]区间，不看[0, j]区间是不是回文子串呢？
        那么在回顾一下dp[i]的定义： 范围是[0, i]的回文子串，最少分割次数是dp[i]。
        [0, j]区间的最小切割数量，我们已经知道了就是dp[j]。
        此时就找到了递推关系，当切割点j在[0, i] 之间时候，dp[i] = dp[j] + 1;
        本题是要找到最少分割次数，所以遍历j的时候要取最小的dp[i]。dp[i] = Math.min(dp[i], dp[j] + 1);
         */
        for (let j = 0; j < i; j++){
            if (isPalindromic[j + 1][i]) {
                dp[i] = Math.min(dp[i], dp[j] + 1);
            }
        }
    }

    return dp[len - 1];
}


// 测试
const s1 = "aab"
const s2 = "a"
const s3 = "ab"
console.log(minCut(s1))
console.log(minCut(s2))
console.log(minCut(s3))
