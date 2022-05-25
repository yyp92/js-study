/**
 * 电话号码的字母组合
 * 
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 示例: 输入："23" 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 * 说明：尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
 * 
 * 
 * 思路：
 *  数字和字母如何映射
 *  回溯法来解决n个for循环的问题
 *  回溯三部曲：
 *      1.确定回溯函数参数
 *          首先需要一个字符串s来收集叶子节点的结果，然后用一个字符串数组result保存起来，这两个变量我依然定义为全局。
 *          再来看参数，参数指定是有题目中给的string digits，然后还要有一个参数就是int型的index。
 *          注意这个index可不是 77.组合 和216.组合总和III 中的startIndex了。
 *          这个index是记录遍历第几个数字了，就是用来遍历digits的（题目中给出数字字符串），同时index也表示树的深度。
 *      2.确定终止条件
 *          例如输入用例"23"，两个数字，那么根节点往下递归两层就可以了，叶子节点就是要收集的结果集。
 *          那么终止条件就是如果index 等于 输入的数字个数（digits.size）了（本来index就是用来遍历digits的）
 *          然后收集结果，结束本层递归。
 *      3. 确定单层遍历逻辑
 *          首先要取index指向的数字，并找到对应的字符集（手机键盘的字符集）。
 *          然后for循环来处理这个字符集.
 *          注意这里for循环，可不像是在回溯算法：求组合问题！ 和回溯算法：求组合总和！ 中从startIndex开始遍历的。
 *          因为本题每一个数字代表的是不同集合，也就是求不同集合之间的组合，而77. 组合 和216.组合总和III 都是是求同一个集合中的组合！
 *          注意：输入1 * #按键等等异常情况
 *          代码中最好考虑这些异常情况，但题目的测试数据中应该没有异常情况的数据，所以我就没有加了。
 *          但是要知道会有这些异常，如果是现场面试中，一定要考虑到！
 */
const letterCombinations = function(digits) {
    const k = digits.length;
    const map = ["","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"];
    if (!k) return [];
    if (k === 1) return map[digits].split("");

    const res = [];
    const path = [];
    backtracking(digits, k, 0);
    return res;

    // n -> digits, k -> digits.length, index -> digits的下标
    function backtracking(n, k, index) {
        // 等于输入的长度时，则满足输出
        if (path.length === k) {
            res.push(path.join(""));
            return;
        }

        for (const v of map[n[index]]) {
            path.push(v);
            backtracking(n, k, index + 1);
            path.pop();
        }
    }
};


// 测试
console.log(letterCombinations('0'))
console.log(letterCombinations('1'))
console.log(letterCombinations('12'))
console.log(letterCombinations('2'))
console.log(letterCombinations('23'))
console.log(letterCombinations('234'))
