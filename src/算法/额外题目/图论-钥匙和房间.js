/**
 * 841.钥匙和房间
 * https://leetcode.cn/problems/keys-and-rooms/
 * 
 * 有 N 个房间，开始时你位于 0 号房间。每个房间有不同的号码：0，1，2，...，N-1，并且房间里可能有一些钥匙能使你进入下一个房间。
 * 在形式上，对于每个房间 i 都有一个钥匙列表 rooms[i]，每个钥匙 rooms[i][j] 由 [0,1，...，N-1] 中的一个整数表示，其中 N = rooms.length。 钥匙 rooms[i][j] = v 可以打开编号为 v 的房间。
 * 最初，除 0 号房间外的其余所有房间都被锁住。
 * 你可以自由地在房间之间来回走动。
 * 如果能进入每个房间返回 true，否则返回 false。
 * 
 * 示例 1：
 *  输入: [[1],[2],[3],[]]
 *  输出: true
 *  解释: 我们从 0 号房间开始，拿到钥匙 1。 之后我们去 1 号房间，拿到钥匙 2。 然后我们去 2 号房间，拿到钥匙 3。 最后我们去了 3 号房间。 由于我们能够进入每个房间，我们返回 true。
 * 
 * 示例 2：
 *  输入：[[1,3],[3,0,1],[2],[0]]
 *  输出：false
 *  解释：我们不能进入 2 号房间。
 */

// DFS
var canVisitAllRooms = function(rooms) {
    const visited = new Array(rooms.length).fill(false);

    const dfs = (key, rooms, visited) => {
        if (visited[key]) return;
        visited[key] = 1;
        
        for (let k of rooms[key]) {
            // 深度优先搜索遍历
            dfs(k, rooms, visited);
        }
    }

    
    dfs(0, rooms, visited);

    // 检查是否都访问到了
    for (let i of visited) {
        if (!i) {
            return false;
        }
    }

    return true;
};

// BFS
var canVisitAllRooms1 = function(rooms) {
    const bfs = rooms => {
        // 标记房间是否被访问过
        const visited = new Array(rooms.length).fill(0); 
        // 0 号房间开始
        visited[0] = 1; 
        // js数组作为队列使用
        const queue = []; 
        // 0 号房间开始
        queue.push(0); 

        // 广度优先搜索的过程
        while(queue.length !== 0) {
            let key = queue[0];
            queue.shift();

            for (let k of rooms[key]) {
                if (!visited[k]) {
                    queue.push(k);
                    visited[k] = 1;
                }
            }
        }

        // 检查房间是不是都遍历过了
        for (let i of visited) {
            if (i === 0) return false;
        }

        return true;
    }

    return bfs(rooms);
};


// 测试
const arr1 = [[1],[2],[3],[]]
const arr2 = [[1,3],[3,0,1],[2],[0]]
console.log(canVisitAllRooms(arr1))
console.log(canVisitAllRooms(arr2))
console.log(canVisitAllRooms1(arr1))
console.log(canVisitAllRooms1(arr2))