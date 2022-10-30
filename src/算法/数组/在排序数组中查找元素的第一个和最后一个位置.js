/**
 * 34.在排序数组中查找元素的第一个和最后一个位置
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
 * 
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 进阶：你可以设计并实现时间复杂度为 $O(\log n)$ 的算法解决此问题吗？
 * 
 * 示例 1：
 *  输入：nums = [5,7,7,8,8,10], target = 8
 *  输出：[3,4]
 * 
 * 示例 2：
 *  输入：nums = [5,7,7,8,8,10], target = 6
 *  输出：[-1,-1]
 * 
 * 示例 3：
 *  输入：nums = [], target = 0
 *  输出：[-1,-1]
 */
var searchRange = function(nums, target) {
    // 左边界
    // 如果leftBorder没有被赋值（即target在数组范围的右边，例如数组[3,3],target为4），为了处理情况一
    const getLeftBorder = (nums, target) => {
        let left = 0
        // 定义target在左闭右闭的区间里，[left, right]
        let right = nums.length - 1;
        // 记录一下leftBorder没有被赋值的情况
        let leftBorder = -2;

        while(left <= right) {
            let middle = left + Math.floor((right - left) / 2);

            // 寻找左边界，nums[middle] == target的时候更新right
            if (nums[middle] >= target){ 
                right = middle - 1;
                leftBorder = right;
            }
            else {
                left = middle + 1;
            }
        }

        return leftBorder;
    }

    // 右边界
    // 如果rightBorder为没有被赋值（即target在数组范围的左边，例如数组[3,3]，target为2），为了处理情况一
    const getRightBorder = (nums, target) => {
        let left = 0
        // 定义target在左闭右闭的区间里，[left, right]
        let right = nums.length - 1;

        // 记录一下rightBorder没有被赋值的情况
        let rightBorder = -2; 

        // 当left==right，区间[left, right]依然有效
        while (left <= right) {
            // 防止溢出 等同于(left + right)/2
            let middle = left + Math.floor((right - left) / 2);

            if (nums[middle] > target) {
                // target 在左区间，所以[left, middle - 1]
                right = middle - 1;
            } 
            // 寻找右边界，nums[middle] == target的时候更新left
            else { 
                left = middle + 1;
                rightBorder = left;
            }
        }

        return rightBorder;
    }

    let leftBorder = getLeftBorder(nums, target);
    let rightBorder = getRightBorder(nums, target);
    // console.log('--',leftBorder, rightBorder)

    // 情况一：target 在数组范围的右边或者左边，例如数组{3, 4, 5}，target为2或者数组{3, 4, 5},target为6，此时应该返回{-1, -1}
    if (leftBorder === -2 || rightBorder === -2) return [-1, -1];
    
    // 情况三：target 在数组范围中，且数组中存在target，例如数组{3,6,7},target为6，此时应该返回{1, 1}
    if (rightBorder - leftBorder > 1) return [leftBorder + 1, rightBorder - 1];
    
    // 情况二：target 在数组范围中，且数组中不存在target，例如数组{3,6,7},target为5，此时应该返回{-1, -1}
    return [-1, -1];
}


// 测试
const nums1 = [5,7,7,8,8,10]
const target1 = 8
const nums2 = [5,7,7,8,8,10]
const target2 = 6
const nums3 = []
const target3 = 0
console.log(searchRange(nums1, target1))
console.log(searchRange(nums2, target2))
console.log(searchRange(nums3, target3))