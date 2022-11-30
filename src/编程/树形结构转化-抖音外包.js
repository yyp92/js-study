// 标题
// 判断树形组件每个节点的展开收起状态

// 题目描述
// 如图所示的树形结构组件，给定如下数据结构，请写一个方法，判断每个节点的展开/收起状态

// 输入的数据结构
const tree = [
    {
        id: '1',
        label: 'hello world',
        isOpen: true,
    },
    {
        id: '2',
        label: 'hello world',
        children: [
            {
                id: '21',
                label: 'hello world',
                children: [
                    {
                        id: '211',
                        label: 'hello world',
                        isOpen: true,
                    },
                    {
                        id: '212',
                        label: 'hello world',
                        isOpen: false,
                    }
                ]
            }
        ]
    },
    {
        id: '3',
        label: 'hello world',
        isOpen: false,
    }
];
    
function checkOpenStatus(tree) {
    let res = {}

    for (let i = 0; i < tree.length; i++) {
        const {id, isOpen, children} = tree[i]

        if (isOpen !== undefined) {
            res[id] = isOpen
        }
        else if (Array.isArray(children)) {
            const item = checkOpenStatus(children)
            
            const isOpen = Object.values(item).some(item => item === true)
            res = {...res, [id]: isOpen, ...item}
        }
    }

    return res
}

const result = checkOpenStatus(tree);

console.log(result);
// {'1': true, '2': true, '21': true, '211': true, '212': false, '3': false}