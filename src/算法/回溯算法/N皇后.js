/**
 * 第51题. N皇后
 * 
 * n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 * 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
 * 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 * 
 * 示例 1：
 *  https://code-thinking-1253855093.file.myqcloud.com/pics/20211020232201.png
 *  输入：n = 4
 *  输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 *  解释：如上图所示，4 皇后问题存在两个不同的解法。
 * 
 * 示例 2：
 *  输入：n = 1
 *  输出：[["Q"]]
 * 
 * 
 * 首先来看一下皇后们的约束条件：
 *  不能同行
 *  不能同列
 *  不能同斜线
 */

const solveNQueens = function(n) {
    // 校验是否合法
    function isValid(row, col, chessBoard, n) {
        // 检查列
        for (let i = 0; i < row; i++) {
            if (chessBoard[i][col] === 'Q') {
                return false
            }
        }

        // 检查 45度角是否有皇后
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (chessBoard[i][j] === 'Q') {
                return false
            }
        }

        // 检查 135度角是否有皇后
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (chessBoard[i][j] === 'Q') {
                return false
            }
        }

        return true
    }

    // 二维数组转为一维数组
    function transformChessBoard(chessBoard) {
        let chessBoardBack = []

        chessBoard.forEach(row => {
            let rowStr = ''
            row.forEach(value => {
                rowStr += value
            })
            chessBoardBack.push(rowStr)
        })

        return chessBoardBack
    }

    let result = []
    // n 为输入的棋盘大小
    // row 是当前递归到棋盘的第几行了
    function backtracing(row, chessBoard) {
        if (row === n) {
            result.push(transformChessBoard(chessBoard))
            return
        }

        for (let col = 0; col < n; col++) {
            // 验证合法就可以放
            if (isValid(row, col, chessBoard, n)) {
                // 放置皇后
                chessBoard[row][col] = 'Q'

                // 递归
                backtracing(row + 1, chessBoard)

                // 回溯，撤销皇后
                chessBoard[row][col] = '.'
            }
        }
    }

    let chessBoard = new Array(n).fill([]).map(() => new Array(n).fill('.'))
    backtracing(0, chessBoard)
    return result  
}


// 测试
console.log(solveNQueens(4))