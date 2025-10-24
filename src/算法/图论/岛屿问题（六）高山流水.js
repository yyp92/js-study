/**
 * * 水流问题
 * https://kamacoder.com/problempage.php?pid=1175
 * 
 * 题目描述：
 *      现有一个 N × M 的矩阵，每个单元格包含一个数值，这个数值代表该位置的相对高度。矩阵的左边界和上边界被认为是第一组边界，而矩阵的右边界和下边界被视为第二组边界。
 *      矩阵模拟了一个地形，当雨水落在上面时，水会根据地形的倾斜向低处流动，但只能从较高或等高的地点流向较低或等高并且相邻（上下左右方向）的地点。我们的目标是确定那些单元格，从这些单元格出发的水可以达到第一组边界和第二组边界。
 * 
 * 输入描述：
 *      第一行包含两个整数 N 和 M，分别表示矩阵的行数和列数。
 *      后续 N 行，每行包含 M 个整数，表示矩阵中的每个单元格的高度。
 * 
 * 输出描述：
 *      输出共有多行，每行输出两个整数，用一个空格隔开，表示可达第一组边界和第二组边界的单元格的坐标，输出顺序任意。
 * 
 * 输入示例：
 *      5 5
 *      1 3 1 2 4
 *      1 2 1 3 2
 *      2 4 7 2 1
 *      4 5 6 1 1
 *      1 4 1 2 1
 * 
 * 输出示例：
 *      0 4
 *      1 3
 *      2 2
 *      3 0
 *      3 1
 *      3 2
 *      4 0
 *      4 1
 * 
 * 提示信息：
 *      http://file1.kamacoder.com/i/algo/20240517115816.png
 *      图中的蓝色方块上的雨水既能流向第一组边界，也能流向第二组边界。所以最终答案为所有蓝色方块的坐标。
 * 
 * 数据范围：
 *      1 <= M, N <= 50
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
 * * 深搜版：其实就是 遍历每个点，然后看这个点 能不能同时到达第一组边界和第二组边界。
 * @description: 从（x，y）开始深度优先遍历地图
 * @param {*} graph 地图
 * @param {*} visited 可访问节点
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const dfs = (graph, visited, x, y) => {
    if (visited[x][y]) return

    // 标记为可访问
    visited[x][y] = true

    for (let i = 0; i < 4; i++) {
        let nextx = x + dir[i][0]
        let nexty = y + dir[i][1]

        // 越界,跳过
        if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) {
            continue
        }

        // 不能流过.跳过
        if (graph[x][y] < graph[nextx][nexty]) {
            continue
        }

        dfs(graph, visited, nextx, nexty)
    }
}

/**
 * @description: 判断地图上的(x, y)是否可以到达第一组边界和第二组边界
 * @param {*} x 坐标
 * @param {*} y 坐标
 * @return {*} true可以到达，false不可以到达
 */
const isResult = (x, y) => {
    let visited = new Array(N).fill(false).map(() => new Array(M).fill(false))

    // 是否可到达第一边界
    let isFirst = false
    // 是否可到达第二边界
    let isSecond = false

    // 深搜，将(x, y)可到达的所有节点做标记
    dfs(graph, visited, x, y)

    // 判断能否到第一边界左边
    for (let i = 0; i < N; i++) {
        if (visited[i][0]) {
            isFirst = true
            break
        }
    }

    // 判断能否到第一边界上边
    for (let j = 0; j < M; j++) {
        if (visited[0][j]) {
            isFirst = true
            break
        }
    }

    // 判断能否到第二边界右边
    for (let i = 0; i < N; i++) {
        if (visited[i][M - 1]) {
            isSecond = true
            break
        }
    }

    // 判断能否到第二边界下边
    for (let j = 0; j < M; j++) {
        if (visited[N - 1][j]) {
            isSecond = true
            break
        }
    }

    return isFirst && isSecond
}

(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 遍历地图，判断是否能到达第一组边界和第二组边界
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (isResult(i, j)) {
                console.log(i + ' ' + j);
            }
        }
    }
})()




