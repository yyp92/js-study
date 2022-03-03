/**
 * hook：单向链表
 * bilibili: https://www.bilibili.com/video/BV1iV411b7L1?from=search&seid=5067182654539245628&spm_id_from=333.337.0.0
 */

let isMount = true
// 指向当前hook的指针
let workInProgressHook = null

const fiber = {
    stateNode: App,
    // 链表结构
    memoizedState: null
}

function useState(initialState) {
    let hook

    if (isMount) {
        hook = {
            memoizedState: initialState,
            next: null,
            // 来保存将要更新的数据
            queue: {
                // 环状链表
                pending: null
            }
        }

        // 第一个hook
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook
        }
        // 之后的hook
        else {
            workInProgressHook.next = hook
        }

        workInProgressHook = hook 
    }
    else {
        hook = workInProgressHook
        workInProgressHook = workInProgressHook.next
    }

    let baseState = hook.memoizedState

    // 本次更新有新的update
    if (hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next

        // 遍历链表
        do {
            const action = firstUpdate.action
            baseState = action(baseState)
            firstUpdate = firstUpdate.next
        }
        while(firstUpdate !== hook.queue.pending.next) 

        hook.queue.pending = null
    }

    // memoizedState复制成新的memoizedState
    hook.memoizedState = baseState

    return [baseState, dispatchAction.bind(null, hook.queue)]
}

function dispatchAction(queue, action) {
    // 双向链表(环装链表)
    const update = {
        action,
        next: null
    }

    if (queue.pending === null) {
        // u0 -> u0 -> u0
        update.next = update
    }
    else {
        // u0 -> u0
        // u1 -> u0 -> u1
        update.next = queue.pending.next
        queue.pending.next = update
    }

    queue.pending = update

    schedule()
}

function schedule() {
    workInProgressHook = fiber.memoizedState
    const app = fiber.stateNode()
    isMount = false
    return app
}

function App() {
    const [num, updateNum] = useState(0)
    const [num1, updateNum1] = useState(10)
    console.log('isMount', isMount)
    console.log('num', num)
    console.log('num1', num1)

    return {
        onClick() {
            updateNum(num => num + 1)
        },
        onFocus() {
            updateNum1(num => num + 10)
        }
    }
}

window.app = schedule()