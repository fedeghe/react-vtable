import {isFunction} from './utils'
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


        case 'cellHover': 
            return  {
                ...oldState,
                activeColumn: payload?.column?.key,
                activeRow: payload?.row?._ID,
                activeColumnIndex: payload?.columnIndex,
                activeRowIndex: payload?.rowIndex
            }
        case 'cellOut': 
            return  {
                ...oldState,
                activeColumn: null,
                activeRow: null,
                activeColumnIndex: null,
                activeRowIndex: null,
            }
        case 'scroll': {
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
        cellClick = null,
        cellEnter = null,
        cellLeave = null,
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
        sorting:{
            column: null,
            direction: null
        },
        filters:columns.reduce((acc, column) => {
            if (isFunction(column.filter)){
                acc[column.key] = {
                    filter: column.filter,
                    value: '',
                    visibility: false
                }
            }
            return acc;
        }, {}),
        width, height,
        PreHeader, PostFooter,
        preHeaderHeight, postFooterHeight,
        headerHeight, footerHeight,
        rowHeight,
        originalData,
        rows: originalData.slice(0, renderedElements),
        total: originalData.length,
        activeRow: null,
        activeColumn: null,
        activeRowIndex: null,
        activeColumnIndex: null,
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