/**
 * * 孤岛的总面积
 * https://kamacoder.com/problempage.php?pid=1173
 * 
 * 题目描述:
 *      给定一个由 1（陆地）和 0（水）组成的矩阵，岛屿指的是由水平或垂直方向上相邻的陆地单元格组成的区域，且完全被水域单元格包围。孤岛是那些位于矩阵内部、所有单元格都不接触边缘的岛屿。
 *      现在你需要计算所有孤岛的总面积，岛屿面积的计算方式为组成岛屿的陆地的总数。
 * 
 * 输入描述:
 *      第一行包含两个整数 N, M，表示矩阵的行数和列数。之后 N 行，每行包含 M 个数字，数字为 1 或者 0。
 * 
 * 输出描述:
 *      输出一个整数，表示所有孤岛的总面积，如果不存在孤岛，则输出 0。
 * 
 * 输入示例:
 *      4 5
 *      1 1 0 0 0
 *      1 1 0 0 0
 *      0 0 1 0 0
 *      0 0 0 1 1
 * 
 * 输出示例：
 *      1
 * 
 * 提示信息：
 *      http://file1.kamacoder.com/i/algo/20240517105557.png
 *      在矩阵中心部分的岛屿，因为没有任何一个单元格接触到矩阵边缘，所以该岛屿属于孤岛，总面积为 1。
 * 
 * 数据范围：
 *      1 <= M, N <= 50。
 * 
 * 
 * 题解：
 *      本题要求找到不靠边的陆地面积，那么我们只要从周边找到陆地然后 通过 dfs或者bfs 将周边靠陆地且相邻的陆地都变成海洋，然后再去重新遍历地图 统计此时还剩下的陆地就可以了。
 */

const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

// 地图
let graph
// 地图大小
let N, M
// 孤岛的总面积
let count = 0
// 方向
const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]]

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
    // 不符合条件
    if (graph[x][y] === 0) return

    // 标记为海洋
    graph[x][y] = 0

    // 向四个方向遍历
    for (let i = 0; i < 4; i++) {
        let nextx = x + dir[i][0]
        let nexty = y + dir[i][1]

        // 超过边界
        if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue

        dfs(graph, nextx, nexty)
    }
}

(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 遍历地图左右两边
    for (let i = 0; i < N; i++) {
        if (graph[i][0] === 1) dfs(graph, i, 0)

        if (graph[i][M - 1] === 1) dfs(graph, i, M - 1)
    }

    // 遍历地图上下两边
    for (let j = 0; j < M; j++) {
        if (graph[0][j] === 1) dfs(graph, 0, j)

        if (graph[N - 1][j] === 1) dfs(graph, N - 1, j)
    }

    count = 0
    // 统计孤岛的总面积
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (graph[i][j] === 1) count++
        }
    }
    console.log(count);
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
    // 只要加入队列，立刻标记
    graph[x][y] = 0 

    while (queue.length) {
        let [xx, yy] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nextx = xx + dir[i][0]
            let nexty = yy + dir[i][1]

            // 超过边界
            if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue

            if (graph[nextx][nexty] === 1) {
                queue.push([nextx, nexty])

                // 只要加入队列，立刻标记
                graph[nextx][nexty] = 0 
            }
        }
    }

}

(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 遍历地图左右两边
    for (let i = 0; i < N; i++) {
        if (graph[i][0] === 1) bfs(graph, i, 0)

        if (graph[i][M - 1] === 1) bfs(graph, i, M - 1)
    }

    // 遍历地图上下两边
    for (let j = 0; j < M; j++) {
        if (graph[0][j] === 1) bfs(graph, 0, j)

        if (graph[N - 1][j] === 1) bfs(graph, N - 1, j)
    }

    count = 0
    // 统计孤岛的总面积
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (graph[i][j] === 1) count++
        }
    }

    console.log(count)
})()
