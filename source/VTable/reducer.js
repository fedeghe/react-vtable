import { isFunction } from './utils';
import {
    uniqueID, __getFillerHeights, __filter, __globalFilter,
    __cleanFilters, __sort, __updateVirtualization, __arrRep,
    __getVirtual
} from './reducerUtils';
import {
    HEIGHT, WIDTH, ROW_HEIGHT, HEADER_CAPTION_HEIGHT, FOOTER_CAPTION_HEIGHT,
    RVT_ID, GAP, COLUMN_WIDTH, DEBOUNCE_SCROLLING, DEBOUNCE_FILTERING,
    VIRTUALIZATION_CUTOFF, NO_FILTER_DATA_MESSAGE, COMMON_REMOVED_CONTENT
} from './constants';

const TOGGLE_COLUMN_VISIBILITY= Symbol(),
    LOADING= Symbol(),
    GLOBAL_FILTER= Symbol(),
    FILTER= Symbol(),
    UNFILTER= Symbol(),
    SORT= Symbol(),
    UNSORT= Symbol(),
    CELL_ENTER= Symbol(),
    CELL_LEAVE= Symbol(),
    SCROLL= Symbol();

// eslint-disable-next-line one-var
export const ACTION_TYPES = {
    TOGGLE_COLUMN_VISIBILITY,
    LOADING,
    GLOBAL_FILTER,
    FILTER,
    UNFILTER,
    SORT,
    UNSORT,
    CELL_ENTER,
    CELL_LEAVE,
    SCROLL,
};

