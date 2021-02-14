
let count = 0;
const prefix= 'HYT_';
const uniqueID = {
    
    toString: () => {
        count += 1;
        return prefix + count;
    }
}



let originalData = null

const reducer = (oldState, action) => {
    const { payload, type } = action
    switch (type) {
        case 'sortBy':
            return  {
                ...oldState,
                rows: oldState.rows.sort(payload.sort),
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
        case 'cellHover': 
            return  {
                ...oldState,
                col: payload.col.key,
                row: payload.row._ID
            }
        case 'cellOut': 
            return  {
                ...oldState,
                col: null,
                row: null,
            }
        default:
            return oldState
    }
}

const init = data => {
    originalData = data.map(row => ({_ID: `${uniqueID}`, ...row}))
    return {
        rows: originalData,
        filters: {},
        sorting: {},
        row: null,
        col: null
    }
}


export default () => ({
    reducer,
    init
})