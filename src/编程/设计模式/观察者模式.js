/**
 * 观察者模式
 */
class Subject {
    constructor(name) {
        this.name = name
        this.state = ''
        this.observers = [];
    }
  
    attach(o) {
        this.observers.push(o)
    }
  
    setState(newState) {
        this.state = newState
        this.observers.forEach(o => o.update(this))
    }
}

class Observer {
    constructor(name) {
        this.name = name
    }

    update(s) {
        console.log(`${this.name}发现 ${s.name} ${s.state}`)
    }
}

const p = new Observer('父母')
const t = new Observer('老师')
const s = new Subject('学生')
s.attach(p)
s.attach(t)
s.setState('xxxx')