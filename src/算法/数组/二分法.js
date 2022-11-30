/**
 * 二分法
 * https://leetcode.cn/problems/binary-search/
 * 
 * 区间的定义一般为两种：左闭右闭即[left, right]，或者左闭右开即[left, right)。
 * 
 */

// 左闭右闭区间
var search = function(nums, target) {
    let left = 0, right = nums.length - 1;

    // 使用左闭右闭区间
    while (left <= right) {
        let mid = left + Math.floor((right - left)/2);
        if (nums[mid] > target) {
            // 去左面闭区间寻找
            right = mid - 1;
        } else if (nums[mid] < target) {
            // 去右面闭区间寻找
            left = mid + 1;
        } else {
            return mid;
        }
    }

    return -1;
};

// 左闭右开区间
var search = function(nums, target) {
    let left = 0, right = nums.length;

    // 使用左闭右开区间 [left, right)
    while (left < right) {
        let mid = left + Math.floor((right - left)/2);
        if (nums[mid] > target) {
            // 去左区间寻找
            right = mid;
        } else if (nums[mid] < target) {
            // 去右区间寻找
            left = mid + 1;
        } else {
            return mid;
        }
    }
    
    return -1;
};
