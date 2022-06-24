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
        fromRow, moreSpaceThanContent, carpetHeight,
        rowHeight, contentHeight, dataHeight,
        virtualization
    }) => {
        const headerFillerHeight = fromRow * rowHeight,
            footerFillerHeight = moreSpaceThanContent
                ? contentHeight - carpetHeight
                : carpetHeight - headerFillerHeight - dataHeight;
        
        return virtualization.verticalEnabled ? {
            headerFillerHeight: Math.max(headerFillerHeight, 0),
            footerFillerHeight: Math.max(footerFillerHeight, 0)
        } : {
            headerFillerHeight: 0,
            footerFillerHeight: 0
        };
    },

    __filter = (fls, originalData) => Object.keys(fls).reduce(
        (acc, filterK) => acc.filter(row => fls[filterK].value === '' || !fls[filterK].visibility || fls[filterK].filter({
            userValue: fls[filterK].value,
            row,
            columnKey: filterK
        })),
        originalData
    ),
    
    // must either match one of the specified user filter function 
    // either (in case no filter is specified) match column[key]
    __globalFilter = (value, columns, originalData) =>     
        originalData.filter(row => 
            columns.filter(column => isFunction(column.filter)).some(column => 
                column.filter({userValue: value, row, columnKey: column.key})
            ) 
            || columns.some(column => `${row[column.key]}`.includes(value))
        ),

    __cleanFilters = _filters => Object.keys(_filters).reduce((acc, k) => {
        acc[k] = {
            filter: _filters[k].filter,
            visibility: false,
            value: ''
        };
        return acc;
    }, {}),

    __sort = (what, _sorter, _sortingColumn, _sortingDirection) => _sorter
        ? [...what].sort((a, b) => _sorter({
            rowA: a, rowB: b,
            columnKey: _sortingColumn,
            direction: _sortingDirection
        }))
        : [...what],

    __updateVirtualization = ({currentData, virtualization}) => ({
        ...virtualization,
        verticalEnabled: currentData.length > virtualization.verticalCutoff
    }),

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
                    fromRow, toRow,
                    dataHeight, contentHeight, carpetHeight,
                    moreSpaceThanContent,
                    renderableElements,
                },
                rhtID,
                virtualization
            } = oldState,
            

            __getVirtual = ({_currentData, _virtualization}) => {
                const _carpetHeight = _currentData.length * rowHeight,
                    _fromRow = 0,
                    _toRow = (renderableElements > _currentData.length || !_virtualization.verticalEnabled)
                        ? _currentData.length
                        : renderableElements,
                    _moreSpaceThanContent = _carpetHeight < contentHeight,
                    fillerHeights = __getFillerHeights({
                        fromRow: _fromRow, 
                        moreSpaceThanContent:_moreSpaceThanContent,
                        carpetHeight: _carpetHeight,
                        rowHeight,
                        contentHeight,
                        dataHeight,
                        virtualization: _virtualization
                    });
                
                return {
                    carpetHeight: _carpetHeight,
                    moreSpaceThanContent: _moreSpaceThanContent,
                    scrollTop: 0,
                    fromRow: 0,
                    toRow: _toRow,
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
                globalFilter : () => {
                    const value = payload,
                        _filteredData = __globalFilter(value, columns, originalData),
                        _currentData = __sort(_filteredData, sorter, sortingColumn, sortingDirection),
                        _virtualization = __updateVirtualization({currentData: _currentData, virtualization}),
                        _updatedVirtual = __getVirtual({_currentData, _virtualization });
                    
                    return {
                        filters: __cleanFilters(filters),
                        globalFilterValue: value,
                        isFiltering: !!value,
                        virtual: {
                            ...virtual,
                            ..._updatedVirtual,
                        },
                        currentData: _currentData,
                        filteredData: _filteredData,
                        filtered: _currentData.length,
                        rows: [..._currentData].slice(_updatedVirtual.fromRow, _updatedVirtual.toRow),
                        virtualization: _virtualization,
                        activeFiltersCount: 1,
                    };
                },
                filter: () => {
                    // if (!('column' in payload)) throw new Error('filter needs a column');
                    // if (!columns.some(c => c.key === payload.column)) throw new Error("u are trying to filter a column that doesn't exist");
                    const updatedFields = {};
                    ('value' in payload) && (updatedFields.value = payload.value);
                    ('visibility' in payload) && (updatedFields.visibility = payload.visibility);
                    // eslint-disable-next-line one-var
                    const _filters = {
                            ...filters,
                            [payload.column]: {
                                ...filters[payload.column],
                                ...updatedFields
                            }
                        },
                        _filteredData = __filter(_filters, originalData),
                        _currentData = __sort(_filteredData, sorter, sortingColumn, sortingDirection),
                        _filterNumbers = Object.values(_filters).filter(f => f.value && f.visibility).length,
                        _virtualization = __updateVirtualization({currentData: _currentData, virtualization}),
                        _updatedVirtual = __getVirtual({_currentData, _virtualization });

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
                        rows: [..._currentData].slice(_updatedVirtual.fromRow, _updatedVirtual.toRow),
                        virtualization: _virtualization
                    };
                },
                unFilter: () => {
                    const _currentData = __sort(originalData, sorter, sortingColumn, sortingDirection),
                        _virtualization = __updateVirtualization({currentData: _currentData, virtualization}),
                        _updatedVirtual = __getVirtual({_currentData, _virtualization });

                    return {
                        filters: __cleanFilters(filters),
                        activeFiltersCount: 0,
                        isFiltering: false,
                        filtered: _currentData.length,
                        currentData: _currentData,
                        filteredData: [...originalData],
                        rows: [..._currentData].slice(_updatedVirtual.fromRow, _updatedVirtual.toRow),
                        virtual: {
                            ...virtual,
                            ..._updatedVirtual,
                        },
                        globalFilterValue: '',
                        virtualization: _virtualization
                    };
                },

                sort: () => {   
                    const _currentData = __sort(currentData, payload.sorter, payload.column, payload.direction);
                    return {
                        isSorting: true,
                        currentData: _currentData,
                        rows: [..._currentData].slice(fromRow, toRow),
                        sorting: payload
                    };
                },

                unSort: () => ({
                    currentData: [...filteredData],
                    rows: [...filteredData].slice(fromRow, toRow),
                    isSorting: false,
                    sorting: {
                        column: null,
                        direction: null,
                        sorter: null
                    }
                }),

                cellEnter: () => ({
                    activeColumn: payload?.column?.key,
                    activeRow: payload?.row[rhtID],
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
                    if (!virtualization.verticalEnabled) return oldState;

                    const _scrollTop = parseInt(payload, 10),
                        _fromRow = Math.max(Math.ceil(_scrollTop / rowHeight) - gap, 0),
                        _toRow = Math.min(_fromRow + renderableElements, total),
                        _updatedFillerHeights = __getFillerHeights({
                            fromRow: _fromRow,
                            moreSpaceThanContent,
                            carpetHeight,
                            rowHeight,
                            contentHeight,
                            dataHeight,
                            virtualization
                        });

                    return {
                        rows: currentData.slice(_fromRow, _toRow),
                        virtual: {
                            ...virtual,
                            loading: false,
                            scrollTop: _scrollTop,
                            ..._updatedFillerHeights,
                            fromRow: _fromRow,
                            toRow: _toRow - 1,
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
    init = (cnf = {}) => {
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

            Loader = () => null,

            defaultColumnWidth = 150,

            commonRemovedContent = '.',

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
                    rowClass = '',
                    wrapperClass = '',
                } = {},
            } = {},

            NoFilterData = () => 'no data',

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
                scrolling = 50
            } = {},
            rhtID = '_ID',
            virtualization: {
                verticalCutoff = 100,
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
                    const value = column.preFiltered || '';
                    activeFiltersCount += !!value;
                    acc[column.key] = {
                        filter: column.filter,
                        value,
                        visibility: !!value
                    };
                }
                return acc;
            }, {}),
            originalData = data.map(row => ({ [rhtID]: `${uniqueID}`, ...row })),
            contentHeight = height
                - (HeaderCaption ? headerCaptionHeight : 0)
                - headerHeight - footerHeight
                - (FooterCaption ? footerCaptionHeight : 0),
            renderableElements = Math.ceil(contentHeight / rowHeight) + 2 * gap,
            dataHeight = renderableElements * rowHeight,


            filteredData = __filter(filters, originalData),
            virtualization= {
                verticalCutoff,
                verticalEnabled: filteredData.length > verticalCutoff
            },
            
            carpetHeight = filteredData.length * rowHeight,
            moreSpaceThanContent = carpetHeight < contentHeight,
            visibleElements = Math.floor(contentHeight / rowHeight),
            visibleElementsHeight = visibleElements * rowHeight,
            fillerHeights = __getFillerHeights({
                fromRow: 0,
                moreSpaceThanContent,
                carpetHeight,
                rowHeight,
                contentHeight,
                dataHeight,
                virtualization
            }),
            

            // initial sorting ? 
            presortIndex = columns.findIndex(c => 'preSorted' in c && ['asc', 'desc'].includes(c.preSorted));

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
                direction: columns[presortIndex].preSorted
            }));
            sorting = {
                column: columns[presortIndex].key,
                direction: columns[presortIndex].preSorted,
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
            globalFilterValue: '',
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
            NoFilterData,
            originalData,
            currentData,
            filteredData,
            rows: currentData.slice(0, renderableElements),
            filtered: currentData.length,
            total: originalData.length,
            activeRow: null,
            activeColumn: null,
            activeRowIndex: null,
            activeColumnIndex: null,
            commonRemovedContent,
            rhtID,
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
                    rowClass,
                    wrapperClass,
                },
            },
            virtual: {
                colspan: _columns.filter(c => c.isVisible).length + !!LeftMost + !!RightMost,
                moreSpaceThanContent,
                dataHeight,
                contentHeight,
                scrollTop: 0,
                fromRow: 0,
                toRow: renderableElements - 1,
                renderableElements,
                carpetHeight,
                visibleElements,
                visibleElementsHeight,
                loading: false,
                Loader,
                ...fillerHeights,
            },

            debounceTimes: {
                filtering,
                scrolling
            },

            virtualization
        };
    };

export default () => ({
    reducer,
    init
});