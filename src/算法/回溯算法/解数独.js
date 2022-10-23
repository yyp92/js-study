/**
 * 37. 解数独
 * 
 * 编写一个程序，通过填充空格来解决数独问题。
 * 一个数独的解法需遵循如下规则： 数字 1-9 在每一行只能出现一次。 数字 1-9 在每一列只能出现一次。 
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。 空白格用 '.' 表示。
 * https://img-blog.csdnimg.cn/202011171912586.png
 * 一个数独。
 * https://img-blog.csdnimg.cn/20201117191340669.png
 * 答案被标成红色。
 * 
 * 提示：
 *  给定的数独序列只包含数字 1-9 和字符 '.' 。
 *  你可以假设给定的数独只有唯一解。
 *  给定数独永远是 9x9 形式的。
 * 
 * 判断棋盘是否合法有如下三个维度：
 *  同行是否重复
 *  同列是否重复
 *  9宫格里是否重复
 */

 var solveSudoku = function(board) {
    // 校验是否合理
    function isValid(row, col, val, board) {
        let len = board.length
        // 行不能重复
        for (let i = 0; i < len; i++) {
            if (board[row][i] === val) {
                return false
            }
        }
        // 列不能重复
        for (let i = 0; i < len; i++) {
            if (board[i][col] === val) {
                return false
            }
        }

        // 计算当前9宫格左上角的位置
        let startRow = Math.floor(row / 3) * 3
        let startCol = Math.floor(col / 3) * 3
        // 判断9方格里是否重复
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === val) {
                    return false
                }
            }
        }

        return true
    }

    function backTracking() {
        // 遍历行
        for (let i = 0; i < board.length; i++) {
            // 遍历列
            for (let j = 0; j < board[0].length; j++) {
                // 遇到数字跳过
                if (board[i][j] !== '.') continue

                // (i, j) 这个位置放k是否合适
                for (let val = 1; val <= 9; val++) {
                    if (isValid(i, j, `${val}`, board)) {
                        // 放置k
                        board[i][j] = `${val}`

                        // 如果找到合适一组立刻返回
                        if (backTracking()) {
                            return true
                        }
                        
                        // 回溯，撤销k
                        board[i][j] = `.`
                    }
                }

                // 9个数都试完了，都不行，那么就返回false
                return false

                // 因为如果一行一列确定下来了，这里尝试了9个数都不行，说明这个棋盘找不到解决数独问题的解！
                // 那么会直接返回， 「这也就是为什么没有终止条件也不会永远填不满棋盘而无限递归下去！」
            }
        }

        // 遍历完没有返回false，说明找到了合适棋盘位置了
        return true
    }

    backTracking(board)
    return board 
}