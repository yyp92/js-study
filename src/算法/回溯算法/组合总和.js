/**
 * 组合总和
 * 
 * 题意：
 *  给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 *  candidates 中的数字可以无限制重复被选取。
 * 
 * 说明：
 *  所有数字（包括 target）都是正整数。
 *  解集不能包含重复的组合。
 * 
 * 示例 1：
 *  输入：candidates = [2,3,6,7], target = 7, 所求解集为： [ [7], [2,2,3] ]
 * 示例 2：
 *  输入：candidates = [2,3,5], target = 8, 所求解集为： [   [2,2,2,2],   [2,3,3],   [3,5] ]
 * 
 * 提示：
 *  1 <= candidates[i] <= 200
 * 
 * 
 * 思路：
 *  题目中的无限制重复被选取，吓得我赶紧想想 出现0 可咋办，然后看到下面提示：1 <= candidates[i] <= 200，我就放心了。
 *  本题和77.组合，216.组合总和III的区别是：本题没有数量要求，可以无限重复，但是有总和的限制，所以间接的也是有个数的限制。
 *  本题搜索的过程抽象成树形结构如下：https://programmercarl.com/0039.%E7%BB%84%E5%90%88%E6%80%BB%E5%92%8C.html#%E5%9B%9E%E6%BA%AF%E4%B8%89%E9%83%A8%E6%9B%B2
 *  注意图中叶子节点的返回条件，因为本题没有组合数量要求，仅仅是总和的限制，所以递归没有层数的限制，只要选取的元素总和超过target，就返回！
 *  而在77.组合 和 216.组合总和III中都可以知道要递归K层，因为要取k个元素的组合。
 * 
 * 回溯三部曲：
 *  1.递归函数参数
 *      这里依然是定义两个全局变量，二维数组result存放结果集，数组path存放符合条件的结果。（这两个变量可以作为函数参数传入）
 *      首先是题目中给出的参数，集合candidates, 和目标值target。
 *      此外我还定义了int型的sum变量来统计单一结果path里的总和，其实这个sum也可以不用，用target做相应的减法就可以了，最后如何target==0就说明找到符合的结果了，但为了代码逻辑清晰，我依然用了sum。
 *      本题还需要startIndex来控制for循环的起始位置，对于组合问题，什么时候需要startIndex呢？
 *      @TODO: 我举过例子，如果是一个集合来求组合的话，就需要startIndex，例如：77.组合，216.组合总和III。
 *      @TODO: 如果是多个集合取组合，各个集合之间相互不影响，那么就不用startIndex，例如：17.电话号码的字母组合。
 *      注意以上我只是说求组合的情况，如果是排列问题，又是另一套分析的套路，后面我再讲解排列的时候就重点介绍。
 * 
 *  2.递归终止条件
 *      从叶子节点可以清晰看到，终止只有两种情况，sum大于target和sum等于target。
 * 
 *  3.单层搜索的逻辑
 *      单层for循环依然是从startIndex开始，搜索candidates集合。
 *      注意本题和77.组合、216.组合总和III的一个区别是：本题元素为可重复选取的。
 * 
 * 
 * 剪枝优化:
 *  以及上面的版本一的代码大家可以看到，对于sum已经大于target的情况，其实是依然进入了下一层递归，只是下一层递归结束判断的时候，会判断sum > target的话就返回。
 *  其实如果已经知道下一层的sum会大于target，就没有必要进入下一层递归了。
 *  那么可以在for循环的搜索范围上做做文章了。
 *  对总集合排序之后，如果下一层的sum（就是本层的 sum + candidates[i]）已经大于target，就可以结束本轮for循环的遍历。
 * 
 * 
 * 总结:
 *  本题和我们之前讲过的77.组合、216.组合总和III有两点不同：
 *      组合没有数量要求
 *      元素可无限重复选取
 *  针对这两个问题，我都做了详细的分析。
 *  并且给出了对于组合问题，什么时候用startIndex，什么时候不用，并用17.电话号码的字母组合做了对比。
 *  最后还给出了本题的剪枝优化，这个优化如果是初学者的话并不容易想到。
 *  在求和问题中，排序之后加剪枝是常见的套路！
 */

const combinationSum = function(candidates, target) {
    const res = []
    const path = [];
    candidates.sort(); // 排序
    backtracking(0, 0);
    return res;

    function backtracking(startIndex, sum) {
        if (sum > target) return;

        if (sum === target) {
            res.push(Array.from(path));
            return;
        }

        // 剪枝：如果 sum + candidates[i] > target 就终止遍历
        for (let i = startIndex; i < candidates.length && sum + candidates[i] <= target; i++ ) {
            const n = candidates[i];

            if (n > target - sum) continue;
            path.push(n);
            sum += n;
            backtracking(i, sum);

            // 回溯
            path.pop();
            sum -= n;
        }
    }
};



// 测试
const candidates = [2,3,6,7]
const target = 7
// [ [7], [2,2,3] ]
const candidates1 = [2,3,5]
const target1 = 8
// [   [2,2,2,2],   [2,3,3],   [3,5] ]

console.log(combinationSum(candidates, target))
console.log(combinationSum(candidates1, target1))