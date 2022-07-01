/**
 * 前 K 个高频元素
 * @TODO: 待理解
 * 
 * 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
 * 
 * 示例 1:
 *  输入: nums = [1,1,1,2,2,3], k = 2
 *  输出: [1,2]
 * 
 * 示例 2:
 *  输入: nums = [1], k = 1
 *  输出: [1]
 * 
 * 提示：
 *  你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
 *  你的算法的时间复杂度必须优于 $O(n \log n)$ , n 是数组的大小。
 *  题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
 *  你可以按任意顺序返回答案。
 */
  
function PriorityQueue(compareFn) {
    this.compareFn = compareFn;
    this.queue = [];
}
  
// 添加
PriorityQueue.prototype.push = function(item) {
    this.queue.push(item);
    let index = this.queue.length - 1;
    let parent = Math.floor((index - 1) / 2);

    // 上浮
    while(parent >= 0 && this.compare(parent, index) > 0) {
        // 交换
        [this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]];
        index = parent;
        parent = Math.floor((index - 1) / 2);
    }
}
  
// 获取堆顶元素并移除
PriorityQueue.prototype.pop = function() {
    const ret = this.queue[0];

    // 把最后一个节点移到堆顶
    this.queue[0] = this.queue.pop();

    let index = 0;
    // 左子节点下标，left + 1 就是右子节点下标
    let left = 1;
    let selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left;

    // 下沉
    while(selectedChild !== undefined && this.compare(index, selectedChild) > 0) {
        // 交换
        [this.queue[index], this.queue[selectedChild]] = [this.queue[selectedChild], this.queue[index]];
        index = selectedChild;
        left = 2 * index + 1;
        selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left;
    }

    return ret;
}

PriorityQueue.prototype.size = function() {
    return this.queue.length;
}
  
// 使用传入的 compareFn 比较两个位置的元素
PriorityQueue.prototype.compare = function(index1, index2) {
    if (this.queue[index1] === undefined) {
        return 1;
    }

    if (this.queue[index2] === undefined) {
        return -1;
    }

    return this.compareFn(this.queue[index1], this.queue[index2]);
}

const topKFrequent = function(nums, k) {
    const map = new Map();
    
    for (const num of nums) {
      map.set(num, (map.get(num) || 0) + 1);
    }
  
    // 创建小顶堆
    const priorityQueue = new PriorityQueue((a, b) => a[1] - b[1]);
  
    // entry 是一个长度为2的数组，0位置存储key，1位置存储value
    for (const entry of map.entries()) {
        priorityQueue.push(entry);

        if (priorityQueue.size() > k) {
            priorityQueue.pop();
        }
    }
  
    const ret = [];
  
    for(let i = priorityQueue.size() - 1; i >= 0; i--) {
        ret[i] = priorityQueue.pop()[0];
    }
  
    return ret;
};


// 测试
const nums = [1,1,1,2,2,3], k = 2 // [1,2]
const nums1 = [1], k1 = 1 // [1]
console.log(topKFrequent(nums, k))
console.log(topKFrequent(nums1, k1))