import { isFunction } from './utils';
let count = 0;
const prefix = 'HYT_',
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
                originalData, filteredData,
                virtual,
                gap,
                dimensions: {
                    rowHeight
                },
                sorting: {
                    column: sortingColumn,
                    direction: sortingDirection,
                    sorter
                },
                virtual: {
                    from, to,
                    dataHeight, contentHeight, carpetHeight,
                    moreSpaceThanContent,
                    renderedElements,
                    headerFillerHeight,
                    footerFillerHeight
                }
            } = oldState,
            actions = {
                loading: () => ({
                    virtual: {
                        ...oldState.virtual,
                        loading: true
                    }
                }),
                filter: () => {

                    let newFilters = null,
                        _to = to,
                        _from = from,
                        _headerFillerHeight = headerFillerHeight,
                        _footerFillerHeight = footerFillerHeight;

                    if ('value' in payload) {
                        newFilters = {
                            ...filters,
                            [payload.column]: {
                                ...filters[payload.column],
                                value: payload.value
                            }
                        };
                    } else if ('visibility' in payload) {
                        newFilters = {
                            ...filters,
                            [payload.column]: {
                                ...filters[payload.column],
                                visibility: payload.visibility
                            }
                        };
                    }

                    // sort again based on original data
                    const sorted = sorter ? [...originalData].sort((a, b) => sorter({
                        rowA: a, rowB: b,
                        columnKey: sortingColumn,
                        direction: sortingDirection
                    })) : [...originalData],

                        // then apply filters
                        newFilteredData = newFilters
                            ? Object.keys(newFilters).reduce(
                                (acc, filterK) => acc.filter(row => newFilters[filterK].filter({
                                    userValue: newFilters[filterK].value,
                                    row,
                                    columnKey: filterK
                                })),
                                sorted
                            )
                            : filteredData,
                        _carpetHeight = newFilteredData.length * rowHeight,
                        _moreSpaceThanContent = _carpetHeight < contentHeight;

                    if (to > newFilteredData.length) {
                        _to = newFilteredData.length;
                        _from = _to - renderedElements;
                    }
                    _headerFillerHeight = _from * rowHeight;
                    _footerFillerHeight = _moreSpaceThanContent
                        ? contentHeight - _carpetHeight
                        : _carpetHeight - _headerFillerHeight - dataHeight;

                    return {
                        filters: newFilters,
                        filtered: newFilteredData.length,
                        virtual: {
                            ...virtual,
                            footerFillerHeight: _footerFillerHeight,
                            headerFillerHeight: _headerFillerHeight,
                            moreSpaceThanContent: _moreSpaceThanContent,
                            carpetHeight: _carpetHeight
                        },
                        filteredData: newFilteredData,
                        rows: [...newFilteredData].slice(from, to),
                    };
                },
                sort: () => {
                    const sorted = [...filteredData].sort((a, b) => payload.sorter({
                        rowA: a, rowB: b,
                        columnKey: payload.column,
                        direction: payload.direction
                    }));
                    return {
                        filteredData: sorted,
                        rows: [...sorted].slice(from, to),
                        sorting: {
                            column: payload.column,
                            direction: payload.direction,
                            sorter: payload.sorter
                        }
                    };
                },
                unsort: () => {

                    // then apply filters
                    let _to = to,
                        _from = from,
                        _headerFillerHeight = headerFillerHeight,
                        _footerFillerHeight = footerFillerHeight;
                    const newFilteredData = filters
                        ? Object.keys(filters).reduce(
                            (acc, filterK) => acc.filter(row => filters[filterK].filter({
                                userValue: filters[filterK].value,
                                row,
                                columnKey: filterK
                            })),
                            originalData
                        )
                        : originalData,
                        _carpetHeight = newFilteredData.length * rowHeight,
                        _moreSpaceThanContent = _carpetHeight < contentHeight;

                    if (to > newFilteredData.length) {
                        _to = newFilteredData.length;
                        _from = _to - renderedElements;
                    }
                    _headerFillerHeight = _from * rowHeight;
                    _footerFillerHeight = _moreSpaceThanContent
                        ? contentHeight - _carpetHeight
                        : _carpetHeight - _headerFillerHeight - dataHeight;

                    return {
                        virtual: {
                            ...virtual,
                            footerFillerHeight: _footerFillerHeight,
                            headerFillerHeight: _headerFillerHeight,
                            moreSpaceThanContent: _moreSpaceThanContent,
                            carpetHeight: _carpetHeight
                        },
                        filteredData: newFilteredData,
                        rows: [...newFilteredData].slice(from, to),
                        sorting: {
                            column: null,
                            direction: null
                        }
                    };

                },
                cellEnter: () => ({
                    activeColumn: payload?.column?.key,
                    activeRow: payload?.row?._ID,
                    activeColumnIndex: payload?.columnIndex,
                    activeRowIndex: payload?.rowIndex
                }),
                cellLeave: () => ({
                    activeColumn: null,
                    activeRow: null,
                    activeColumnIndex: null,
                    activeRowIndex: null,
                }),
                scroll: () => {
                    if (moreSpaceThanContent) return oldState;

                    const scrollTop = payload,
                        _from = Math.max(Math.ceil(scrollTop / rowHeight) - gap, 0);
                    if (_from === from) return oldState
                    // eslint-disable-next-line one-var
                    const _headerFillerHeight = _from * rowHeight,
                        _footerFillerHeight = moreSpaceThanContent
                            ? contentHeight - carpetHeight
                            : carpetHeight - _headerFillerHeight - dataHeight,
                        _to = Math.min(_from + renderedElements, total);

                    return {
                        rows: filteredData.slice(_from, _to),
                        virtual: {
                            ...virtual,
                            loading: false,
                            scrollTop,
                            headerFillerHeight: _headerFillerHeight,
                            footerFillerHeight: _footerFillerHeight,
                            from: _from,
                            to: _to - 1,
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
            data = [],
            columns = [],
            dimensions: {
                height = 800,
                width = 1200,
                rowHeight = 80,
            } = {},
            header: {
                height: headerHeight = 0,
                caption: {
                    component: HeaderCaption = null,
                    height: headerCaptionHeight = 25
                } = {}
            } = {},

            footer: {
                height: footerHeight = 0,
                caption: {
                    component: FooterCaption = null,
                    height: footerCaptionHeight = 25
                } = {}
            } = {},

            gap = 10,

            loader = false,

            defaultColumnWidth = 150,
            // highlight: {
            //     rowHighlightClass = '',
            //     columnHighlightClass = '',
            //     crossHighlightClass = '',
            //     cellHightlightClass = '',
            //     contentClass = '',
            //     cellClass = '',
            //     onHeaderHighlight = false,
            //     onFooterHighlight = false,
            //     onLeftMostHighlight = false,
            //     onRightMostHighlight = false,
            // } = {},
            cls: {
                highlight : {
                    rowHighlightClass = '',
                    columnHighlightClass = '',
                    crossHighlightClass = '',
                    cellHightlightClass = '',
                } = {},
                elements : {
                    contentClass = '',
                    cellClass = '',
                    wrapperClass = '',
                } = {},
            } = {},

            noFilterData = () => 'no data',


            LeftMost, RightMost,
            events: {
                onCellClick = null,
                onCellEnter = null,
                onCellLeave = null,

                onHeaderHighlight = false,
                onFooterHighlight = false,
                onLeftMostHighlight = false,
                onRightMostHighlight = false,
            } = {},
            debounceTimes: {
                filtering = 50,
                scrolling = 100
            } = {}
        } = cnf,
            contentHeight = height
                - (HeaderCaption ? headerCaptionHeight : 0)
                - headerHeight - footerHeight
                - (FooterCaption ? footerCaptionHeight : 0),
            carpetHeight = data.length * rowHeight,
            renderedElements = Math.ceil(contentHeight / rowHeight) + 2 * gap,
            dataHeight = renderedElements * rowHeight,

            headerFillerHeight = 0,
            moreSpaceThanContent = carpetHeight < contentHeight,
            footerFillerHeight = moreSpaceThanContent ? contentHeight - carpetHeight : carpetHeight - dataHeight,

            originalData = data.map(row => ({ _ID: `${uniqueID}`, ...row })),
            filteredData = [...originalData];

        return {
            ...cnf,
            gap,
            columns: columns.map(column => column.width ? column : { ...column, width: defaultColumnWidth }),
            sorting: {
                column: null,
                direction: null,
                sorter: null,
            },
            filters: columns.reduce((acc, column) => {
                if (isFunction(column.filter)) {
                    acc[column.key] = {
                        filter: column.filter,
                        value: '',
                        visibility: false
                    };
                }
                return acc;
            }, {}),
            dimensions: {
                width, height,
                rowHeight,
            },

            header: {
                height: headerHeight,
                caption: {
                    component: HeaderCaption,
                    height: headerCaptionHeight
                }
            },
            footer: {
                height: footerHeight,
                caption: {
                    component: FooterCaption,
                    height: footerCaptionHeight
                }
            },
            noFilterData,
            originalData,
            filteredData,
            rows: [...filteredData].slice(0, renderedElements),
            filtered: originalData.length,
            total: originalData.length,
            activeRow: null,
            activeColumn: null,
            activeRowIndex: null,
            activeColumnIndex: null,

            events: {
                onCellClick,
                onCellEnter,
                onCellLeave,
                onHeaderHighlight,
                onFooterHighlight,
                onLeftMostHighlight,
                onRightMostHighlight,
            },
            cls: {
                highlight: {
                    rowHighlightClass,
                    columnHighlightClass,
                    crossHighlightClass,
                    cellHightlightClass,
                },
                elements: {
                    contentClass,
                    cellClass,
                    wrapperClass,
                },
            },
            virtual: {
                colspan: columns.length + !!LeftMost + !!RightMost,
                moreSpaceThanContent,
                dataHeight,
                contentHeight,
                headerFillerHeight,
                footerFillerHeight,
                scrollTop: 0,
                from: 0,
                to: renderedElements - 1,
                renderedElements,
                carpetHeight,
                loading: false,
                loader,
            },
            debounceTimes: {
                filtering,
                scrolling
            }
        };
    };

export default () => ({
    reducer,
    init
});