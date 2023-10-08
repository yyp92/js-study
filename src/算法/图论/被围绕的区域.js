/**
 * 被围绕的区域
 * 
 * https://leetcode.cn/problems/surrounded-regions/
 * 
 * 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20220901104745.png
 * 输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
 * 输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
 * 解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
 */

const solveDfs = function (board) {
    // 保存四个方向
    let dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 
    let n = board.length
    let m = board[0].length
    
    let dfs = (board, x, y) => {
        board[x][y] = 'A';

        // 向四个方向遍历
        for (let i = 0; i < 4; i++) {
            let nextX = x + dir[i][0]
            let nextY = y + dir[i][1]

            // 越界了，直接跳过
            if (nextX < 0 || nextX >= board.length || nextY < 0 || nextY >= board[0].length) {
                continue;
            }

            // 不符合条件，不继续遍历
            if (board[nextX][nextY] === 'X' || board[nextX][nextY] === 'A') {
                continue;
            }

            dfs(board, nextX, nextY);
        }

        return
    }


    /**
     * 步骤一：
     */
    // 从左侧边，和右侧边 向中间遍历
    for (let i = 0; i < n; i++) {
        if (board[i][0] === 'O') {
            dfs(board, i, 0);
        }

        if (board[i][m - 1] === 'O') {
            dfs(board, i, m - 1);
        }
    }

    // 从上边和下边 向中间遍历
    for (let j = 0; j < m; j++) {
        if (board[0][j] === 'O') {
            dfs(board, 0, j);
        }

        if (board[n - 1][j] === 'O') {
            dfs(board, n - 1, j);
        }
    }

    /**
     * 步骤二：
     */
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X';
            }
            
            if (board[i][j] === 'A') {
                board[i][j] = 'O';
            }
        }
    }

    return board
};

const solveBfs = (board) => {
    // 保存四个方向
    let dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 
    let n = board.length
    let m = board[0].length

    let bfs = (board, x, y) => {
        let queue = [];
        queue.push([x, y]);
        // 只要加入队列，立刻标记
        board[x][y] = 'A'; 

        while(queue.length) {
            // 取出队列头部元素
            let top = queue.shift();

            // 因为是四个方向，所以为4
            for (let i = 0; i < 4; i++) {
                let nextX = top[0] + dir[i][0]
                let nextY = top[1] + dir[i][1]

                // 越界了，直接跳过
                if (nextX < 0 || nextX >= board.length || nextY < 0 || nextY >= board[0].length) {
                    continue;
                }

                // 不符合条件，不继续遍历
                if (board[nextX][nextY] !== 'O') {
                    continue;
                }

                queue.push([nextX, nextY]);
            }
        }
    }


    /**
     * 步骤一：
     */
    // 从左侧边，和右侧边 向中间遍历
    for (let i = 0; i < n; i++) {
        if (board[i][0] === 'O') {
            bfs(board, i, 0);
        }

        if (board[i][m - 1] === 'O') {
            bfs(board, i, m - 1);
        }
    }

    // 从上边和下边 向中间遍历
    for (let j = 0; j < m; j++) {
        if (board[0][j] === 'O') {
            bfs(board, 0, j);
        }

        if (board[n - 1][j] === 'O') {
            bfs(board, n - 1, j);
        }
    }


    /**
     * 步骤二：
     */
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X';
            }
            
            if (board[i][j] === 'A') {
                board[i][j] = 'O';
            }
        }
    }

    return board
}




// 测试
const board = [
    ["X", "X", "X", "X"],
    ["X", "O", "O", "X"],
    ["X", "X", "O", "X"],
    ["X", "O", "X", "X"]
]

// console.log(solveDfs(board))
console.log(solveBfs(board))
