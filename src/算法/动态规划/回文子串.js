/**
 * 647.回文子串
 * https://leetcode.cn/problems/palindromic-substrings/
 * 
 * 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 * 
 * 示例 1：
 *  输入："abc" 
 *  输出：3 
 *  解释：三个回文子串: "a", "b", "c"
 * 
 * 示例 2：
 *  输入："aaa" 
 *  输出：6 
 *  解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 * 
 * 提示：
 *  输入的字符串长度不会超过 1000 。
 */

/**
 * 动态规划
 * 
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n^2)
 */
const countSubstrings1 = (s) => {
    const strLen = s.length;
    let numOfPalindromicStr = 0;
    let dp = Array.from(Array(strLen), () => Array(strLen).fill(false));

    for (let i = strLen - 1; i >= 0; i--) {
        for (let j = i; j < strLen; j++) {
            // 当两端字母一样时，才可以两端收缩进一步判断
            if (s[i] === s[j]) {
                // 情况一 和 情况二
                if ((j - i) <= 1) {
                    dp[i][j] = true;
                }
                // 情况三
                else {
                    dp[i][j] = dp[i + 1][j - 1];
                }

                numOfPalindromicStr += dp[i][j] ? 1 : 0;
            }
        }
    }

    return numOfPalindromicStr;
}

/**
 * 双指针
 * 
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 */
const countSubstrings = (s) => {
    const strLen = s.length;
    let numOfPalindromicStr = 0;

    // 总共有2 * len - 1个中心点
    for (let i = 0; i < 2 * strLen - 1; i++) {
        // 通过遍历每个回文中心，向两边扩散，并判断是否回文字串
        //有两种情况，left == right，right = left + 1，这两种回文中心是不一样的
        let left = Math.floor(i/2);
        let right = left + i % 2;

        while(left >= 0 && right < strLen && s[left] === s[right]){
            numOfPalindromicStr++;
            left--;
            right++;
        }
    }

    return numOfPalindromicStr;
}


// 测试
const str1 = 'abc'
const str2 = 'aaa'
console.log(countSubstrings1(str1))
console.log(countSubstrings1(str2))
console.log(countSubstrings(str1))
console.log(countSubstrings(str2))
