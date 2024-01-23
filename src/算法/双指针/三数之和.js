/**
 * 三数之和
 * https://leetcode.cn/problems/3sum/
 * 
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 * 注意： 答案中不可以包含重复的三元组。
 * 示例：
 *  给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 *  满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
 * 
 */

var threeSum = function(nums) {
    const res = []
    const len = nums.length

    // 将数组排序
    nums.sort((a, b) => a - b)

    for (let i = 0; i < len; i++) {
        let l = i + 1
        let r = len - 1
        let iNum = nums[i]

        // 数组排过序，如果第一个数大于0直接返回res
        if (iNum > 0) return res

        // 去重
        if (iNum == nums[i - 1]) continue

        while(l < r) {
            let lNum = nums[l], rNum = nums[r], threeSum = iNum + lNum + rNum
            // 三数之和小于0，则左指针向右移动
            if (threeSum < 0) {
                l++
            }
            else if (threeSum > 0) {
                r--
            }
            else {
                res.push([iNum, lNum, rNum])
                l++
                r--

                // 去重
                // while (l < r && nums[l] === nums[++l]);
                // while (l < r && nums[r] === nums[--r]);
            }
        }
    }
    
    return res
};


// 测试
const nums = [-1, 0, 1, 2, -1, -4]
console.log(threeSum(nums)) //  [ [-1, 0, 1], [-1, -1, 2] ]
