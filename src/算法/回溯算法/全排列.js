/**
 * 46.全排列
 * 
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 * 
 * 示例:
 *  输入: [1,2,3]
 *  输出: [ [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1] ]
 */
const permute = function(nums) {
    const res = []
    const path = [];
    
    function backtracking(n, k, used) {
        // 此时说明找到了一组
        if (path.length === k) {
            res.push(Array.from(path));
            return;
        }

        for (let i = 0; i < k; i++ ) {
            // path里已经收录的元素，直接跳过
            if (used[i]) continue;

            path.push(n[i]);
            // 需要used数组记录path里都放了哪些元素了
            used[i] = true;
            backtracking(n, k, used);

            // 回溯
            path.pop();
            used[i] = false;
        }
    }

    backtracking(nums, nums.length, []);
    return res;
}


// 测试
const arr = [1, 2, 3]