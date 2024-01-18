/**
 * 78.子集
 * 
 * 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
 *  说明：解集不能包含重复的子集。
 *  示例: 输入: nums = [1,2,3] 输出: [ [3],   [1],   [2],   [1,2,3],   [1,3],   [2,3],   [1,2],   [] ]
 * 
 * 如果把 子集问题、组合问题、分割问题都抽象为一棵树的话，那么组合问题和分割问题都是收集树的叶子节点，而子集问题是找树的所有节点！
 * 其实子集也是一种组合问题，因为它的集合是无序的，子集{1,2} 和 子集{2,1}是一样的。
 * 那么既然是无序，取过的元素不会重复取，写回溯算法的时候，for就要从startIndex开始，而不是从0开始！
 */

const subsets = function(nums) {
    let result = []
    let path = []

    function backtracking(startIndex) {
        // console.log('path: ', path)

        // 收集子集
        result.push([...path])

        // if (startIndex >= nums.length) {
        //     return
        // }

        for (let i = startIndex; i < nums.length; i++) {
            // 处理节点
            path.push(nums[i])

            // 递归
            backtracking(i + 1)
            
            // 回溯
            path.pop()
        }
    }

    backtracking(0)
    return result
};


// 测试
const nums = [1,2,3]
console.log('---', subsets(nums))

