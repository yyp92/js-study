/**
 * 1035.不相交的线
 * https://leetcode.cn/problems/uncrossed-lines/
 * 
 * 我们在两条独立的水平线上按给定的顺序写下 A 和 B 中的整数。
 * 现在，我们可以绘制一些连接两个数字 A[i] 和 B[j] 的直线，只要 A[i] == B[j]，且我们绘制的直线不与任何其他连线（非水平线）相交。
 * 以这种方法绘制线条，并返回我们可以绘制的最大连线数。
 * https://img-blog.csdnimg.cn/2021032116363533.png
 */

// ? 其实就是求两个字符串的最长公共子序列的长度！
const maxUncrossedLines = (nums1, nums2) => {
    // * dp[i][j]：长度为[0, i - 1]的字符串nums1 与 长度为[0, j - 1]的字符串nums2的最长公共子序列为dp[i][j]
    
    // 两个数组长度
    const [m, n] = [nums1.length, nums2.length];

    // 创建dp数组并都初始化为0
    const dp = new Array(m + 1).fill(0).map(x => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // 根据两种情况更新dp[i][j]
            if (nums1[i - 1] === nums2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }
            else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // 返回dp数组中右下角的元素
    return dp[m][n];
}


// 测试
const a1 = [1, 4, 2]
const b1 = [1, 2, 4]
const a2 = [2, 5, 1, 2, 5]
const b2 = [10, 5, 2, 1, 5, 2]
const a3 = [1, 3, 7, 1, 7, 5]
const b3 = [1, 9, 2, 5, 1]
console.log(maxUncrossedLines(a1, b1))
console.log(maxUncrossedLines(a2, b2))
console.log(maxUncrossedLines(a3, b3))