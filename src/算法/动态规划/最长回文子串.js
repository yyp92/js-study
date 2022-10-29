/**
 * 5.最长回文子串
 * https://leetcode.cn/problems/longest-palindromic-substring/
 * 
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 
 * 示例 1：
 *  输入：s = "babad"
 *  输出："bab"
 *  解释："aba" 同样是符合题意的答案。
 * 
 * 示例 2：
 *  输入：s = "cbbd"
 *  输出："bb"
 * 
 * 示例 3：
 *  输入：s = "a"
 *  输出："a"
 * 
 * 示例 4：
 *  输入：s = "ac"
 *  输出："a"
 */

// 动态规划解法
const longestPalindrome = function(s) {
    const len = s.length;

    // 布尔类型的dp[i][j]：表示区间范围[i,j] （注意是左闭右闭）的子串是否是回文子串，如果是dp[i][j]为true，否则为false
    let dp = new Array(len).fill(false).map(() => new Array(len).fill(false));
    
    // left起始位置  maxlenth回文串长度
    let left = 0, maxlenth = 0;

    for (let i = len - 1; i >= 0; i--){
        for (let j = i; j < len; j++){
            // 情况一：下标i 与 j相同，同一个字符例如a，当然是回文子串 j - i == 0
            // 情况二：下标i 与 j相差为1，例如aa，也是文子串 j - i == 1
            // 情况一和情况二 可以合并为 j - i <= 1
            // 情况三：下标：i 与 j相差大于1的时候，例如cabac，此时s[i]与s[j]已经相同了，我们看i到j区间是不是回文子串就看aba是不是回文就可以了，那么aba的区间就是 i+1 与 j-1区间，这个区间是不是回文就看dp[i + 1][j - 1]===true
            if (s[i] === s[j] && (j - i <= 1 || dp[i + 1][j - 1])) {
                dp[i][j] = true;
            }

            // 只要 dp[i][j] == true 成立，就表示子串 s[i..j] 是回文，此时记录回文长度和起始位置
            if (dp[i][j] && j - i + 1 > maxlenth) {
                // 回文串长度
                maxlenth = j - i + 1; 

                // 起始位置
                left = i; 
            }
        }
    }

    return s.substr(left, maxlenth); // 找到子串
};

// 双指针
const longestPalindrome1 = function(s) {
    let left = 0
    let right = 0
    let maxLength = 0;

    // s为字符串 i,j为双指针 n为字符串长度
    const extend = (s, i, j, n) => {
        while(i >= 0 && j < n && s[i] === s[j]){
            if (j - i + 1 > maxLength){
                // 更新开始位置
                left = i; 
                // 更新结尾位置
                right = j;
                
                // 更新子串最大长度
                maxLength = j - i + 1; 
            }

            // 指针移动
            i--;
            j++;
        }
    }

    for (let i = 0; i < s.length; i++){
        // 以i为中心
        extend(s, i, i, s.length); 

        // 以i和i+1为中心
        extend(s, i, i + 1, s.length); 
    }

    return s.substr(left, maxLength);
}


// 测试
const s1 = 'babad'
const s2 = 'cbbd'
const s3 = 'a'
const s4 = 'ac'
console.log(longestPalindrome(s1))
console.log(longestPalindrome(s2))
console.log(longestPalindrome(s3))
console.log(longestPalindrome(s4))
console.log(longestPalindrome1(s1))
console.log(longestPalindrome1(s2))
console.log(longestPalindrome1(s3))
console.log(longestPalindrome1(s4))