/**
 * 703.数据流中的第 K 大元素
 * https://leetcode.cn/problems/kth-largest-element-in-a-stream/
 * 
 * 设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。
 * 请实现 KthLargest 类：
 * KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
 * int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。
 * 
 * 示例：
 * 输入：
 *  ["KthLargest", "add", "add", "add", "add", "add"]
 *  [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
 * 输出：[null, 4, 5, 5, 8, 8]
 * 解释：
 *  KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
 *  kthLargest.add(3);   // return 4
 *  kthLargest.add(5);   // return 5
 *  kthLargest.add(10);  // return 5
 *  kthLargest.add(9);   // return 8
 *  kthLargest.add(4);   // return 8
 * 
 * 提示：
 *  1 <= k <= 104
 *  0 <= nums.length <= 104
 *  -104 <= nums[i] <= 104
 *  -104 <= val <= 104
 *  最多调用 add 方法 104 次
 *  题目数据保证，在查找第 k 大元素时，数组中至少有 k 个元素
 */

class MinHeap {
    constructor() {
        this.data = []
    }

    size() {
        return this.data.length
    }

    compare(a, b) {
        return a - b
    }

    peek() {
        // 获取最小堆的最小值
        return this.size() === 0 ? null : this.data[0]
    }

    push(node) {
        // 添加新的元素进最小堆
        this.data.push(node)
        this.shiftUp(node, this.size() - 1)
    }

    swap(index1, index2) {
        [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]]
    }

    shiftUp(node, i) {
        let index = i

        while(index > 0) {
            const parentIndex = (index - 1) >> 1
            const parent = this.data[parentIndex]

            if (this.compare(node, parent) < 0) {
                // node < parent
                this.swap(index, parentIndex)
            }
            else {
                break
            }
        }
    }

    pop() {
        // 删除堆顶元素
        if (this.size() === 0) {
            return null
        }

        const first = this.data[0]
        const last = this.data.pop()

        if (this.size() !== 0) {
            this.data[0] = last
            this.shiftDown(last, 0)
        }
    }

    shiftDown(node, i) {
        let index = i
        const length = this.size()
        const halfLength = length >> 1

        while(index < halfLength) {
            const leftIndex = (index + 1) * 2 - 1
            const rightIndex = leftIndex + 1
            const left = this.data[leftIndex]
            const right = this.data[rightIndex]

            if (this.compare(left, node) < 0) {
                // left < node
                // ?right left

                if (rightIndex < length && this.compare(right, left) < 0) {
                    // right最小
                    this.swap(rightIndex, index)
                    index = rightIndex
                }
                else {
                    // left最小
                    this.swap(leftIndex, index)
                    index = leftIndex
                }
            }
            else if (rightIndex < length && this.compare(right, node) < 0) { 
                // right最小
                this.swap(rightIndex, index)
                index = rightIndex
            }
            else {
                // 根节点最小
                break
            }
        }
    }
}

var KthLargest = function (k, nums) {
    this.k = k

    // 这个最小堆只有k个元素
    this.heap = new MinHeap()

    for (const node of nums) {
        this.add(node)
    }
}

KthLargest.prototype.add = function (val) {
    this.heap.push(val)

    if (this.heap.size() > this.k) {
        this.heap.pop()
    }

    // k个元素
    return this.heap.peek()
}