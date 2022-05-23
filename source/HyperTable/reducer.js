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
                activeCol: payload?.column?.key,
                activeRow: payload?.row?._ID,
                activeColIndex: payload?.columnIndex,
                activeRowIndex: payload?.rowIndex
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
                    renderedElements,
                    gap
                }
            } = oldState
            if (moreSpaceThanContent) return oldState
            if (scrollTop < (gap * rowHeight)) {
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
            
            const from = Math.max(Math.ceil(scrollTop / rowHeight) - gap, 0),
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
        PreHeader = false, PostFooter = false,
        // no header & footer caption by default
        preHeaderHeight = 0, postFooterHeight = 0,
        // no sticky header & footer by default
        headerHeight = 0, footerHeight = 0,
        gap = 10,

        rowHighlight = '',
        columnHighlight = '',
        crossHighlight = '',
        cellHightlight = '',

        onHeaderHighlight = false,
        onFooterHighlight = false,
        onLeftMostHighlight = false,
        onRightMostHighlight = false,

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
    const renderedElements = Math.ceil(contentHeight / rowHeight) + 2 * gap
    const dataHeight = renderedElements * rowHeight
    
    const headerFillerHeight = 0
    const moreSpaceThanContent= carpetHeight < contentHeight
    const footerFillerHeight = moreSpaceThanContent ? contentHeight - carpetHeight : carpetHeight - dataHeight

    originalData = data.map(row => ({_ID: `${uniqueID}`, ...row}))
    return {
        ...cnf,
        width, height,
        PreHeader, PostFooter,
        preHeaderHeight, postFooterHeight,
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

        onHeaderHighlight,
        onFooterHighlight,
        onLeftMostHighlight,
        onRightMostHighlight,
        
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
            gap
        }
    }
}


export default () => ({
    reducer,
    init
})