/**
 * 718.最长重复子数组
 * https://leetcode.cn/problems/maximum-length-of-repeated-subarray/
 * 
 * 给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。
 * 
 * 示例：
 *  输入： A: [1,2,3,2,1] B: [3,2,1,4,7] 
 *  输出：3 
 *  解释： 长度最长的公共子数组是 [3, 2, 1] 。
 * 
 * 提示：
 *  1 <= len(A), len(B) <= 1000
 *  0 <= A[i], B[i] < 100
 */
const findLength = (A, B) => {
    // * dp[i][j] ：以下标i - 1为结尾的A，和以下标j - 1为结尾的B，最长重复子数组长度为dp[i][j]。
    // * （特别注意： “以下标i - 1为结尾的A” 标明一定是 以A[i-1]为结尾的字符串 ）

    // A、B数组的长度
    const [m, n] = [A.length, B.length];

    // dp数组初始化，都初始化为0
    const dp = new Array(m + 1).fill(0).map(x => new Array(n + 1).fill(0));

    // 初始化最大长度为0
    let res = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // 遇到A[i - 1] === B[j - 1]，则更新dp数组
            if (A[i - 1] === B[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }

            // 更新res
            res = dp[i][j] > res ? dp[i][j] : res;
        }
    }

    // 遍历完成，返回res
    return res;
};

// 滚动数组
const findLength1 = (nums1, nums2) => {
    let len1 = nums1.length
    let len2 = nums2.length;

    // dp[i][j]: 以nums1[i-1]、nums2[j-1]为结尾的最长公共子数组的长度
    let dp = new Array(len2 + 1).fill(0);

    let res = 0;
    for (let i = 1; i <= len1; i++) {
        for (let j = len2; j > 0; j--) {
            if (nums1[i - 1] === nums2[j - 1]) {
                dp[j] = dp[j - 1] + 1;
            }
            // 注意这里不相等的时候要有赋 0 的操作
            else {
                dp[j] = 0;
            }

            res = Math.max(res, dp[j]);
        }
    }

    return res;
}


// 测试
const A = [1,2,3,2,1] 
const B = [3,2,1,4,7] 
console.log(findLength(A, B))
console.log(findLength1(A, B))