/**
 * * 广搜 - 解法一：遍历每个点，然后看这个点 能不能同时到达第一组边界和第二组边界
 * @description: 从（x，y）开始广度优先遍历地图
 * @param {*} graph 地图
 * @param {*} visited 可访问节点
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const bfs = (graph, visited, x, y) => {
    let queue = []
    queue.push([x, y])
    visited[x][y] = true

    while (queue.length) {
        const [xx, yy] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nextx = xx + dir[i][0]
            let nexty = yy + dir[i][1]

            // 越界, 跳过
            if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) {
                continue
            }

            // 可访问或者不能流过, 跳过 (注意这里是graph[xx][yy] < graph[nextx][nexty], 不是graph[x][y] < graph[nextx][nexty])
            if (visited[nextx][nexty] || graph[xx][yy] < graph[nextx][nexty]) {
                continue
            }

            queue.push([nextx, nexty])
            visited[nextx][nexty] = true
        }
    }
}

/**
 * @description: 判断地图上的(x, y)是否可以到达第一组边界和第二组边界
 * @param {*} x 坐标
 * @param {*} y 坐标
 * @return {*} true可以到达，false不可以到达
 */
const isResult1 = (x, y) => {
    let visited = new Array(N).fill(false).map(() => new Array(M).fill(false))

    // 是否可到达第一边界
    let isFirst = false
    // 是否可到达第二边界 
    let isSecond = false

    // 深搜，将(x, y)可到达的所有节点做标记
    bfs(graph, visited, x, y)

    // 判断能否到第一边界左边
    for (let i = 0; i < N; i++) {
        if (visited[i][0]) {
            isFirst = true
            break
        }
    }

    // 判断能否到第一边界上边
    for (let j = 0; j < M; j++) {
        if (visited[0][j]) {
            isFirst = true
            break
        }
    }

    // 判断能否到第二边界右边
    for (let i = 0; i < N; i++) {
        if (visited[i][M - 1]) {
            isSecond = true
            break
        }
    }

    // 判断能否到第二边界下边
    for (let j = 0; j < M; j++) {
        if (visited[N - 1][j]) {
            isSecond = true
            break
        }
    }

    return isFirst && isSecond
}

(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 遍历地图，判断是否能到达第一组边界和第二组边界
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (isResult1(i, j)) {
                console.log(i + ' ' + j)
            }
        }
    }
})()



/**
 * * 广搜 - 解法一：从第一边界和第二边界开始向高处流, 标记可以流到的位置, 两个边界都能到达的位置就是所求结果
 * @description: 从（x，y）开始广度优先遍历地图
 * @param {*} graph 地图
 * @param {*} visited 可访问节点
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const bfs1 = (graph, visited, x, y) => {
    if (visited[x][y]) {
        return
    }

    let queue = []
    queue.push([x, y])
    visited[x][y] = true

    while (queue.length) {
        const [xx, yy] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nextx = xx + dir[i][0]
            let nexty = yy + dir[i][1]

            // 越界, 跳过
            if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) {
                continue 
            }

            // 可访问或者不能流过, 跳过 (注意因为是从边界往高处流, 所以这里是graph[xx][yy] >= graph[nextx][nexty], 还要注意不是graph[xx][yy] >= graph[nextx][nexty])
            if (visited[nextx][nexty] || graph[xx][yy] >= graph[nextx][nexty]) {
                continue
            }

            queue.push([nextx, nexty])
            visited[nextx][nexty] = true
        }
    }
}

(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 记录第一边界可到达的节点
    let firstBorder = new Array(N).fill(false).map(() => new Array(M).fill(false))

    // 记录第二边界可到达的节点
    let secondBorder = new Array(N).fill(false).map(() => new Array(M).fill(false))

    // 第一边界左边和第二边界右边
    for (let i = 0; i < N; i++) {
        bfs1(graph, firstBorder, i, 0)
        bfs1(graph, secondBorder, i, M - 1)
    }

    // 第一边界上边和第二边界下边
    for (let j = 0; j < M; j++) {
        bfs1(graph, firstBorder, 0, j)
        bfs1(graph, secondBorder, N - 1, j)
    }

    // 遍历地图，判断是否能到达第一组边界和第二组边界
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (firstBorder[i][j] && secondBorder[i][j]) {
                console.log(i + ' ' + j)
            }
        }
    }
})()
