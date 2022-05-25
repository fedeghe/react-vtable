import {isFunction} from './utils';
let count = 0;
const prefix= 'HYT_',
    uniqueID = {
        toString: () => {
            count += 1;
            return prefix + count;
        }
    },

    reducer = (oldState, action) => {
        const { payload, type } = action,
            {
                total,
                originalData, mutatingData,
                virtual,
                virtual: {
                    from, to,
                    dataHeight, rowHeight, contentHeight, carpetHeight,
                    moreSpaceThanContent,
                    renderedElements,
                    gap
                }
            } = oldState,
            actions = {
                sort: () => {
                    const sorted = [...mutatingData].sort((a, b) => payload.sorter({
                        rowA: a, rowB: b,
                        columnKey: payload.column,
                        direction: payload.direction
                    }));
                    return {
                        mutatingData: sorted,
                        rows: [...sorted].slice(from, to),
                        sorting: {
                            column: payload.colum,
                            direction: payload.direction
                        }
                    };
                },
                unsort: () => ({
                    mutatingData: [...originalData],
                    rows: [...originalData].slice(from, to),
                    sorting: {
                        column: null,
                        direction: null
                    }
                }),
                cellHover: () => ({
                    activeColumn: payload?.column?.key,
                    activeRow: payload?.row?._ID,
                    activeColumnIndex: payload?.columnIndex,
                    activeRowIndex: payload?.rowIndex
                }),
                cellOut: () => ({
                    activeColumn: null,
                    activeRow: null,
                    activeColumnIndex: null,
                    activeRowIndex: null,
                }),
                scroll: () => {
                    if (moreSpaceThanContent) return oldState;
                    // 99% sure it is not needed
                    // if (payload < rowHeight) {
                    //     return {
                    //         ...oldState,
                    //         virtual: {
                    //             ...oldState.virtual,
                    //             scrollTop: payload,
                    //             headerFillerHeight: 0,
                    //             footerFillerHeight: carpetHeight - dataHeight,
                    //             from: 0,
                    //             to: renderedElements -1
                    //         }    
                    //     }
                    // }
                    const scrollTop = payload,
                        from = Math.max(Math.ceil(scrollTop / rowHeight) - gap, 0),
                            headerFillerHeight = from * rowHeight,
                            footerFillerHeight = moreSpaceThanContent
                                ? contentHeight - carpetHeight
                                : carpetHeight - headerFillerHeight - dataHeight,
                            to = Math.min(from + renderedElements, total);
                    return {
                        rows: mutatingData.slice(from, to),
                        virtual: {
                            ...virtual,
                            scrollTop,
                            headerFillerHeight,
                            footerFillerHeight,
                            from,
                            to: to -1,
                        }    
                    };
                }
            };
        if (type in actions) 
            return {
                ...oldState,
                ...actions[type]()
            };
        return oldState;
    },
    init = cnf => {
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
            } = cnf,
            contentHeight = height
                - (PreHeader ? preHeaderHeight : 0)
                - headerHeight - footerHeight
                - (PostFooter ? postFooterHeight : 0),
            carpetHeight = data.length * rowHeight,
            renderedElements = Math.ceil(contentHeight / rowHeight) + 2 * gap,
            dataHeight = renderedElements * rowHeight,

            headerFillerHeight = 0,
            moreSpaceThanContent= carpetHeight < contentHeight,
            footerFillerHeight = moreSpaceThanContent ? contentHeight - carpetHeight : carpetHeight - dataHeight,

            originalData = data.map(row => ({_ID: `${uniqueID}`, ...row})),
            mutatingData = [...originalData];

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
                    };
                }
                return acc;
            }, {}),
            width, height,
            PreHeader, PostFooter,
            preHeaderHeight, postFooterHeight,
            headerHeight, footerHeight,
            rowHeight,
            originalData,
            mutatingData,
            rows: [...mutatingData].slice(0, renderedElements),
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
        };
    };

export default () => ({
    reducer,
    init
});