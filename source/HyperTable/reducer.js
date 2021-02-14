
let originalData = null

const reducer = (oldState, action) => {
    const { payload, type } = action
    switch (type) {
        case 'sortBy':
            return [...oldState].sort(payload.sort);
        case 'filter': 
            return [...originalData].filter(
                row => `${row[payload.field]}`.includes(`${payload.value}`)
            );
        default:
            return oldState
    }
}

const init = data => {
    originalData = data
    return {
        rows: originalData,
        filters:{}
    }
}


export default () => ({
    reducer,
    init
})