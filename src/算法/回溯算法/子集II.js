/**
 * 90.子集II
 * 排列问题里去重也是这个套路，所以理解“树层去重”和“树枝去重”非常重要。
 * 
 * 给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
 * 说明：解集不能包含重复的子集。
 * 示例:
 *  输入: [1,2,2]
 *  输出: [ [2], [1], [1,2,2], [2,2], [1,2], [] ]
 */

const subsetsWithDup = function(nums) {
    let result = []
    let path = []

    // 排序
    let sortNums = nums.sort((a, b) => {
        return a - b
    })

    function backtracing(startIndex, sortNums) {
        result.push([...path])

        // 终止
        if (startIndex > nums.length - 1) {
            return
        }

        for (let i = startIndex; i < nums.length; i++) {
            // 去重
            if (i > startIndex && nums[i] === nums[i - 1]) {
                continue
            }

            path.push(nums[i])
            // 递归
            backtracing(i + 1, sortNums)
            // 回溯
            path.pop()
        }
    }

    backtracing(0, sortNums)
    return result
};


// 测试
const arr = [1, 2, 2]
console.log('subsetsWithDup: ', subsetsWithDup(arr))