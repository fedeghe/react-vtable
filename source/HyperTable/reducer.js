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
                filters,
                originalData, mutatingData,
                virtual,
                // rows,
                sorting: {
                    column: sortingColumn,
                    direction: sortingDirection,
                    sorter
                },
                virtual: {
                    from, to,
                    dataHeight, rowHeight, contentHeight, carpetHeight,
                    moreSpaceThanContent,
                    renderedElements,
                    gap
                }
            } = oldState,
            actions = {
                filter : () => {
                    const {column, value, visibility} = payload;
                    
                   let newFilters = null;
                    if ('value' in payload) {       
                        newFilters = {
                            ...filters,
                            [column]: {
                                ...filters[column],
                                value
                            }
                        };
                    } else if ('visibility' in payload) {
                        newFilters = {
                            ...filters,
                            [column]: {
                                ...filters[column],
                                visibility
                            }
                        };
                    }
                    
                    if (newFilters) {
                        // sort again based on original data
                        const sorted = sorter ? [...originalData].sort((a, b) => sorter({
                                rowA: a, rowB: b,
                                columnKey: sortingColumn,
                                direction: sortingDirection
                            })): [...originalData],

                            // then apply filters
                            newMutatingData = Object.keys(newFilters).reduce(
                                (acc, filterK) => acc.filter(row => newFilters[filterK].filter({
                                    userValue: newFilters[filterK].value,
                                    row,
                                    columnKey: filterK
                                })),
                                sorted
                            );
                        return {
                            filters: newFilters,
                            filtered: newMutatingData.length,
                            virtual: {
                                ...virtual,
                                carpetHeight: newMutatingData.length * rowHeight
                            },
                            mutatingData: newMutatingData,
                            rows: [...newMutatingData].slice(from, to),
                        };
                    }
                    return oldState;
                },
                sort: () => {
                    const sorted = [...mutatingData].sort((a, b) => payload.sorter({
                        rowA: a, rowB: b,
                        columnKey: payload.column,
                        direction: payload.direction
                    }));
                    return {
                        mutatingData: sorted,
                        // rows: [...sorted].slice(from, to),
                        rows: [...sorted].slice(from, to),
                        sorting: {
                            column: payload.column,
                            direction: payload.direction,
                            sorter: payload.sorter
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
                        _from = Math.max(Math.ceil(scrollTop / rowHeight) - gap, 0),
                            _headerFillerHeight = _from * rowHeight,
                            _footerFillerHeight = moreSpaceThanContent
                                ? contentHeight - carpetHeight
                                : carpetHeight - _headerFillerHeight - dataHeight,
                            _to = Math.min(_from + renderedElements, total);
                    return {
                        rows: mutatingData.slice(_from, _to),
                        virtual: {
                            ...virtual,
                            scrollTop,
                            headerFillerHeight: _headerFillerHeight,
                            footerFillerHeight: _footerFillerHeight,
                            from: _from,
                            to: _to -1,
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

            defaultColumnWidth = 150,

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
            columns: columns.map(column => column.width ? column : {...column, width: defaultColumnWidth}),
            sorting:{
                column: null,
                direction: null,
                sorter: null,
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
            filtered: originalData.length,
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