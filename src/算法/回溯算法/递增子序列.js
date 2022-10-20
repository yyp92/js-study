/**
 * 491.递增子序列
 * 
 * 给定一个整型数组, 你的任务是找到所有该数组的递增子序列，递增子序列的长度至少是2。
 * 
 * 示例:
 *  输入: [4, 6, 7, 7]
 *  输出: [[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]
 * 
 * 说明:
 *  给定数组的长度不会超过15。
 *  数组中的整数范围是 [-100,100]。
 *  给定数组中可能包含重复数字，相等的数字应该被视为递增的一种情况。
 */
const findSubsequences = function(nums) {
    let result = []
    let path = []
    
    function backtracing(startIndex) {
        if (path.length > 1) {
            result.push(path.slice())
        }

        // 记录同层使用过的元素
        let uset = []

        for (let i = startIndex; i < nums.length; i++) {
            // 分两种情况判断：
            // 一，当前取的元素小于子集的最后一个元素，则继续寻找下一个适合的元素
            // 二，当前取的元素在本层已经出现过了，所以跳过该元素，继续寻找
            if ((path.length > 0 && nums[i] < path[path.length - 1]) || uset[nums[i] + 100]) {
                continue
            }

            // 记录这个元素在本层用过了，本层后面不能再用了
            // 这里使用数组来进行去重操作，题目说数值范围[-100, 100], 应为可能为-100，所以要加上100
            uset[nums[i] + 100] = true

            path.push(nums[i])
            backtracing(i + 1)
            path.pop()
        }
    }

    backtracing(0)
    return result
};


// 测试
const arr = [4, 6, 7, 7]
console.log(findSubsequences(arr))