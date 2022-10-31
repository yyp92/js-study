/**
 * 503.下一个更大元素II
 * https://leetcode.cn/problems/next-greater-element-ii/
 * 
 * 给定一个循环数组（最后一个元素的下一个元素是数组的第一个元素），输出每个元素的下一个更大元素。数字 x 的下一个更大的元素是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1。
 * 
 * 示例 1:
 *  输入: [1,2,1]
 *  输出: [2,-1,2]
 *  解释: 第一个 1 的下一个更大的数是 2；数字 2 找不到下一个更大的数；第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
 */
var nextGreaterElements = function (nums) {
    const len = nums.length;
    let stack = [];
    let res = Array(len).fill(-1);

    for (let i = 0; i < len * 2; i++) {
        // 模拟遍历两边nums，注意一下都是用i % len来操作
        while (stack.length && nums[i % len] > nums[stack[stack.length - 1]]) {
            const index = stack.pop();
            res[index] = nums[i % len];
        }

        stack.push(i % len);
    }

    return res;
};


// 测试
const arr = [1,2,1]
console.log(nextGreaterElements(arr))