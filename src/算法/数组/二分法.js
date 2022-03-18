/**
 * 二分法
 * 
 * 区间的定义一般为两种：左闭右闭即[left, right]，或者左闭右开即[left, right)。
 * 
 * 定义target在[left, right]区间：
 *  1. while (left <= right) 要使用 <= ，因为left == right是有意义的，所以使用 <=
 *  2. if (nums[middle] > target) right 要赋值为 middle - 1，因为当前这个nums[middle]一定不是target，那么接下来要查找的左区间结束下标位置就是 middle - 1
 * 
 * 
 * 定义target在[left, right]区间：
 *  1. while (left < right)，这里使用 < ,因为left == right在区间[left, right)是没有意义的
 *  2. if (nums[middle] > target) right 更新为 middle，因为当前nums[middle]不等于target，去左区间继续寻找，而寻找区间是左闭右开区间，所以right更新为middle，即：下一个查询区间不会去比较nums[middle]
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
