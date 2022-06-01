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
        _from, _moreSpaceThanContent, _carpetHeight,
        _rowHeight, _contentHeight, _dataHeight
    }) => {
        const _headerFillerHeight = _from * _rowHeight,
            _footerFillerHeight = _moreSpaceThanContent
                ? _contentHeight - _carpetHeight
                : _carpetHeight - _headerFillerHeight - _dataHeight;
        return {
            headerFillerHeight: _headerFillerHeight,
            footerFillerHeight: _footerFillerHeight
        };
    },

    reducer = (oldState, action) => {
        const { payload, type } = action,
            {
                total,
                filters,
                originalData, filteredData, currentData,
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
                },
            } = oldState,
            __sort = what => sorter ? [...what].sort((a, b) => sorter({
                rowA: a, rowB: b,
                columnKey: sortingColumn,
                direction: sortingDirection
            })) : [...what],

            __filter = fls => Object.keys(fls).reduce(
                (acc, filterK) => acc.filter(row => fls[filterK].value === '' || fls[filterK].filter({
                    userValue: fls[filterK].value,
                    row,
                    columnKey: filterK
                })),
                originalData
            ),
            __cleanFilters = () => Object.keys(filters).reduce((acc, k) => {
                acc[k] = {
                    filter: filters[k].filter,
                    visibility: false,
                    value: ''
                };
                return acc;
            }, {}),
            
            __getVirtual = cdata => {
                const cnd = to > cdata.length,
                    _carpetHeight = cdata.length * rowHeight,
                    _moreSpaceThanContent = _carpetHeight < contentHeight,
                    _to = cnd ? cdata.length || renderedElements : to,
                    _from = cdata.length
                        ? (cnd ? _to - renderedElements : from)
                        : 0,
                    fillerHeights = __getFillerHeights({
                        _from, _moreSpaceThanContent, _carpetHeight,
                        _rowHeight: rowHeight,
                        _contentHeight: contentHeight,
                        _dataHeight: dataHeight
                    });
                
                    return {
                        carpetHeight: _carpetHeight,
                        moreSpaceThanContent: _moreSpaceThanContent,
                        from: _from,
                        to: _to,
                        ...fillerHeights
                    };
            },
            actions = {
                loading: () => ({
                    virtual: {
                        ...oldState.virtual,
                        loading: true
                    }
                }),
                filter: () => {
                    let _filters = {};

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

                    const _filteredData = __filter(_filters),
                        _currentData = __sort(_filteredData),
                        _filterNumbers = Object.values(_filters).filter(f => f.value).length,
                        _updatedVirtual = __getVirtual(_currentData);

                    return {
                        filters: _filters,
                        filtered: _currentData.length,
                        activeFiltersCount: _filterNumbers,
                        isFiltered: _filterNumbers > 0,
                        virtual: {
                            ...virtual,
                            ..._updatedVirtual,
                            loading: false
                        },
                        currentData: _currentData,
                        filteredData: _filteredData,
                        rows: [..._currentData].slice(_updatedVirtual.from, _updatedVirtual.to),
                    };
                },
                unFilter: () => {
                    const _currentData = __sort(originalData),
                        _updatedVirtual = __getVirtual(_currentData);

                    return {
                        filters: __cleanFilters(),
                        activeFiltersCount: 0,
                        isFiltered: false,
                        filtered: _currentData.length,
                        currentData: _currentData,
                        filteredData: [...originalData],
                        rows: [..._currentData].slice(_updatedVirtual.from, _updatedVirtual.to),
                        virtual: {
                            ...virtual,
                            ..._updatedVirtual,
                            loading: false
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
                        sorting: payload,
                        virtual: {
                            ...virtual,
                            loading: false
                        },
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
                    },
                    virtual: {
                        ...virtual,
                        loading: false
                    },
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
                        _from = Math.max(Math.ceil(scrollTop / rowHeight) - gap, 0);
                    if (_from === from) return oldState;

                    // eslint-disable-next-line one-var
                    const _to = Math.min(_from + renderedElements, total),
                        _updatedFillerHeights = __getFillerHeights({
                            _from,
                            _moreSpaceThanContent: moreSpaceThanContent,
                            _carpetHeight: carpetHeight,
                            _rowHeight: rowHeight,
                            _contentHeight: contentHeight,
                            _dataHeight: dataHeight
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

            moreSpaceThanContent = carpetHeight < contentHeight,
            originalData = data.map(row => ({ _ID: `${uniqueID}`, ...row })),
            
            // to reuse __getFillerHeight here I would need to pass almost the whole virtual
            fillerHeights = __getFillerHeights({
                _from: 0,
                _moreSpaceThanContent: moreSpaceThanContent,
                _carpetHeight: carpetHeight,
                _rowHeight: rowHeight,
                _contentHeight: contentHeight,
                _dataHeight: dataHeight
            });
            // headerFillerHeight = 0,
            // footerFillerHeight = moreSpaceThanContent
            //     ? contentHeight - carpetHeight
            //     : carpetHeight - headerFillerHeight - dataHeight;


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
            activeFiltersCount: 0,
            isFiltered: false,
            isSorting: false,
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
            currentData: [...originalData],
            filteredData: [...originalData],
            rows: [...originalData].slice(0, renderedElements),
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
                // headerFillerHeight,
                // footerFillerHeight,
                scrollTop: 0,
                from: 0,
                to: renderedElements - 1,
                renderedElements,
                carpetHeight,
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