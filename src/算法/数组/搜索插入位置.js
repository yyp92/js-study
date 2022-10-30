/**
 * 35.搜索插入位置
 * https://leetcode.cn/problems/search-insert-position/
 * 
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * 你可以假设数组中无重复元素。
 * 
 * 示例 1:
 *  输入: [1,3,5,6], 5
 *  输出: 2
 * 
 * 示例 2:
 *  输入: [1,3,5,6], 2
 *  输出: 1
 * 
 * 示例 3:
 *  输入: [1,3,5,6], 7
 *  输出: 4
 * 
 * 示例 4:
 *  输入: [1,3,5,6], 0
 *  输出: 0
 */

// 暴力解法
// 时间复杂度：O(n)
// 空间复杂度：O(1)
var searchInsert = function (nums, target) {
    let len = nums.length

    for (let i = 0; i < len; i++) {
        // 分别处理如下三种情况
        // 目标值在数组所有元素之前
        // 目标值等于数组中某一个元素
        // 目标值插入数组中的位置
        if (nums[i] >= target) { // 一旦发现大于或者等于target的num[i]，那么i就是我们要的结果
            return i;
        }
    }

    // 目标值在数组所有元素之后的情况
    return len; // 如果target是最大的，或者 nums为空，则返回nums的长度
}

// 二分法
// 时间复杂度：O(log n)
// 空间复杂度：O(1)
var searchInsert1 = function (nums, target) {
    let l = 0
    // 定义target在左闭右闭的区间里，[left, right]
    let r = nums.length - 1
  
    // 当left==right，区间[left, right]依然有效
    while (l <= r) {
        // 防止溢出 等同于(left + right)/2
      const mid = l + Math.floor((r - l) >> 1);
    
        // target 在右区间，所以[middle + 1, right]
        if (target > nums[mid]) {
            l = mid + 1;
        }
        // target 在左区间，所以[left, middle - 1]
        else if (target < nums[mid]) {
            r = mid - 1;
        }
        // nums[middle] == target
        else {
            return mid;
        }
    }
  
    // 分别处理如下四种情况
    // 目标值在数组所有元素之前  [0, -1]
    // 目标值等于数组中某一个元素  return middle;
    // 目标值插入数组中的位置 [left, right]，return  right + 1
    // 目标值在数组所有元素之后的情况 [left, right]， 因为是右闭区间，所以 return right + 1
    return r + 1;
};

// 测试
const arr1 = [1,3,5,6]
const target1 = 5
const arr2 = [1,3,5,6]
const target2 = 2
const arr3 = [1,3,5,6]
const target3 = 7
const arr4 = [1,3,5,6]
const target4 = 0
console.log(searchInsert(arr1, target1))
console.log(searchInsert(arr2, target2))
console.log(searchInsert(arr3, target3))
console.log(searchInsert(arr4, target4))
console.log(searchInsert1(arr1, target1))
console.log(searchInsert1(arr2, target2))
console.log(searchInsert1(arr3, target3))
console.log(searchInsert1(arr4, target4))