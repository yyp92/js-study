/**
 * 组合总和III
 * https://leetcode.cn/problems/combination-sum-iii/description/
 * 
 * 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
 * 
 * 说明：
 *  所有数字都是正整数。
 *  解集不能包含重复的组合。
 * 
 * 示例 1: 输入: k = 3, n = 7 输出: [[1,2,4]]
 * 示例 2: 输入: k = 3, n = 9 输出: [[1,2,6], [1,3,5], [2,3,4]]
 * 
 * 
 * 思路：
 *  本题就是在[1,2,3,4,5,6,7,8,9]这个集合中找到和为n的k个数的组合。
 *  本题k相当于了树的深度，9（因为整个集合就是9个数）就是树的宽度。
 * 
 * 回溯三部曲：
 *  确定递归函数参数
 *      依然需要一维数组path来存放符合条件的结果，二维数组result来存放结果集。
 *      参数：
 *          targetSum（int）目标和，也就是题目中的n。
 *          k（int）就是题目中要求k个数的集合。
 *          sum（int）为已经收集的元素的总和，也就是path里元素的总和。
 *          startIndex（int）为下一层for循环搜索的起始位置。
 *  确定终止条件
 *      在上面已经说了，k其实就已经限制树的深度，因为就取k个元素，树再往下深了没有意义。
 *      所以如果path.size() 和 k相等了，就终止。
 *      如果此时path里收集到的元素和（sum） 和targetSum（就是题目描述的n）相同了，就用result收集当前的结果。
 *  单层搜索过程
 *      本题和77. 组合 (opens new window)区别之一就是集合固定的就是9个数[1,...,9]，所以for循环固定i<=9
 *      处理过程就是 path收集每次选取的元素，相当于树型结构里的边，sum来统计path里元素的总和。
 *      别忘了处理过程 和 回溯过程是一一对应的，处理有加，回溯就要有减！
 * 
 * 剪枝:
 *  已选元素总和如果已经大于n（图中数值为4）了，那么往后遍历就没有意义了，直接剪掉。
 *  和回溯算法：组合问题再剪剪枝 (opens new window)一样，for循环的范围也可以剪枝，i <= 9 - (k - path.size()) + 1就可以了。
 * 
 * 总结：
 *  分析完区别，依然把问题抽象为树形结构，按照回溯三部曲进行讲解，最后给出剪枝的优化。
 */

const combinationSum3 = (k, n) => {
    if (k > 9 || k < 1) return [];

    const res = []
    const path = []
    
    // k：题目中要求k个数的集合。
    // targetSum：目标和，也就是题目中的n。
    // sum：已经收集的元素的总和，也就是path里元素的总和。
    // startIndex：下一层for循环搜索的起始位置。
    backtracking(k, n, 1, 0);

    function backtracking(k, n, startIndex, sum) {
        const len = path.length;
        if (len > k || sum > n) return;

        if (len === k) {
            if (sum === n) {
                return res.push([...path]);
                // return res.push(Array.from(path));
            }

            // 如果path.length() == k 但sum !== targetSum 直接返回
            return
        }

        for (let i = startIndex; i <= 9 - (k - len) + 1; i++) {
            // 处理
            path.push(i);
            sum += i;

            // 注意i+1调整startIndex
            backtracking(k, n, i + 1, sum);

            // 回溯
            path.pop();
            sum -= i;
        }
    }

    return res;
};


// 测试
console.log(combinationSum3(3, 7))
console.log(combinationSum3(3, 9))
