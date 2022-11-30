/**
 * 有序数组的平方
 * https://leetcode.cn/problems/squares-of-a-sorted-array/
 * 
 * 双指针法
 *  时间复杂度为O(n)
 * 
 * 示例 1： 输入：nums = [-4,-1,0,3,10] 输出：[0,1,9,16,100] 解释：平方后，数组变为 [16,1,0,9,100]，排序后，数组变为 [0,1,9,16,100]
 * 示例 2： 输入：nums = [-7,-3,2,3,11] 输出：[4,9,9,49,121]
 */

var sortedSquares = function(nums) {
    let n = nums.length;
    let res = new Array(n).fill(0);
    let i = 0
    let j = n - 1
    let k = n - 1;

    while (i <= j) {
        let left = nums[i] * nums[i]
        let right = nums[j] * nums[j]

        if (left < right) {
            res[k--] = right;
            j--;
        } 
        else {
            res[k--] = left;
            i++;
        }
    }

    return res;
};

// 测试
const nums1 = [-4,-1,0,3,10]
const nums2 = [-7,-3,2,3,11]
console.log(sortedSquares(nums1))
console.log(sortedSquares(nums2))
