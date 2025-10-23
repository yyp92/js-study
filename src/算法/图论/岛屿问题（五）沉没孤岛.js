/**
 * * 沉没孤岛
 * https://kamacoder.com/problempage.php?pid=1174
 * 
 * 题目描述：
 *      给定一个由 1（陆地）和 0（水）组成的矩阵，岛屿指的是由水平或垂直方向上相邻的陆地单元格组成的区域，且完全被水域单元格包围。孤岛是那些位于矩阵内部、所有单元格都不接触边缘的岛屿。
 *      现在你需要将所有孤岛“沉没”，即将孤岛中的所有陆地单元格（1）转变为水域单元格（0）。
 * 
 * 输入描述：
 *      第一行包含两个整数 N, M，表示矩阵的行数和列数。
 *      之后 N 行，每行包含 M 个数字，数字为 1 或者 0，表示岛屿的单元格。
 * 
 * 输出描述：
 *      输出将孤岛“沉没”之后的岛屿矩阵。
 * 
 * 输入示例:
 *      4 5
 *      1 1 0 0 0
 *      1 1 0 0 0
 *      0 0 1 0 0
 *      0 0 0 1 1
 * 
 * 输出示例:
 *      1 1 0 0 0
 *      1 1 0 0 0
 *      0 0 0 0 0
 *      0 0 0 1 1
 * 
 * 提示信息：
 *      https://file1.kamacoder.com/i/algo/20240517110932.png
 * 
 * 将孤岛沉没：
 *      https://file1.kamacoder.com/i/algo/20240517110953.png
 * 
 * 数据范围：
 *      1 <= M, N <= 50
 * 
 * 
 * 思路：
 *      步骤一：深搜或者广搜将地图周边的 1 （陆地）全部改成 2 （特殊标记）
 *      步骤二：将水域中间 1 （陆地）全部改成 水域（0）
 *      步骤三：将之前标记的 2 改为 1 （陆地）
 *      如图：https://file1.kamacoder.com/i/algo/20240517113813.png  
 **/

const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

// 地图
let graph
// 地图大小
let N, M
const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]] //方向

// 读取输入，初始化地图
const initGraph = async () => {
    let line = await readline();
    [N, M] = line.split(' ').map(Number);
    graph = new Array(N).fill(0).map(() => new Array(M).fill(0))

    for (let i = 0; i < N; i++) {
        line = await readline()
        line = line.split(' ').map(Number)

        for (let j = 0; j < M; j++) {
            graph[i][j] = line[j]
        }
    }
}



/**
 * * 深搜版
 * @description: 从（x，y）开始深度优先遍历地图
 * @param {*} graph 地图
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const dfs = (graph, x, y) => {
    if (graph[x][y] !== 1) return

    // 标记为非孤岛陆地
    graph[x][y] = 2

    for (let i = 0; i < 4; i++) {
        let nextx = x + dir[i][0]
        let nexty = y + dir[i][1]

        // 超过边界
        if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) {
            continue
        }

        dfs(graph, nextx, nexty)
    }
}

(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 遍历地图左右两边
    for (let i = 0; i < N; i++) {
        if (graph[i][0] === 1) {
            dfs(graph, i, 0)
        }

        if (graph[i][M - 1] === 1) {
            dfs(graph, i, M - 1)
        }
    }

    // 遍历地图上下两边
    for (let j = 0; j < M; j++) {
        if (graph[0][j] === 1) {
            dfs(graph, 0, j)
        }

        if (graph[N - 1][j] === 1) {
            dfs(graph, N - 1, j)
        }
    }


    // 遍历地图，将孤岛沉没，即将陆地1标记为0；将非孤岛陆地2标记为1
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (graph[i][j] === 1) {
                graph[i][j] = 0
            }
            else if (graph[i][j] === 2) {
                graph[i][j] = 1
            }
        }

        console.log(graph[i].join(' '))
    }
})()




/**
 * * 广搜版
 * @description: 从（x，y）开始广度优先遍历地图
 * @param {*} graph 地图
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const bfs = (graph, x, y) => {
    let queue = []
    queue.push([x, y])
    // 标记为非孤岛陆地
    graph[x][y] = 2 

    while (queue.length) {
        let [xx, yy] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nextx = xx + dir[i][0]
            let nexty = yy + dir[i][1]

            if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) {
                continue
            }

            if (graph[nextx][nexty] === 1) {
                bfs(graph, nextx, nexty)
            }
        }
    }
}

(async function () {

    // 读取输入，初始化地图
    await initGraph()

    // 遍历地图左右两边
    for (let i = 0; i < N; i++) {
        if (graph[i][0] === 1) {
            bfs(graph, i, 0)
        }

        if (graph[i][M - 1] === 1) {
            bfs(graph, i, M - 1)
        }
    }

    // 遍历地图上下两边
    for (let j = 0; j < M; j++) {
        if (graph[0][j] === 1) {
            bfs(graph, 0, j)
        }

        if (graph[N - 1][j] === 1) {
            bfs(graph, N - 1, j)
        }
    }


    // 遍历地图，将孤岛沉没，即将陆地1标记为0；将非孤岛陆地2标记为1
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (graph[i][j] === 1) {
                graph[i][j] = 0
            }
            else if (graph[i][j] === 2) {
                graph[i][j] = 1
            }
        }

        console.log(graph[i].join(' '));
    }
})()
