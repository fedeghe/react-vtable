/**
 * @jest-environment jsdom
 */
import reducerFactory from './../source/HyperTable/reducer'
import zeroConfig from './configs/zero'
import generateRowData from './../source/utils';



describe('reducer', function () {
    const { init } = reducerFactory(),
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
        expect(state.data.length).toBe(10)
        expect(state.originalData.length).toBe(10)
        expect(state.rows.length).toBe(9)
        expect(state.gap).toBe(2)
        expect(state.sorting).toMatchObject({column: null, direction: null, sorter: null})
        expect(state.isSorting).toBe(false)
        expect(state.isFiltering).toBe(false)
        expect(state.filters).toMatchObject({})
        expect(state.activeFiltersCount).toBe(0)
        expect(state.header).toMatchObject({height: 0, caption: {height: 25, component: null}})
        expect(state.footer).toMatchObject({height: 0, caption: {height: 25, component: null}})
        expect(state.filtered).toBe(10)
        expect(state.total).toBe(10)
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
            "from": 0,
            "to": 8,
            "renderedElements": 9,
            "carpetHeight": 400,
            "visibleElements": 5,
            "visibleElementsHeight": 200,
            "loading": false,
            "headerFillerHeight": 0,
            "footerFillerHeight": 40
        })
        expect(state.debounceTimes).toMatchObject({
            "filtering": 50,
            "scrolling": 50
        })
        expect(state.rhtID).toBe('_ID')
    });

    it('initialise as expected - all in', () => {
        const newConfig = {...zeroConfig}
        newConfig.dimensions = {
            height: 800,
            width:400,
            rowHeight: 100
        }
        newConfig.data = generateRowData([
            { key: 'id', type: 'int' },
            { key: 'entityid', type: 'id' },
            { key: 'name', type: 'str' }
        ], 100, true);
        newConfig.header = {height: 100}
        newConfig.footer = {height: 80}
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
        expect(state.data.length).toBe(100)
        expect(state.originalData.length).toBe(100)
        expect(state.rows.length).toBe(11)
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
        expect(state.header).toMatchObject({height: newConfig.header.height, caption: {height: 25, component: null}})
        expect(state.footer).toMatchObject({height: newConfig.footer.height, caption: {height: 25, component: null}})
        expect(state.filtered).toBe(19)
        expect(state.total).toBe(100)
        
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
            "dataHeight": 1100,
            "contentHeight": 620,
            "scrollTop": 0,
            "from": 0,
            "to": 10,
            "renderedElements": 11,
            "carpetHeight": 1900,
            "visibleElements": 6,
            "visibleElementsHeight": 600,
            "loading": false,
            "headerFillerHeight": 0,
            "footerFillerHeight": 800
        })
        expect(state.debounceTimes).toMatchObject(newConfig.debounceTimes)
        expect(state.rhtID).toBe(newConfig.rhtID)
    });
});