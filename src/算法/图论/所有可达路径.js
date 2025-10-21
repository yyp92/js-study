/**
 * * 所有可达路径
 * 
 * https://kamacoder.com/problempage.php?pid=1170
 * [797. 所有可能的路径](https://leetcode.cn/problems/all-paths-from-source-to-target/description/)
 * 
 * 【题目描述】: 
 *      给定一个有 n 个节点的有向无环图，节点编号从 1 到 n。请编写一个程序，找出并返回所有从节点 1 到节点 n 的路径。每条路径应以节点编号的列表形式表示。
 * 
 * 【输入描述】:
 *      第一行包含两个整数 N，M，表示图中拥有 N 个节点，M 条边
 *      后续 M 行，每行包含两个整数 s 和 t，表示图中的 s 节点与 t 节点中有一条路径
 * 
 * 【输出描述】:
 *      输出所有的可达路径，路径中所有节点的后面跟一个空格，每条路径独占一行，存在多条路径，路径输出的顺序可任意。
 *      如果不存在任何一条路径，则输出 -1。
 * 
 * 注意输出的序列中，最后一个节点后面没有空格！ 例如正确的答案是 1 3 5,而不是 1 3 5 ， 5后面没有空格！
 * 
 * 【输入示例】:
 *      5 5
 *      1 3
 *      3 5
 *      1 2
 *      2 4
 *      4 5
 * 
 * 【输出示例】:
 *      1 3 5
 *      1 2 4 5 
 * 
 * 提示信息: 
 *      https://file1.kamacoder.com/i/algo/20240514103953.png
 * 
 * 用例解释：
 *      有五个节点，其中的从 1 到达 5 的路径有两个，分别是 1 -> 3 -> 5 和 1 -> 2 -> 4 -> 5。
 * 
 * 数据范围：
 *      图中不存在自环
 *      图中不存在平行边
 *      1 <= N <= 100
 *      1 <= M <= 500
 */

// * 读取 ACM模式 输入值
/**
 * 1. 引入 Node.js 内置的 readline 模块（用于处理命令行输入输出的交互）；
 * 2. 调用 createInterface() 创建输入交互接口 r1；
 * 3. 配置 input: process.stdin，指定输入源为「标准输入」（即用户在命令行的键盘输入）。
 */
const r1 = require('readline').createInterface({ input: process.stdin });
/**
 * * 创建readline接口
 *  1. readline.Interface 实例（即 r1）内置了 异步迭代器 接口，通过 Symbol.asyncIterator 这个特殊符号可以获取迭代器对象 iter；
 *  2. 异步迭代器的核心作用是：用 for await...of 循环或 next() 方法，异步获取输入流中的每一行数据（避免阻塞主线程）。
 */
let iter = r1[Symbol.asyncIterator]();
/**
 * * 创建异步迭代器
 *  1. 调用异步迭代器的 iter.next() 方法：该方法返回一个 Promise， resolve 结果是包含 { value: 输入内容, done: 是否结束 } 的对象；
 *  2. await iter.next() 等待 Promise 完成，再通过 .value 提取输入的具体内容（即用户输入的一行文本，会自动去除末尾的换行符 \n）。
 */
const myReadline = async () => (await iter.next()).value;



// * 邻接矩阵写法
// 图
let graph;
// N 个节点
let N;
// M 条边
let M;
// 收集符合条件的路径
let result = [];
// 1节点到终点的路径
let path = [];

// 创建邻接矩阵，初始化邻接矩阵
async function initGraph() {
    let line;

    line = await myReadline();
    [N, M] = line.split(' ').map(i => parseInt(i))
    // 创建 N + 1 的二维数组
    graph = new Array(N + 1).fill(0).map(() => new Array(N + 1).fill(0))
    
    // 使用邻接矩阵 表示无线图，1 表示 s 与 t 是相连的
    while(M--) {
        line = await myReadline()

        const strArr = line
            ? line.split(' ').map(i => parseInt(i))
            : undefined

        strArr
            // s: strArr[0],  t: strArr[1]
            ? graph[strArr[0]][strArr[1]] = 1
            : null
    }
}

/**
 * * 深度搜索
 * @param {*} graph 存当前的图
 * @param {*} x 目前遍历的节点
 * @param {*} n 终点
 */
function dfs(graph, x,  n){
    // 当前遍历节点为x， 到达节点为n
    if (x == n) {
        result.push([...path])
        return
    }

    for (let i = 1; i <= n; i++) {
        if (graph[x][i] == 1) {
            path.push(i)
            dfs(graph, i, n)
            path.pop(i)
        }
    }
}

const handleResult = async function() {
    // 创建邻接矩阵，初始化邻接矩阵
    await initGraph();

    // 从节点1开始深度搜索
    path.push(1);

    // 深度搜索
    dfs(graph, 1, N)

    // 输出
    if (result.length > 0) {
        result.forEach(i => {
            console.log(i.join(' '))
        })
    }
    else {
        console.log(-1)
    }
}
handleResult()



// * 邻接表写法
// 图
let graph1;
// N1 个节点
let N1;
// M1 条边
let M1;
// 收集符合条件的路径
let result1 = [];
// 1节点到终点的路径
let path1 = [];

// 创建邻接表，初始化邻接表
async function initGraph1() {
    let line;
    line = await myReadline();
    [N1, M1] = line.split(' ').map(i => parseInt(i))
    graph1 = new Array(N1 + 1).fill(0).map(() => new Array())

    while (line = await myReadline()) {
        const strArr = line.split(' ').map(i => parseInt(i))
        strArr ? graph1[strArr[0]].push(strArr[1]) : null
    }
}

// 深度搜索
async function dfs(graph, x, n) {
    // 当前遍历节点为x， 到达节点为n
    if (x == n) {
        result1.push([...path1])
        return
    }

    graph[x].forEach(i => {
        path1.push(i)
        dfs(graph, i, n)
        path1.pop(i)
    })
}

const handleResult1 = async function() {
    // 创建邻接矩阵，初始化邻接矩阵
    await initGraph1();

    // 从节点1开始深度搜索
    path1.push(1);

    // 深度搜索
    dfs(graph1, 1, N1)

    // 输出
    if (result1.length > 0) {
        result1.forEach(i => {
            console.log(i.join(' '))
        })
    }
    else {
        console.log(-1)
    }
}
handleResult1()

