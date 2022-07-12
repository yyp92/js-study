/**
 * 链式调用
 * 
 * return this
 */
class LazyMan {
    constructor(name) {
        this.cb = []
        console.log(`懒汉->${name}`)

        setTimeout(() => {
            this.next()
        })
    }
    
    sleep(time) {
        this.cb.push(() => {
            setTimeout(() => {
                console.log(`睡 --> ${time}s`)
                this.next()
            }, time * 1000)
        })

        return this
    }
  
    sleepFirst(time) {
        this.cb.unshift(() => {
            setTimeout(() => {
                console.log(`先睡 --> ${time}s`)
                this.next()
            }, time * 1000)
        })

        return this
    }
  
    eat(time) {
        this.cb.push(() => {
            setTimeout(() => {
                console.log(`吃 --> ${time}s`)
                this.next()
            }, time * 1000)
        })

        return this
    }
  
    drink(time) {
        this.cb.push(() => {
            setTimeout(() => {
                console.log(`喝 --> ${time}s`)
                this.next()
            }, time * 1000)
        })

        return this
    }
  
    next() {
        const fn = this.cb.shift()
        fn && fn()
    }
  }
  
  const lz = new LazyMan('sf')
  lz.eat(2).sleep(1).sleepFirst(5).drink(3)