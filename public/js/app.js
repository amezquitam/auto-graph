
const transitions = document.querySelectorAll('.gedge')
const screen = document.querySelector('#screen')
const entry = document.querySelector('#entry-auto')
const velocityin = document.querySelector('#velocity-auto')
const velocityout = document.querySelector('#velocity-out')
const edges = document.querySelector('#edges')

const nodes = (() => {
    const nodeElements = document.querySelectorAll('.gnode')
    const nodes = {}

    nodeElements.forEach(node => {
        nodes[node.dataset['state']] = node
    })

    return nodes;
})()

const transitionMap = {}
let stack = ['#']

let velocity = 1;

velocityout.textContent = velocity
velocityin.value = velocity

velocityin.addEventListener('change', (ev) => {
    velocityout.textContent = velocity = ev.target.value
})


for (const state in nodes) {
    const node = nodes[state]
    const draggable = new PlainDraggable(node)

    node.textContent = state
    draggable.onDrag = function () {
        Object.keys(transitionMap).forEach(key => {
            if (key.startsWith(state) || key.endsWith(state)) {
                transitionMap[key].remove();
                transitionMap[key] = new LeaderLine(
                    nodes[key[0]], nodes[key[1]], { color: '#fff' }
                )
            }
        })
    };
}


transitions.forEach(transition => {
    const { state, entry, top, push, pop, go } = transition.dataset

    if (state && go) {
        if (!transitionMap[state + go]) {
            const leader = new LeaderLine(nodes[state], nodes[go], { color: '#fff' })
            transitionMap[state + go] = leader
        }
    }
})

