/**
 * todo 所有可达路径
 * 
 * https://kamacoder.com/problempage.php?pid=1170
 */

const allRoutes = () => {
    // 收集符合条件的路径
    const result = []
    // 1节点到终点的路径
    const path = []

    let n = 5

    // 当前遍历的节点x 到达节点n 
    const dfs = (graph, x, n) => {
        
        // 找到符合条件的一条路径
        if (x == n) { 
            result.push(path);
            return;
        }

        // 遍历节点x链接的所有节点
        for (let i = 1; i <= n; i++) { 
            // 找到 x链接的节点
            if (graph[x][i] == 1) { 
                // 遍历到的节点加入到路径中来
                path.push(i); 

                // 进入下一层递归
                dfs(graph, i, n); 

                // 回溯，撤销本节点
                path.pop(); 
            }
        }
    }

    const list = new Array(n + 1).fill(() => new Array(n + 1).fill(0))
}
