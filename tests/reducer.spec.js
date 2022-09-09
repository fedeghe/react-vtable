/**
 * @jest-environment jsdom
 */
import reducerFactory, {ACTION_TYPES} from './../source/VTable/reducer'
import zeroConfig from './configs/zero'
import emptyDefaultState  from './emptyDefaultState.json'

const deepClone = o => JSON.parse(JSON.stringify(o))

describe('reducer - basic', function () {
    const { init, reducer } = reducerFactory(),
        basicFilter = ({userValue, row, columnKey}) => `${row[columnKey]}`.includes(userValue),
        basicSort = ({rowA, rowB, columnKey, direction}) => {
            const v = rowA[columnKey] > rowB[columnKey] ? 1 : -1;
            return {
                asc : v,
                desc: -v
            }[direction];
        };

    
    it('initialise as expected - basic', () => {
        const state = init(zeroConfig);

        expect(state.dimensions).toMatchObject({
            width:400, height:200, rowHeight:40
        })
        expect(state.columns.length).toBe(3)
        expect(state.data.length).toBe(1000)
        expect(state.originalData.length).toBe(1000)
        expect(state.rows.length).toBe(9)
        expect(state.gap).toBe(2)
        expect(state.sorting).toMatchObject({column: null, direction: null, sorter: null})
        expect(state.isSorting).toBe(false)
        expect(state.isFiltering).toBe(false)
        expect(state.filters).toMatchObject({})
        expect(state.activeFiltersCount).toBe(0)
        expect(state.header).toMatchObject({height: 0, caption: {height: 25, Component: null}})
        expect(state.footer).toMatchObject({height: 0, caption: {height: 25, Component: null}})
        expect(state.filtered).toBe(1000)
        expect(state.total).toBe(1000)
        expect(state.activeRow).toBeNull()
        expect(state.activeColumn).toBeNull()
        expect(state.activeRowIndex).toBeNull()
        expect(state.activeColumnIndex).toBeNull()
        expect(state.commonRemovedContent).toBe('.')
        expect(state.events).toMatchObject({
            "onCellClick": null,
            "onCellEnter": null,
            "onCellLeave": null,
            "onHeaderHighlight": false,
            "onFooterHighlight": false,
            "onLeftMostHighlight": false,
            "onRightMostHighlight": false,
            "shiftPageScroll": false
        })
        expect(state.cls.highlight).toMatchObject({
            "rowHighlightClass": "",
            "columnHighlightClass": "",
            "crossHighlightClass": "",
            "cellHightlightClass": ""
        })
        expect(state.cls.elements).toMatchObject({
            "contentClass": "",
            "cellClass": "",
            "rowClass": "",
            "wrapperClass": ""
        })
        expect(state.virtual).toMatchObject({
            "colspan": 3,
            "moreSpaceThanContent": false,
            "dataHeight": 360,
            "contentHeight": 200,
            "scrollTop": 0,
            "fromRow": 0,
            "toRow": 8,
            "renderableElements": 9,
            "carpetHeight": 40000,
            "visibleElements": 5,
            "visibleElementsHeight": 200,
            "loading": false,
            "headerFillerHeight": 0,
            "footerFillerHeight": 39640
        })
        expect(state.debounceTimes).toMatchObject({
            "filtering": 50,
            "scrolling": 50
        })
        expect(state.rhtID).toBe('_ID')
    });

    it('initialise as expected - all in', () => {
        const newConfig = deepClone(zeroConfig)
        newConfig.dimensions = {
            height: 800,
            width:400,
            rowHeight: 100
        }
        newConfig.header = {height: 100, caption: {Component: () => 'caption', height:20}}
        newConfig.footer = {height: 80, caption: {Component: () => 'caption', height:20}}
        newConfig.debounceTimes = {
            filtering: 5, scrolling: 4
        }
        newConfig.columns[0].preFiltered = '4'
        newConfig.columns[0].preSorted = 'asc'
        newConfig.columns[0].filter = basicFilter;
        newConfig.columns[0].sort = basicSort;
        newConfig.commonRemovedContent = '-';
        newConfig.rhtID = 'hello_';
        
        const state = init(newConfig);

        expect(state.dimensions).toMatchObject(newConfig.dimensions)
        expect(state.columns.length).toBe(3)
        expect(state.data.length).toBe(1000)
        expect(state.originalData.length).toBe(1000)
        expect(state.rows.length).toBe(10)
        expect(state.gap).toBe(2)
        expect(state.sorting).toMatchObject({
            column: newConfig.columns[0].key,
            direction: newConfig.columns[0].preSorted,
            sorter: basicSort
        })
        expect(state.isSorting).toBe(true)
        expect(state.isFiltering).toBe(true)
        expect(state.filters).toMatchObject({})
        expect(state.activeFiltersCount).toBe(1)
        expect(state.header).toMatchObject({height: newConfig.header.height, caption: {height: newConfig.header.caption.height}})
        expect(state.header.caption.Component()).toBe('caption')
        expect(state.footer).toMatchObject({height: newConfig.footer.height, caption: {height: newConfig.footer.caption.height}})
        expect(state.footer.caption.Component()).toBe('caption')
        expect(state.filtered).toBe(271)
        expect(state.total).toBe(1000)
        
        expect(state.activeRow).toBeNull()
        expect(state.activeColumn).toBeNull()
        expect(state.activeRowIndex).toBeNull()
        expect(state.activeColumnIndex).toBeNull()

        expect(state.commonRemovedContent).toBe(newConfig.commonRemovedContent)
        expect(state.events).toMatchObject({
            "onCellClick": null,
            "onCellEnter": null,
            "onCellLeave": null,
            "onHeaderHighlight": false,
            "onFooterHighlight": false,
            "onLeftMostHighlight": false,
            "onRightMostHighlight": false,
            "shiftPageScroll": false
        })
        expect(state.cls.highlight).toMatchObject({
            "rowHighlightClass": "",
            "columnHighlightClass": "",
            "crossHighlightClass": "",
            "cellHightlightClass": ""
        })
        expect(state.cls.elements).toMatchObject({
            "contentClass": "",
            "cellClass": "",
            "rowClass": "",
            "wrapperClass": ""
        })
        expect(state.virtual).toMatchObject({
            "colspan": 3,
            "moreSpaceThanContent": false,
            "dataHeight": 1000,
            "contentHeight": 580,
            "scrollTop": 0,
            "fromRow": 0,
            "toRow": 9,
            "renderableElements": 10,
            "carpetHeight": 27100,
            "visibleElements": 5,
            "visibleElementsHeight": 500,
            "loading": false,
            "headerFillerHeight": 0,
            "footerFillerHeight": 26100
        })
        expect(state.debounceTimes).toMatchObject(newConfig.debounceTimes)
        expect(state.rhtID).toBe(newConfig.rhtID)
    });

    it('actions - toggleColumnVisibility', () => {
        const state = init(zeroConfig),

            newState1 = reducer(state, {
                payload: {key: 'id', isVisible: false},
                type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY
            }),
            newState2 = reducer(newState1, {
                payload: {key: 'entityid', isVisible: false},
                type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY
            }),
            newState3 = reducer(newState2, {
                payload: {key: 'name', isVisible: false},
                type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY
            }),

            newState4 = reducer(newState3, {
                payload: {key: 'id', isVisible: true},
                type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY
            }),
            newState5 = reducer(newState4, {
                payload: {key: 'entityid', isVisible: true},
                type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY
            }),
            newState6 = reducer(newState5, {
                payload: {key: 'name', isVisible: true},
                type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY
            });

        expect(newState1.columns[0].isVisible).toBe(false);
        expect(newState1.virtual.colspan).toBe(2);
        expect(newState2.columns[1].isVisible).toBe(false);
        expect(newState2.virtual.colspan).toBe(1);
        expect(newState3.columns[2].isVisible).toBe(false);
        expect(newState3.virtual.colspan).toBe(0);
        // back
        expect(newState4.columns[0].isVisible).toBe(true);
        expect(newState4.virtual.colspan).toBe(1);
        expect(newState5.columns[1].isVisible).toBe(true);
        expect(newState5.virtual.colspan).toBe(2);
        expect(newState6.columns[2].isVisible).toBe(true);
        expect(newState6.virtual.colspan).toBe(3);
    });
    
    it('actions - loading', () => {
        const state = init(zeroConfig),
            newState1 = reducer(state, {type: ACTION_TYPES.LOADING})
        expect(newState1.virtual.loading).toBe(true)
    });

    it('actions - filter visibility', () => {
        const newConfig = deepClone(zeroConfig)
        newConfig.columns[0].filter = basicFilter
        const state = init(newConfig),
            newState1 = reducer(state, {
                type: ACTION_TYPES.FILTER,
                payload: {
                    visibility: true,
                    column: 'id'
                }
            });
        expect(newState1.filters.id.value).toBe('')
        expect(newState1.filters.id.visibility).toBe(true)
        expect(newState1.activeFiltersCount).toBe(0)
        expect(newState1.isFiltering).toBe(false)
        expect(newState1.filteredData.length).toBe(1000)
    });

    it('actions - filter value', () => {
        const newConfig = deepClone(zeroConfig)
        newConfig.columns[0].filter = basicFilter
        const state = init(newConfig),
            // show first
            newState1 = reducer(state, {
                type: ACTION_TYPES.FILTER,
                payload: {
                    visibility: true,
                    column: 'id',
                    value: '4'
                }
            }),
            // unfilter single
            newState2 = reducer(newState1, {
                type: ACTION_TYPES.FILTER,
                payload: {
                    visibility: false,
                    column: 'id'
                }
            });
        expect(newState1.rows.length).toBe(9)
        expect(newState1.filters.id.value).toBe('4')
        expect(newState1.filters.id.visibility).toBe(true)
        expect(newState1.activeFiltersCount).toBe(1)
        expect(newState1.isFiltering).toBe(true)
        expect(newState1.filteredData.length).toBe(271)
        expect(newState1.virtual.fromRow).toBe(0)
        expect(newState1.virtual.toRow).toBe(9)

        
    
        expect(newState2.rows.length).toBe(9)
        expect(newState2.filters.id.value).toBe('4')
        expect(newState2.filters.id.visibility).toBe(false)
        expect(newState2.activeFiltersCount).toBe(0)
        expect(newState2.isFiltering).toBe(false)
        expect(newState2.filteredData.length).toBe(1000)
        expect(newState2.virtual.fromRow).toBe(0)
        expect(newState2.virtual.toRow).toBe(9)
    });

    it('actions - filter global', () => {
        const newConfig = deepClone(zeroConfig)
        newConfig.columns[0].filter = basicFilter
        const state = init(newConfig),
            // show first
            newState1 = reducer(state, {
                type:ACTION_TYPES.GLOBAL_FILTER,
                payload: '4'
            }),
            // unfilter single
            newState2 = reducer(newState1, {type: ACTION_TYPES.UNFILTER});
        expect(newState1.rows.length).toBe(9)
        expect(newState1.globalFilterValue).toBe('4')
        
        expect(newState1.activeFiltersCount).toBe(1)
        expect(newState1.isFiltering).toBe(true)
        expect(newState1.filteredData.length).toBe(362)
        expect(newState1.virtual.fromRow).toBe(0)
        expect(newState1.virtual.toRow).toBe(9)

        expect(newState2.rows.length).toBe(9)
        expect(newState2.globalFilterValue).toBe('')

        expect(newState2.filters.id.visibility).toBe(false)
        expect(newState2.activeFiltersCount).toBe(0)
        expect(newState2.isFiltering).toBe(false)
        expect(newState2.filteredData.length).toBe(1000)
        expect(newState2.virtual.fromRow).toBe(0)
        expect(newState2.virtual.toRow).toBe(9)
    });

    it('actions - unfilter all', () => {
        const newConfig = deepClone(zeroConfig);
        newConfig.columns[0].filter = basicFilter;
        newConfig.columns[1].filter = basicFilter;
        const state = init(newConfig),
            // first filter
            newState1 = reducer(state, {
                type: ACTION_TYPES.FILTER,
                payload: {
                    visibility: true,
                    value: '4',
                    column: 'id'
                }
            }),
            // second filter
            newState2 = reducer(newState1, {
                type: ACTION_TYPES.FILTER,
                payload: {
                    visibility: true,
                    value: '4',
                    column: 'entityid'
                }
            }),
            // unfilter all
            newState3 = reducer(newState2, {type: ACTION_TYPES.UNFILTER});

        expect(newState2.rows.length).toBe(9);

        expect(newState2.filters.id.value).toBe('4');
        expect(newState2.filters.id.visibility).toBe(true);
        expect(newState2.activeFiltersCount).toBe(2);
        expect(newState2.isFiltering).toBe(true);
        expect(newState2.filteredData.length).toBe(180);
        expect(newState2.virtual.fromRow).toBe(0);
        expect(newState2.virtual.toRow).toBe(9);
    
        expect(newState3.rows.length).toBe(9);
        expect(newState3.activeFiltersCount).toBe(0);
        expect(newState3.isFiltering).toBe(false);
        expect(newState3.filteredData.length).toBe(1000);
        expect(newState3.virtual.fromRow).toBe(0);
        expect(newState3.virtual.toRow).toBe(9);
    });

    it('actions - sort', () => {
        const newConfig = deepClone(zeroConfig);
        newConfig.columns[0].sort = basicSort;
        const state = init(newConfig),
            newState1 = reducer(state, {
                type: ACTION_TYPES.SORT,
                payload: {
                    direction:'desc',
                    column: 'id',
                    sorter: basicSort
                }
            }),
            newState2 = reducer(newState1, {
                type: ACTION_TYPES.SORT,
                payload: {
                    direction:'asc',
                    column: 'id',
                    sorter: basicSort
                }
            });
        expect(state.rows[0].id).toBe(1);
        expect(newState1.rows[0].id).toBe(1000);
        expect(newState2.rows[0].id).toBe(1);
    });

    it('actions - unsort', () => {
        const newConfig = deepClone(zeroConfig);
        newConfig.columns[0].sort = basicSort;
        const state = init(newConfig),
            newState1 = reducer(state, {
                type: ACTION_TYPES.SORT,
                payload: {
                    direction:'desc',
                    column: 'id',
                    sorter: basicSort
                }
            }),
            newState2 = reducer(newState1, {type: ACTION_TYPES.UNSORT});
        expect(state.rows[0].id).toBe(1);
        expect(newState1.rows[0].id).toBe(1000);
        expect(newState2.rows[0].id).toBe(1);
    });

    it('actions - cellEnter', () => {
        const newConfig = deepClone(zeroConfig),
            state = init(newConfig),
            newState = reducer(state, {
                type: ACTION_TYPES.CELL_ENTER,
                payload: {
                    column: {
                        key: 'id'
                    },
                    row : {
                        _ID: '22'
                    },
                    columnIndex: '44',
                    rowIndex :'22'
                }
            });
        expect(state.activeColumn).toBeNull()
        expect(state.activeRow).toBeNull()
        expect(state.activeColumnIndex).toBeNull()
        expect(state.activeRowIndex).toBeNull()

        expect(newState.activeColumn).toBe('id');
        expect(newState.activeRow).toBe('22');
        expect(newState.activeColumnIndex).toBe('44');
        expect(newState.activeRowIndex).toBe('22');
    });

    it('actions - cellLeave', () => {
        const newConfig = deepClone(zeroConfig),
            state = init(newConfig),
            newState = reducer(state, {
                type: ACTION_TYPES.CELL_ENTER,
                payload: {
                    column: {
                        key: 'id'
                    },
                    row : {
                        _ID: '22'
                    },
                    columnIndex: '44',
                    rowIndex :'22'
                }
            }),
            newState2 = reducer(newState, {type: ACTION_TYPES.CELL_LEAVE});
        expect(state.activeColumn).toBeNull()
        expect(state.activeRow).toBeNull()
        expect(state.activeColumnIndex).toBeNull()
        expect(state.activeRowIndex).toBeNull()

        expect(newState.activeColumn).toBe('id');
        expect(newState.activeRow).toBe('22');
        expect(newState.activeColumnIndex).toBe('44');
        expect(newState.activeRowIndex).toBe('22');

        expect(newState2.activeColumn).toBeNull()
        expect(newState2.activeRow).toBeNull()
        expect(newState2.activeColumnIndex).toBeNull()
        expect(newState2.activeRowIndex).toBeNull()
    });

    it('actions - scroll', () => {
        const newConfig = deepClone(zeroConfig),
            state = init(newConfig),
            newState = reducer(state, {
                type: ACTION_TYPES.SCROLL,
                payload: 400
            });
        
        expect(newState.rows[0].id).toBe(9);
        expect(newState.virtual.loading).toBeFalsy();
        expect(newState.virtual.scrollTop).toBe(400);
        expect(newState.virtual.headerFillerHeight).toBe(320);
        expect(newState.virtual.footerFillerHeight).toBe(39320);
        expect(newState.virtual.fromRow).toBe(8);
        expect(newState.virtual.toRow).toBe(16);
    });
});

