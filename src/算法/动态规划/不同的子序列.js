/**
 * 115.不同的子序列
 * https://leetcode.cn/problems/distinct-subsequences/
 * 
 * 给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。
 * 字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）
 * 题目数据保证答案符合 32 位带符号整数范围。
 * https://code-thinking.cdn.bcebos.com/pics/115.%E4%B8%8D%E5%90%8C%E7%9A%84%E5%AD%90%E5%BA%8F%E5%88%97%E7%A4%BA%E4%BE%8B.jpg
 * 
 * 提示：
 *  0 <= s.length, t.length <= 1000 s 和 t 由英文字母组成
 */

const numDistinct = (s, t) => {
    // 初始化
    let dp = Array.from(Array(s.length + 1), () => Array(t.length + 1).fill(0));
    for (let i = 0; i <= s.length; i++) {
        dp[i][0] = 1;
    }
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= t.length; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            }
            else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }

    return dp[s.length][t.length];
};


// 测试
const s1 = 'rabbbit'
const t1 = 'rabbit'
const s2 = 'babgbag'
const t2 = 'bag'
console.log(numDistinct(s1, t1))
console.log(numDistinct(s2, t2))