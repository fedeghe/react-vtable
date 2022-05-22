let count = 0;
const prefix= 'HYT_';
const uniqueID = {
    toString: () => {
        count += 1;
        return prefix + count;
    }
}

const GAP = 10

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
                activeRow: payload.row._ID,
                activeColIndex: payload.colIndex,
                activeRowIndex: payload.rowIndex
            }
        case 'cellOut': 
            return  {
                ...oldState,
                activeCol: null,
                activeRow: null,
                activeColIndex: null,
                activeRowIndex: null,
            }
        case 'scroll': 
            const scrollTop = payload
            const {
                total,
                virtual: {
                    dataHeight,
                    rowHeight,
                    contentHeight, 
                    carpetHeight,
                    moreSpaceThanContent,
                    renderedElements
                }
            } = oldState
            if (moreSpaceThanContent) return oldState
            if (scrollTop < (GAP * rowHeight)) {
                return {
                    ...oldState,
                    virtual: {
                        ...oldState.virtual,
                        scrollTop,
                        headerFillerHeight: 0,
                        footerFillerHeight: carpetHeight - dataHeight,
                        from: 0,
                        to: renderedElements -1
                    }    
                }
            }
            
            const from = Math.max(Math.ceil(scrollTop / rowHeight) - GAP, 0),
                headerFillerHeight = from * rowHeight,
                footerFillerHeight = moreSpaceThanContent
                    ? contentHeight - carpetHeight
                    : carpetHeight - headerFillerHeight - dataHeight,
                to = Math.min(from + renderedElements, total);
            return {
                ...oldState,
                rows: oldState.originalData.slice(from, to),
                virtual: {
                    ...oldState.virtual,
                    scrollTop,
                    headerFillerHeight,
                    footerFillerHeight,
                    from,
                    to: to -1,
                }    
            }
        default:
            return oldState
    }
}

const init = cnf => {
    const {
        data,
        columns,
        height = 600,
        width = 800,
        PreHeader, PostFooter,
        // no header & footer caption by default
        preHeaderHeight = 0, postFooterHeight = 0,
        // no sticky header & footer by default
        headerHeight = 0, footerHeight = 0,

        rowHighlight = '',
        columnHighlight = '',
        crossHighlight = '',
        cellHightlight = '',

        rowHeight = 50,
        leftMost, rightMost,
        cellClick = () => {},
        cellEnter = () => {},
        cellLeave = () => {},
    } = cnf
    
    const contentHeight = height
        - (PreHeader ? preHeaderHeight : 0)
        - headerHeight - footerHeight
        - (PostFooter ? postFooterHeight : 0);
    const carpetHeight = data.length * rowHeight
    const renderedElements = Math.ceil(contentHeight / rowHeight) + 2 * GAP
    const dataHeight = renderedElements * rowHeight
    
    const headerFillerHeight = 0
    const moreSpaceThanContent= carpetHeight < contentHeight
    const footerFillerHeight = moreSpaceThanContent ? contentHeight - carpetHeight : carpetHeight - dataHeight

    originalData = data.map(row => ({_ID: `${uniqueID}`, ...row}))
    return {
        ...cnf,
        width, height,
        preHeaderHeight,
        postFooterHeight,
        headerHeight, footerHeight,
        rowHeight,
        originalData,
        rows: originalData.slice(0, renderedElements),
        total: originalData.length,
        filters: {},
        sorting: {
            field: null,
            versus: 0
        },
        activeRow: null,
        activeCol: null,
        activeRowIndex: null,
        activeColIndex: null,
        rowHighlight,
        columnHighlight,
        crossHighlight,
        cellHightlight,
        cellClick,
        cellEnter,
        cellLeave,
        virtual: {
            colspan: columns.length + !!leftMost + !!rightMost,
            moreSpaceThanContent,
            dataHeight,
            rowHeight,
            contentHeight, 
            headerFillerHeight,
            footerFillerHeight,
            scrollTop: 0,
            from: 0,
            to: renderedElements -1,
            renderedElements,
            carpetHeight,
        }
    }
}


export default () => ({
    reducer,
    init
})