import { isFunction } from './utils';
let count = 0;
const prefix = 'HYT_',
    uniqueID = {
        toString: () => {
            count += 1;
            return prefix + count;
        }
    },

    __getFillerHeights = ({
        from, moreSpaceThanContent, carpetHeight,
        rowHeight, contentHeight, dataHeight
    }) => {
        const headerFillerHeight = from * rowHeight,
            footerFillerHeight = moreSpaceThanContent
                ? contentHeight - carpetHeight
                : carpetHeight - headerFillerHeight - dataHeight;
        return {
            headerFillerHeight,
            footerFillerHeight
        };
    },

    __filter = (fls, _originalData) => Object.keys(fls).reduce(
        (acc, filterK) => acc.filter(row => fls[filterK].value === '' || fls[filterK].filter({
            userValue: fls[filterK].value,
            row,
            columnKey: filterK
        })),
        _originalData
    ),

    __cleanFilters = _filters => Object.keys(_filters).reduce((acc, k) => {
        acc[k] = {
            filter: _filters[k].filter,
            visibility: false,
            value: ''
        };
        return acc;
    }, {}),

    __sort = (what, _sorter, _sortingColumn, _sortingDirection) => _sorter ? [...what].sort((a, b) => _sorter({
        rowA: a, rowB: b,
        columnKey: _sortingColumn,
        direction: _sortingDirection
    })) : [...what],

    reducer = (oldState, action) => {
        const { payload = {}, type } = action,
            {
                total,
                filters,
                columns,
                originalData, filteredData, currentData,
                virtual,
                gap,
                LeftMost, RightMost,
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
                },
            } = oldState,
            

            __getVirtual = cdata => {
                const _carpetHeight = cdata.length * rowHeight,
                    _from = 0,
                    _to = renderedElements > cdata.length ? cdata.length : renderedElements,
                    _moreSpaceThanContent = _carpetHeight < contentHeight,
                    fillerHeights = __getFillerHeights({
                        from: _from, 
                        moreSpaceThanContent:_moreSpaceThanContent,
                        carpetHeight: _carpetHeight,
                        rowHeight,
                        contentHeight,
                        dataHeight
                    });
                
                return {
                    carpetHeight: _carpetHeight,
                    moreSpaceThanContent: _moreSpaceThanContent,
                    scrollTop: 0,
                    from: 0,
                    to: _to,
                    loading: false,
                    ...fillerHeights
                };
            },
            arrRep = (a, i, v) => {
                if (i === 0) return [v].concat(a.slice(1));
                if (i === a.length-1) return a.slice(0, -1).concat(v);
                return [].concat(...(a.slice(0, i)), v, ...(a.slice(i+1)));
            },
            actions = {
                toggleColumnVisibility: () => {
                    const {key, isVisible} = payload,
                        cIndex = columns.findIndex(c => c.key === key);
                    if (cIndex === -1) return {};
                    
                    // eslint-disable-next-line one-var
                    const newColumns = arrRep(columns, cIndex, {...columns[cIndex], isVisible}); 

                    return {
                        columns: newColumns,
                        virtual: {
                            ...virtual,
                            colspan: newColumns.filter(c => c.isVisible).length + !!LeftMost + !!RightMost
                        }
                    };
                },
                loading: () => ({
                    virtual: {
                        ...virtual,
                        loading: true
                    }
                }),
                filter: () => {
                    let _filters = {...filters};

                    if ('value' in payload) {
                        _filters = {
                            ...filters,
                            [payload.column]: {
                                ...filters[payload.column],
                                value: payload.value
                            }
                        };
                    } else if ('visibility' in payload) {
                        _filters = {
                            ...filters,
                            [payload.column]: {
                                ...filters[payload.column],
                                visibility: payload.visibility
                            }
                        };
                    }

                    const _filteredData = __filter(_filters, originalData),
                        _currentData = __sort(_filteredData, sorter, sortingColumn, sortingDirection),
                        _filterNumbers = Object.values(_filters).filter(f => f.value).length,
                        _updatedVirtual = __getVirtual(_currentData);

                    return {
                        filters: _filters,
                        filtered: _currentData.length,
                        activeFiltersCount: _filterNumbers,
                        isFiltering: _filterNumbers > 0,
                        virtual: {
                            ...virtual,
                            ..._updatedVirtual,
                        },
                        currentData: _currentData,
                        filteredData: _filteredData,
                        rows: [..._currentData].slice(_updatedVirtual.from, _updatedVirtual.to),
                    };
                },
                unFilter: () => {
                    const _currentData = __sort(originalData, sorter, sortingColumn, sortingDirection),
                        _updatedVirtual = __getVirtual(_currentData);

                    return {
                        filters: __cleanFilters(filters),
                        activeFiltersCount: 0,
                        isFiltering: false,
                        filtered: _currentData.length,
                        currentData: _currentData,
                        filteredData: [...originalData],
                        rows: [..._currentData].slice(_updatedVirtual.from, _updatedVirtual.to),
                        virtual: {
                            ...virtual,
                            ..._updatedVirtual,
                        },

                    };
                },

                sort: () => {
                    const _currentData = [...currentData].sort((a, b) => payload.sorter({
                        rowA: a, rowB: b,
                        columnKey: payload.column,
                        direction: payload.direction
                    }));
                    return {
                        isSorting: true,
                        currentData: _currentData,
                        rows: [..._currentData].slice(from, to),
                        sorting: payload
                    };
                },
                unSort: () => ({
                    currentData: [...filteredData],
                    rows: [...filteredData].slice(from, to),
                    isSorting: false,
                    sorting: {
                        column: null,
                        direction: null,
                        sorter: null
                    }
                }),

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

                    const scrollTop = parseInt(payload, 10),
                        _from = Math.max(Math.ceil(scrollTop / rowHeight) - gap, 0),
                        _to = Math.min(_from + renderedElements, total),
                        _updatedFillerHeights = __getFillerHeights({
                            from: _from,
                            moreSpaceThanContent,
                            carpetHeight,
                            rowHeight,
                            contentHeight,
                            dataHeight
                        });

                    return {
                        rows: currentData.slice(_from, _to),
                        virtual: {
                            ...virtual,
                            loading: false,
                            scrollTop,
                            ..._updatedFillerHeights,
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
        let activeFiltersCount = 0;
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

            removedContent = '.',

            cls: {
                highlight: {
                    rowHighlightClass = '',
                    columnHighlightClass = '',
                    crossHighlightClass = '',
                    cellHightlightClass = '',
                } = {},
                elements: {
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
                shiftPageScroll = false,
            } = {},
            debounceTimes: {
                filtering = 50,
                scrolling = 100
            } = {}
        } = cnf;

        // eslint-disable-next-line one-var
        const _columns = columns.map(
            column => ({
                ...column,
                isVisible: 'isVisible' in column ? column.isVisible : true
            })).map(
                column => column.width ? column : { ...column, width: defaultColumnWidth }
            ),
            filters = _columns.reduce((acc, column) => {
                if (isFunction(column.filter)) {
                    const value = column.filtered || '';
                    activeFiltersCount += !!value;
                    acc[column.key] = {
                        filter: column.filter,
                        value,
                        visibility: !!value
                    };
                }
                return acc;
            }, {}),
            originalData = data.map(row => ({ _ID: `${uniqueID}`, ...row })),
            contentHeight = height
                - (HeaderCaption ? headerCaptionHeight : 0)
                - headerHeight - footerHeight
                - (FooterCaption ? footerCaptionHeight : 0),
            renderedElements = Math.ceil(contentHeight / rowHeight) + 2 * gap,
            dataHeight = renderedElements * rowHeight,


            filteredData = __filter(filters, originalData),
            
            carpetHeight = filteredData.length * rowHeight,
            moreSpaceThanContent = carpetHeight < contentHeight,
            visibleElements = Math.floor(contentHeight / rowHeight),
            visibleElementsHeight = visibleElements * rowHeight,
            fillerHeights = __getFillerHeights({
                from: 0,
                moreSpaceThanContent,
                carpetHeight,
                rowHeight,
                contentHeight,
                dataHeight
            }),
            

            // initial sorting ? 
            presortIndex = columns.findIndex(c => 'sorted' in c && ['asc', 'desc'].includes(c.sorted));

        // eslint-disable-next-line one-var
        let currentData = [...filteredData],
            sorting = {
                column: null,
                direction: null,
                sorter: null,
            },
            isSorting = false;

        
        if (presortIndex >= 0) {
            // throw an exception in case the sort function is not in the column
            if (!isFunction(columns[presortIndex].sort)) {
                throw new Error("a presorted column needs a sort function");
            }
            currentData = currentData.sort((a, b) => columns[presortIndex].sort({
                rowA: a,
                rowB: b,
                columnKey: columns[presortIndex].key,
                direction: columns[presortIndex].sorted
            }));
            sorting = {
                column: columns[presortIndex].key,
                direction: columns[presortIndex].sorted,
                sorter: columns[presortIndex].sort
            };
            isSorting = true;
        }

        return {
            ...cnf,
            gap,
            columns: _columns,
            sorting,
            isSorting,
            
            filters,
            activeFiltersCount,
            isFiltering: activeFiltersCount > 0,
            
            dimensions: {
                width, height,
                rowHeight
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
            currentData,
            filteredData,
            rows: currentData.slice(0, renderedElements),
            filtered: currentData.length,
            total: originalData.length,
            activeRow: null,
            activeColumn: null,
            activeRowIndex: null,
            activeColumnIndex: null,
            removedContent,
            events: {
                onCellClick,
                onCellEnter,
                onCellLeave,
                onHeaderHighlight,
                onFooterHighlight,
                onLeftMostHighlight,
                onRightMostHighlight,
                shiftPageScroll
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
                colspan: _columns.filter(c => c.isVisible).length + !!LeftMost + !!RightMost,
                moreSpaceThanContent,
                dataHeight,
                contentHeight,
                scrollTop: 0,
                from: 0,
                to: renderedElements - 1,
                renderedElements,
                carpetHeight,
                visibleElements,
                visibleElementsHeight,
                loading: false,
                loader,
                ...fillerHeights,
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