/**
 * 47.全排列 II
 * 
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 * 示例 1：
 *  输入：nums = [1,1,2]
 *  输出： [[1,1,2], [1,2,1], [2,1,1]]
 * 
 * 示例 2：
 *  输入：nums = [1,2,3]
 *  输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 
 * 提示：
 *  1 <= nums.length <= 8
 *  -10 <= nums[i] <= 10
 * 
 * 
 * 树层上去重(效率高)(used[i - 1] == false)，的树形结构如下：
 *  https://img-blog.csdnimg.cn/20201124201406192.png
 * 树枝上去重（used[i - 1] == true）的树型结构如下：
 *  https://img-blog.csdnimg.cn/20201124201431571.png
 */
const permuteUnique = function (nums) {
    nums.sort((a, b) => {
        return a - b
    })
    let result = []
    let path = []

    function backtracing(used) {
        if (path.length === nums.length) {
            result.push([...path])
            return
        }

        for (let i = 0; i < nums.length; i++) {
            // used[i - 1] == true，说明同一树枝nums[i - 1]使用过
            // used[i - 1] == false，说明同一树层nums[i - 1]使用过
            // 如果同一树层nums[i - 1]使用过则直接跳过
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue
            }

            if (!used[i]) {
                used[i] = true
                path.push(nums[i])

                // 递归
                backtracing(used)

                // 回溯
                path.pop()
                used[i] = false
            }
        }
    }

    backtracing([])
    return result
}


// 测试
const nums1 = [1,1,2]
const nums2 = [1,2,3]
console.log(permuteUnique(nums1))
console.log(permuteUnique(nums2))
