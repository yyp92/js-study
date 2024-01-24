/**
 * 题目描述：
 * 
 * 实现一个限制并发的异步调度器Scheduler，保证同时运行的任务最多2个
 * 
 * 
 * 题意解析：
 *  再看addTask执行的输出顺序，因为addTask调用是同步行为（微任务要走也得先把四次addTask跑完），所以我们可以理解为当第一个Promise准备开始执行时，pending中已经存储过4个Promise了，我们将四个Promise按它们的值来命名为P1、P2、P3、P4，现在开始模拟这个过程：
 *      由于限制器为2，所以一开始P1 P2就进入准备状态了，由于定时器的缘故，500ms更快P2先执行，因此先输出2。
 *      因为释放了P2，于是P3被通知也可以准备运行了，它的时间是300ms，P1看着是1000ms但其实已经过了500ms，但依旧比不过300ms，所以紧接着输出3，注意，此时再过200ms P1就可以执行了。
 *      限制再次被放开，P4也开始执行，前面说了此时的P1仅需200ms就能执行，而P4需要400ms，因此先输出1，最后输出4。
 * 
 * 
 * 可以参考：https://www.cnblogs.com/echolun/p/15906939.html
 */


class Scheduler {
    constructor() {
        // 记录promise的数组
        this.pending = [];
        // 限制器
        this.limit = 2;
        // 记录当前已被启动的promise
        this.count = 0;
    }
  
    add(promiseCreator) {
        // 单纯存储promise
        this.pending.push(promiseCreator);

        // 启动执行，至于能不能走run内部会控制
        this.run();
    }
  
    run() {
        // 假设pending为空，或者调用大于限制直接返回
        if (!this.pending.length || this.count >= this.limit) {
            return;
        }

        this.count++;

        this.pending
            .shift()()
            .finally(() => {
                this.count--;
                // 轮询
                this.run();
            });
    }
}



// 示例
const timeout = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

const scheduler = new Scheduler();

const addTask = (time, order) => {
    scheduler
        .add(
            () => timeout(time).then(() => console.log(order))
        )
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// output: 2 3 1 4