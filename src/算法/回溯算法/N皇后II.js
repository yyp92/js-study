/**
 * 52.N皇后II
 * 
 * 题目链接：https://leetcode.cn/problems/n-queens-ii/
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 * https://img-blog.csdnimg.cn/20200821152118456.png
 * 上图为 8 皇后问题的一种解法。
 * 给定一个整数 n，返回 n 皇后不同的解决方案的数量。
 * 示例:
 *  输入: 4
 *  输出: 2
 *  解释: 4 皇后问题存在如下两个不同的解法。
 *  解法 1 [  [".Q..",   "...Q",   "Q...",   "..Q."],
 *  解法 2 ["..Q.",   "Q...",   "...Q",   ".Q.."] ]
 */

const totalNQueens = function(n) {
    // 校验
    const isValid = (row, col, chessboard, n) => {
        // 检查列
        for (let i = 0; i < row; i++){ // 这是一个剪枝
            if (chessboard[i][col] === 'Q') {
                return false;
            }
        }

        // 检查 45度角是否有皇后
        // 斜向左上检查
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--){
            if (chessboard[i][j] === 'Q') {
                return false;
            }
        }

        // 检查 135度角是否有皇后
        // 斜向右上检查
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++){
            if (chessboard[i][j] === 'Q') {
                return false;
            }
        }

        return true;
    }

    let count = 0;
    const backtracking = (n, row, chessboard) => {
        if (row === n) {
            count++;
            return;
        }

        for (let col = 0; col < n; col++) {
            // 验证合法就可以放
            if (isValid(row, col, chessboard, n)) {
                // 放置皇后
                chessboard[row][col] = 'Q'; 

                // 递归
                backtracking(n, row + 1, chessboard);

                // 回溯
                chessboard[row][col] = '.';
            }
        }
    }

    const chessboard = new Array(n).fill([]).map(() => new Array(n).fill('.'));
    backtracking(n, 0, chessboard);
    return count;
}



// 测试
console.log(totalNQueens(4))