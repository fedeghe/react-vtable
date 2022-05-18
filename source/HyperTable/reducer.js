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
                sorting: {
                    field: payload.field,
                    versus: payload.versus
                },
            }
        case 'unsortBy':
            return  {
                ...oldState,
                rows: [...originalData.reduce((acc, row) => {
                    let canStay = true
                    const {filters} = oldState
                    for (let f in filters) {
                        if (!(`${row[f]}`.includes(`${filters[f]}`))) {
                            canStay = false
                        }
                    }
                    if (canStay) acc.push(row)
                    return acc
                }, [])],
                sorting: {
                    field: null,
                    versus: null
                },
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
                ...oldState,
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
                activeCol: payload.col.key,
                activeRow: payload.row._ID
            }
        case 'cellOut': 
            return  {
                ...oldState,
                activeCol: null,
                activeRow: null,
            }
        case 'scroll': 
            const scrollTop = payload

            const {
                gap,
                dataHeight,
                rowHeight,
                contentHeight, 
                carpetHeight,
                moreSpaceThanContent
            } = oldState.virtual
            if (scrollTop < (gap * rowHeight)) {
                return {
                    ...oldState,
                    virtual: {
                        ...oldState.virtual,
                        scrollTop,
                        headerFillerHeight: 0,
                        footerFillerHeight: carpetHeight - dataHeight,
                        from: 0
                    }    
                }
            }
            
            const from = Math.max(Math.ceil(scrollTop / rowHeight) - gap, 0),
                headerFillerHeight = from * rowHeight,
                footerFillerHeight = moreSpaceThanContent
                    ? contentHeight - carpetHeight
                    : carpetHeight - headerFillerHeight - dataHeight;
            return {
                ...oldState,
                virtual: {
                    ...oldState.virtual,
                    scrollTop,
                    headerFillerHeight,
                    footerFillerHeight,
                    from
                }    
            }
        default:
            return oldState
    }
}

const init = ({
    data,
    height,
    preHeaderHeight, postFooterHeight,
    headerHeight, footerHeight,
    rowHeight
}) => {
    
    const gap = 10
    const contentHeight = height - preHeaderHeight - headerHeight - footerHeight - postFooterHeight;
    const carpetHeight = data.length * rowHeight
    const renderedElements = Math.ceil(contentHeight / rowHeight) + 2 * gap
    const dataHeight = renderedElements * rowHeight
    
    const headerFillerHeight = 0
    const moreSpaceThanContent= carpetHeight < contentHeight
    const footerFillerHeight = moreSpaceThanContent ? contentHeight - carpetHeight : carpetHeight - dataHeight

    originalData = data.map(row => ({_ID: `${uniqueID}`, ...row}))
    return {
        rows: originalData,
        total: originalData.length,
        filters: {},
        sorting: {
            field: null,
            versus: 0
        },
        activeRow: null,
        activeCcol: null,

        virtual: {
            gap,
            moreSpaceThanContent,
            dataHeight,
            rowHeight,
            contentHeight, 
            headerFillerHeight,
            footerFillerHeight,
            scrollTop: 0,
            from: 0,
            renderedElements,
            carpetHeight
        }
    }
}


export default () => ({
    reducer,
    init
})