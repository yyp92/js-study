/**
 * 496.下一个更大元素 I
 * https://leetcode.cn/problems/next-greater-element-i/
 * 
 * 给你两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。
 * 请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值。
 * nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。
 * 
 * 示例 1:
 *  输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
 *  输出: [-1,3,-1]
 *  解释:
 *      对于 num1 中的数字 4 ，你无法在第二个数组中找到下一个更大的数字，因此输出 -1 。
 *      对于 num1 中的数字 1 ，第二个数组中数字1右边的下一个较大数字是 3 。
 *      对于 num1 中的数字 2 ，第二个数组中没有下一个更大的数字，因此输出 -1 。
 * 
 * 示例 2:
 *  输入: nums1 = [2,4], nums2 = [1,2,3,4].
 *  输出: [3,-1]
 *  解释:
 *      对于 num1 中的数字 2 ，第二个数组中的下一个较大数字是 3 。
 *      对于 num1 中的数字 4 ，第二个数组中没有下一个更大的数字，因此输出-1 。
 * 
 * 提示：
 *  1 <= nums1.length <= nums2.length <= 1000
 *  0 <= nums1[i], nums2[i] <= 10^4
 *  nums1和nums2中所有整数 互不相同
 *  nums1 中的所有整数同样出现在 nums2 中
 */
var nextGreaterElement = function (nums1, nums2) {
    let stack = [];
    let map = new Map();

    for (let i = 0; i < nums2.length; i++) {
        while (stack.length && nums2[i] > nums2[stack[stack.length - 1]]) {
            let index = stack.pop();
            map.set(nums2[index], nums2[i]);
        }

        stack.push(i);
    }
  
    let res = [];
    for (let j = 0; j < nums1.length; j++) {
        res[j] = map.get(nums1[j]) || -1;
    }
  
    return res;
};


// 测试
const nums1 = [4,1,2]
const nums2 = [1,3,4,2]
const nums3 = [2, 4]
const nums4 = [1,2,3,4]
console.log(nextGreaterElement(nums1, nums2))
console.log(nextGreaterElement(nums3, nums4))