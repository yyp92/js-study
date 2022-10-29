/**
 * 283.移动零
 * https://leetcode.cn/problems/move-zeroes/
 * 
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 示例:
 *  输入: [0,1,0,3,12] 
 *  输出: [1,3,12,0,0] 
 * 
 * 说明:
 *  必须在原数组上操作，不能拷贝额外的数组。 尽量减少操作次数。
 */
var moveZeroes = function(nums) {
    let slow = 0;

    for (let fast = 0; fast < nums.length; fast++) {
        // 找到非0的元素
        if (nums[fast] != 0) {
            // 把非0的元素赋值给数组慢指针指向的索引处的值
            nums[slow] = nums[fast];
            // 慢指针向右移动
            slow++;
        }
    }

    // 后面的元素全变成 0
    for (let j = slow; j < nums.length; j++) {
        nums[j] = 0;
    }

    return nums
};


// 测试
const arr = [0,1,0,3,12] 
console.log(moveZeroes(arr))