// eslint-disable-next-line one-var
const actions = {
        [ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY]: ({
            payload, headers, virtual, LeftMost, RightMost
        }) => {
            const { key, isVisible } = payload,
                cIndex = headers.findIndex(c => c.key === key);
            if (cIndex === -1) return {};

            // eslint-disable-next-line one-var
            const newHeaders = __arrRep(headers, cIndex, { ...headers[cIndex], isVisible });

            return {
                headers: newHeaders,
                virtual: {
                    ...virtual,
                    colspan: newHeaders.filter(c => c.isVisible).length + !!LeftMost + !!RightMost
                }
            };
        },

        [ACTION_TYPES.LOADING]: ({virtual}) => ({
            virtual: {
                ...virtual,
                loading: true
            }
        }),

        [ACTION_TYPES.GLOBAL_FILTER]: ({
            payload : value, filters, headers, originalData, sorter,
            sortingColumn, sortingDirection, virtualization, virtual,
            rowHeight, renderableElements, contentHeight, dataHeight
        }) => {
            const _filterNumbers = Object.values(filters).filter(f => f.value && f.visibility).length,
                _filteredData = _filterNumbers
                    ? __filter(filters, _filteredData)
                    : __globalFilter(value, headers, originalData),
                _currentData = __sort(_filteredData, sorter, sortingColumn, sortingDirection),
                _virtualization = __updateVirtualization({ currentData: _currentData, virtualization }),
                _updatedVirtual = __getVirtual({
                    _currentData, _virtualization,
                    rowHeight, renderableElements, contentHeight, dataHeight
                });

            return {
                // filters: __cleanFilters(filters),
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
                activeFiltersCount: _filterNumbers + 1,
            };
        },

        [ACTION_TYPES.FILTER]: ({
            payload, filters, originalData, globalFilterValue, headers, sorter, sortingColumn, 
            sortingDirection, virtualization, virtual,
            rowHeight, renderableElements, contentHeight, dataHeight
        }) => {
            const updatedFields = {};
            ('value' in payload) && (updatedFields.value = payload.value);
            ('visibility' in payload) && (updatedFields.visibility = payload.visibility);
            // eslint-disable-next-line one-var
            const _filters = {
                ...filters,
                [payload.header]: {
                    ...filters[payload.header],
                    ...updatedFields
                }
            };
            let _filteredData = __filter(_filters, originalData);
            if (globalFilterValue) {
                _filteredData = __globalFilter(globalFilterValue, headers, _filteredData);
            }
            // eslint-disable-next-line one-var
            const _currentData = __sort(_filteredData, sorter, sortingColumn, sortingDirection),
                _filterNumbers = Object.values(_filters).filter(f => f.value && f.visibility).length,
                _virtualization = __updateVirtualization({ currentData: _currentData, virtualization }),
                _updatedVirtual = __getVirtual({
                    _currentData, _virtualization,
                    rowHeight, renderableElements, contentHeight, dataHeight
                });

            return {
                filters: _filters,
                filtered: _currentData.length,
                activeFiltersCount: _filterNumbers + ~~!!globalFilterValue,
                isFiltering: _filterNumbers > 0 || !!globalFilterValue,
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

        [ACTION_TYPES.UNFILTER]: ({
            originalData, sorter, sortingColumn, sortingDirection, virtualization, filters, virtual,
            rowHeight, renderableElements, contentHeight, dataHeight
        }) => {
            const _currentData = __sort(originalData, sorter, sortingColumn, sortingDirection),
                _virtualization = __updateVirtualization({ currentData: _currentData, virtualization }),
                _updatedVirtual = __getVirtual({
                    _currentData, _virtualization,
                    rowHeight, renderableElements, contentHeight, dataHeight
                });

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

        [ACTION_TYPES.SORT]: ({
            payload, currentData, fromRow, toRow
        }) => {
            const _currentData = __sort(currentData, payload.sorter, payload.header, payload.direction);
            return {
                isSorting: true,
                currentData: _currentData,
                rows: [..._currentData].slice(fromRow, toRow),
                sorting: payload
            };
        },

        [ACTION_TYPES.UNSORT]: ({ filteredData, fromRow, toRow }) => ({
            currentData: [...filteredData],
            rows: [...filteredData].slice(fromRow, toRow),
            isSorting: false,
            sorting: {
                header: null,
                direction: null,
                sorter: null
            }
        }),

        [ACTION_TYPES.CELL_ENTER]: ({payload, rhtID}) => ({
            activeColumn: payload?.header?.key,
            activeRow: payload?.row[rhtID],
            activeColumnIndex: payload?.headerIndex,
            activeRowIndex: payload?.rowIndex
        }),

        [ACTION_TYPES.CELL_LEAVE]: () => ({
            activeColumn: null,
            activeRow: null,
            activeColumnIndex: null,
            activeRowIndex: null,
        }),

        [ACTION_TYPES.SCROLL]: ({
            payload, moreSpaceThanContent, rowHeight, gap, renderableElements,
            total, carpetHeight, contentHeight, dataHeight, virtualization, currentData,
            virtual
        }) => {
            if (moreSpaceThanContent) return {};
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
    },

    reducer = (oldState, action) => {
        const { payload = {}, type } = action,
            {
                total,
                filters,
                globalFilterValue,
                headers,
                originalData, filteredData, currentData,
                gap,
                LeftMost, RightMost,
                dimensions: {
                    rowHeight
                },
                sorting: {
                    header: sortingColumn,
                    direction: sortingDirection,
                    sorter
                },
                virtualization,
                virtual,
                virtual: {
                    fromRow, toRow,
                    dataHeight, contentHeight, carpetHeight,
                    moreSpaceThanContent,
                    renderableElements,
                },
                rhtID
            } = oldState,
            emptyObjFuncf = () => ({}),
            params = {
                [ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY]: ()  =>({payload, headers, virtual, LeftMost, RightMost}),
                [ACTION_TYPES.LOADING]: ()  =>({virtual}),
                [ACTION_TYPES.GLOBAL_FILTER]: ()  =>({
                    payload, filters, headers, originalData, sorter, sortingColumn, sortingDirection,
                    virtualization, virtual,
                    rowHeight, renderableElements, contentHeight, dataHeight
                }),
                [ACTION_TYPES.FILTER]: ()  =>({
                    payload, filters, originalData, globalFilterValue, headers, sorter, sortingColumn, 
                    sortingDirection, virtualization, virtual,
                    rowHeight, renderableElements, contentHeight, dataHeight
                }),
                [ACTION_TYPES.UNFILTER]: ()  =>({
                    originalData, sorter, sortingColumn, sortingDirection, virtualization, filters, virtual,
                    rowHeight, renderableElements, contentHeight, dataHeight
                }),
                [ACTION_TYPES.SORT]: ()  =>({payload, currentData, fromRow, toRow}),
                [ACTION_TYPES.UNSORT]: ()  =>({filteredData, fromRow, toRow}),
                [ACTION_TYPES.CELL_ENTER]: ()  =>({payload, rhtID}),
                [ACTION_TYPES.SCROLL]: ()  =>({
                    payload, moreSpaceThanContent, rowHeight, gap, renderableElements,
                    total, carpetHeight, contentHeight, dataHeight, virtualization, currentData,
                    virtual
                }),
            }[type] || emptyObjFuncf;
        if (typeof type === 'undefined') throw new Error('Action type not given');
        if (type in actions){
            return {
                ...oldState,
                ...actions[type](params())
            };
        }
        return oldState;
    },

    init = (cnf = {}) => {
        let activeFiltersCount = 0;
        const {
            data = [],
            headers = [],
            dimensions: {
                height = HEIGHT,
                width = WIDTH,
                rowHeight = ROW_HEIGHT,
            } = {},
            globalPreFilter = '',
            header: {
                height: headerHeight = 0,
                caption: {
                    Component: HeaderCaption = null,
                    height: headerCaptionHeight = HEADER_CAPTION_HEIGHT
                } = {}
            } = {},
            footer: {
                height: footerHeight = 0,
                caption: {
                    Component: FooterCaption = null,
                    height: footerCaptionHeight = FOOTER_CAPTION_HEIGHT
                } = {}
            } = {},
            gap = GAP,
            Loader = () => null,
            defaultColumnWidth = COLUMN_WIDTH,
            commonRemovedContent = COMMON_REMOVED_CONTENT,
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

            NoFilterData = () => NO_FILTER_DATA_MESSAGE,

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
                filtering = DEBOUNCE_FILTERING,
                scrolling = DEBOUNCE_SCROLLING
            } = {},
            rhtID = RVT_ID,
            virtualization: {
                verticalCutoff = VIRTUALIZATION_CUTOFF,
            } = {}
        } = cnf;

        // eslint-disable-next-line one-var
        const _headers = headers.map(
            header => ({
                ...header,
                isVisible: 'isVisible' in header ? header.isVisible : true
            })).map(
                header => header.width ? header : { ...header, width: defaultColumnWidth }
            ),
            filters = _headers.reduce((acc, header) => {
                if (isFunction(header.filter)) {
                    const value = header.preFiltered || '';
                    activeFiltersCount += !!value;
                    acc[header.key] = {
                        filter: header.filter,
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

            // prefilter ? 
            filteredData = __filter(filters,
                globalPreFilter
                    ? __globalFilter(globalPreFilter, headers, originalData)
                    : originalData
            ),

            virtualization = {
                verticalCutoff,
                verticalEnabled: filteredData.length >= verticalCutoff
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
            presortIndex = headers.findIndex(c => 'preSorted' in c && ['asc', 'desc'].includes(c.preSorted));

        // eslint-disable-next-line one-var
        let currentData = [...filteredData],
            sorting = {
                header: null,
                direction: null,
                sorter: null,
            },
            isSorting = false;


        if (presortIndex >= 0) {
            // throw an exception in case the sort function is not in the header
            if (!isFunction(headers[presortIndex].sort)) {
                throw new Error("a presorted header needs a sort function");
            }
            currentData = currentData.sort((a, b) => headers[presortIndex].sort({
                rowA: a,
                rowB: b,
                headerKey: headers[presortIndex].key,
                direction: headers[presortIndex].preSorted
            }));
            sorting = {
                header: headers[presortIndex].key,
                direction: headers[presortIndex].preSorted,
                sorter: headers[presortIndex].sort
            };
            isSorting = true;
        }

        return {
            ...cnf,
            gap,
            headers: _headers,
            sorting,
            isSorting,

            filters,
            globalFilterValue: globalPreFilter,
            activeFiltersCount,
            isFiltering: activeFiltersCount > 0,

            dimensions: {
                width, height,
                rowHeight
            },

            header: {
                height: headerHeight,
                caption: {
                    Component: HeaderCaption,
                    height: headerCaptionHeight
                }
            },
            footer: {
                height: footerHeight,
                caption: {
                    Component: FooterCaption,
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
                colspan: _headers.filter(c => c.isVisible).length + !!LeftMost + !!RightMost,
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