/**
 * 用栈实现队列
 * 
 * 使用栈实现队列的下列操作：
 *  push(x) -- 将一个元素放入队列的尾部。
 *  pop() -- 从队列首部移除元素。
 *  peek() -- 返回队列首部的元素。
 *  empty() -- 返回队列是否为空。
 * 
 * 思路：
 *  这是一道模拟题，不涉及到具体算法，考察的就是对栈和队列的掌握程度。
 *  使用栈来模拟队列的行为，如果仅仅用一个栈，是一定不行的，所以需要两个栈一个输入栈，一个输出栈，这里要注意输入栈和输出栈的关系。
 *  在push数据的时候，只要数据放进输入栈就好，但在pop的时候，操作就复杂一些，输出栈如果为空，就把进栈数据全部导入进来（注意是全部导入），再从出栈弹出数据，如果输出栈不为空，则直接从出栈弹出数据就可以了。
 *  最后如何判断队列为空呢？如果进栈和出栈都为空的话，说明模拟的队列为空了。
 */

// 使用两个数组的栈方法（push, pop） 实现队列
/**
* Initialize your data structure here.
*/
var MyQueue = function() {
    this.stackIn = [];
    this.stackOut = [];
};
 
 /**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stackIn.push(x);
};
 
 /**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    const size = this.stackOut.length;

    if (size) {
        return this.stackOut.pop();
    }

    while (this.stackIn.length) {
        this.stackOut.push(this.stackIn.pop());
    }

    return this.stackOut.pop();
};
 
/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    const x = this.pop();
    this.stackOut.push(x);
    return x;
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return !this.stackIn.length && !this.stackOut.length
};
 