
let originalData = null

const reducer = (oldState, action) => {
    const { payload, type } = action
    switch (type) {
        case 'sortBy':
            return  {
                ...oldState,
                rows: oldState.rows.sort(payload.sort)
            }
        case 'filter': 
            const newFilters = {
                ...oldState.filters,
                [payload.field]: payload.value
            }
            if (payload.value.length === 0) {
                newFilters[payload.filter] = null;
                delete newFilters[payload.filter]
            }
            // apply all
            return {
                filters: newFilters,
                rows: [...originalData.reduce((acc, row) => {
                    let canStay = true
                    for (let f in newFilters) {
                        if (!(`${row[f]}`.includes(`${newFilters[f]}`))) {
                            canStay = false
                        }
                    }
                    if (canStay) acc.push(row)
                    return acc
                }, [])]
            }
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