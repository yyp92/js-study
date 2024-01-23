/**
 * 组合总和II
 * https://leetcode.cn/problems/combination-sum-ii/description/
 * 
 * 题意：
 *  给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 *  candidates 中的每个数字在每个组合中只能使用一次。
 * 
 * 说明：
 *  所有数字（包括目标数）都是正整数。 解集不能包含重复的组合。
 * 
 * 示例 1: 
 *  输入: candidates = [10,1,2,7,6,1,5], target = 8, 所求解集为: [ [1, 7], [1, 2, 5], [2, 6], [1, 1, 6] ]
 * 
 * 示例 2: 
 *  输入: candidates = [2,5,2,1,2], target = 5, 所求解集为: [   [1,2,2],   [5] ]
 * 
 * 
 * 思路：
 *  这道题目和39.组合总和 如下区别1：
 *      本题candidates 中的每个数字在每个组合中只能使用一次。
 *      本题数组candidates的元素是有重复的，而39.组合总和 是无重复元素的数组candidates
 *  最后本题39.组合总和 要求一样，解集不能包含重复的组合。
 * 
 *  这道题目和39.组合总和 如下区别2： 
 *      集合（数组candidates）有重复元素，但还不能有重复的组合。
 *  这个去重为什么很难理解呢，所谓去重，其实就是使用过的元素不能重复选取。 这么一说好像很简单！
 *  都知道组合问题可以抽象为树形结构，那么“使用过”在这个树形结构上是有两个维度的，一个维度是同一树枝上使用过，一个维度是同一树层上使用过。没有理解这两个层面上的“使用过” 是造成大家没有彻底理解去重的根本原因。
 *  那么问题来了，我们是要同一树层上使用过，还是同一树枝上使用过呢？
 *  回看一下题目，元素在同一个组合内是可以重复的，怎么重复都没事，但两个组合不能相同。
 *  所以我们要去重的是同一树层上的“使用过”，同一树枝上的都是一个组合里的元素，不用去重。
 *  为了理解去重我们来举一个例子，candidates = [1, 1, 2], target = 3，（方便起见candidates已经排序了）
 *  强调一下，树层去重的话，需要对数组排序！
 * 
 * 
 * 回溯三部曲：
 *  1.递归函数参数
 *  2.递归终止条件
 *      与39.组合总和 相同，终止条件为 sum > target 和 sum == target。
 *      sum > target 这个条件其实可以省略，因为和在递归单层遍历的时候，会有剪枝的操作，下面会介绍到。
 *  3.单层搜索的逻辑
 *      注意sum + candidates[i] <= target为剪枝操作，在39.组合总和 有讲解过！
 *      这里直接用startIndex来去重也是可以的， 就不用used数组了。
 * 
 * 
 * 总结：
 *  本题同样是求组合总和，但就是因为其数组candidates有重复元素，而要求不能有重复的组合，所以相对于39.组合总和 难度提升了不少。
 *  关键是去重的逻辑，代码很简单。
 */

// 使用startIndex来去重
const combinationSum = function(candidates, target) {
    const res = []
    const path = []
    candidates.sort((a, b) => a - b);

    backtracking(candidates, target, 0, 0);

    return res;

    function backtracking(candidates, target, sum, startIndex) {
        if (sum === target) {
            res.push(Array.from(path));
            return;
        }

        // 剪枝：sum + candidates[j] <= target
        for (let j = startIndex; j < candidates.length && sum + candidates[j] <= target; j++) {
            // 要对同一树层使用过的元素进行跳过
            if (j > startIndex && candidates[j] === candidates[j - 1]) {
                continue
            };

            path.push(candidates[j]);
            sum += candidates[j];
            backtracking(candidates, target, sum, j + 1);

            // 回溯
            path.pop();
            sum -= candidates[j];
        }
    }
};


// 使用used去重
const combinationSum2 = function(candidates, target) {
    let res = [];
    let path = [];
    let total = 0;

    const len = candidates.length;
    candidates.sort((a, b) => a - b);
    let used = new Array(len).fill(false);

    const backtracking = (candidates, target, startIndex) => {
        if (total === target) {
            res.push([...path]);
            return;
        }

        // 剪枝：total <= target
        for (let i = startIndex; i < len && total <= target; i++) {
            const cur = candidates[i];

            // 树层去重
            if (cur > target - total || (i > 0 && cur === candidates[i - 1] && !used[i - 1])) {
                continue;
            }

            path.push(cur);
            total += cur;
            used[i] = true;

            backtracking(candidates, target, i + 1);

            path.pop();
            total -= cur;
            used[i] = false;
        }
    }

    backtracking(candidates, target, 0);

    return res;
};


// 测试
const candidates = [10,1,2,7,6,1,5]
const target = 8
const candidates1 = [2,5,2,1,2]
const target1 = 5
console.log(combinationSum(candidates, target))
console.log(combinationSum(candidates1, target1))
console.log(combinationSum2(candidates, target))
console.log(combinationSum2(candidates1, target1))