describe('reducer - edge', function () {
    const { init, reducer } = reducerFactory(),
        basicFilter = ({userValue, row, columnKey}) => {
            return `${row[columnKey]}`.includes(userValue)
        },
        basicSort = ({rowA, rowB, columnKey, direction}) => {
            const v = rowA[columnKey] > rowB[columnKey] ? 1 : -1;
            return {
                asc : v,
                desc: -v
            }[direction];
        };

    it('edge - mixed sort asc, sort desc, unsort', () => {
        const newConfig = deepClone(zeroConfig);
        newConfig.data = [
            {id: 3, entityid: 33, name:'Fred'},
            {id: 1, entityid: 43, name:'Gabriel'},
            {id: 2, entityid: 13, name:'Frances'},
        ]
        newConfig.columns[0].sort = basicSort;
        const state = init(newConfig),
            newState1 = reducer(state, {
                type: ACTION_TYPES.SORT,
                payload: {
                    direction:'desc',
                    column: 'id',
                    sorter: basicSort
                }
            }),
            newState2 = reducer(newState1, {
                type: ACTION_TYPES.SORT,
                payload: {
                    direction:'asc',
                    column: 'id',
                    sorter: basicSort
                }
            }),
            newState3 = reducer(newState2, {type: ACTION_TYPES.UNSORT});
        // desc
        expect(newState1.rows[0].id).toBe(3);
        expect(newState1.rows[2].id).toBe(1);
        // asc
        expect(newState2.rows[0].id).toBe(1);
        expect(newState2.rows[2].id).toBe(3);
        // orig
        expect(newState3.rows[0].id).toBe(3);
        expect(newState3.rows[2].id).toBe(2);
    });
    
    it('edge - overscroll', () => {
        const newConfig = deepClone(zeroConfig);
        
        newConfig.columns[0].filter = basicFilter;
        newConfig.columns[0].globalPreFilter = '23';
        const state = init(newConfig);
        // desc
        expect(state.rows.length).toBe(9);
        const newState = reducer(state, {type: ACTION_TYPES.SCROLL, payload: 3000})
        expect(newState.rows.length).toBe(9);
    });
    
    it('edge - filter to no data', () => {
        const newConfig = deepClone(zeroConfig);
        newConfig.columns[0].filter = basicFilter;
        const state = init(newConfig),
            // show first
            newState = reducer(state, {
                type: ACTION_TYPES.FILTER,
                payload: {
                    visibility: true,
                    column: 'id',
                    value: 'xxx'
                }
            });
        expect(newState.rows.length).toBe(0);
        expect(newState.filters.id.value).toBe('xxx');
        expect(newState.filters.id.visibility).toBe(true);
        expect(newState.activeFiltersCount).toBe(1);
        expect(newState.isFiltering).toBe(true);
        expect(newState.filteredData.length).toBe(0);
        expect(newState.virtual.fromRow).toBe(0);
        expect(newState.virtual.toRow).toBe(0);
    });

    it('edge - toggleColumnVisibility non existent column', () => {
        const newConfig = deepClone(zeroConfig);
        newConfig.columns[0].filter = basicFilter;
        const state = init(newConfig),
            // show first
            newState1 = reducer(state, {
                type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY,
                payload: {
                    key: 'xxx',
                    isVisible: true
                }
            });
        expect(newState1).toMatchObject(state);
    });

    it('edge - dispatch non existent action', () => {
        const newConfig = deepClone(zeroConfig);
        const state = init(newConfig),
            newState1 = reducer(state, {
                type: 'notAnExpectedAction',
                payload: {
                    key: 'xxx',
                    isVisible: true
                }
            });
        expect(newState1).toMatchObject(state);
    });

    it('edge - edge on columnVisitility', () => {
        const newConfig = deepClone(zeroConfig);
        newConfig.columns[0].isVisible = true;
        const newState = init(newConfig);
        expect(newState.columns[0].isVisible).toBeTruthy();
    });
    
    it('edge - no config', () => {
        const state = init();
        expect(state).toMatchObject(emptyDefaultState);
        expect(state.NoFilterData()).toBe('no data');
        expect(state.virtual.Loader()).toBeNull();
    });

    it('edge - empty config', () => {
        const state = init({});
        expect(state).toMatchObject(emptyDefaultState);
        expect(state.NoFilterData()).toBe('no data');
        expect(state.virtual.Loader()).toBeNull();
    });

    it('edge - empty config - scroll no payload', () => {
        const state = init({});
        reducer(state, {type: ACTION_TYPES.SCROLL});
        expect(state).toMatchObject(emptyDefaultState);
    });
    it('edge - scroll 0', () => {
        const newConfig = deepClone(zeroConfig);
        newConfig.columns[0].preSorted = 'asc';
        expect(
            () => init(newConfig)
        ).toThrow('a presorted column needs a sort function');
    });
});