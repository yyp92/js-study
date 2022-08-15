/**
 * 发布订阅模式
 * 
 * on 注册
 * emit 触发
 * once 仅生效一次
 * off 销毁
 */
class EventBus {
    constructor() {
        this.events = {}
    }
  
    on(type, fn) {
        if (!this.events[type]) {
            this.events[type] = []
        }
        this.events[type].push(fn)

        return this
    }
  
    off(type, fn) {
        if (!fn) {
            this.events[type] = null
        }
        else {
            this.events[type] = this.events[type].filter(item => item !== fn)
        }
        
        return fn
    }
  
    emit(type, ...args) {
        const fns = this.events[type]
        if (!fns) {
            console.log('无此类型事件')
        }
        else {
            fns.forEach(fn => fn.apply(this, args))
        }

        return this
    }
  
    once(type, fn) {
        const func = (...args) => {
            this.off(type, func)
            fn.apply(this, args)
        }
        this.on(type, func)

        return this
    }
}
  

// 测试
const eb = new EventBus()
eb.on('a', (a) => {
    console.log(a)
}).on('b', (b) => {
    console.log(b)
}).once('c', (c) => {
    console.log(c)
}).emit('a', 'a').emit('b', 'b').emit('b', 'b').emit('c', 'c').emit('c', 'c')
