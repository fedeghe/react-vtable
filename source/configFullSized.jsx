import React from 'react';
import generateRowData from './utils';

import Filter from './sample/Filter';
import Sorter from './sample/Sorter';
import Visibilist from './sample/Visibilist';
import { basicFilter, basicSort } from './sample/basicFilterAndSort';
import HeaderCaption from './sample/HeaderCaption';
import FooterCaption from './sample/FooterCaption';
import LeftMost from './sample/LeftMost';
import RightMost from './sample/RightMost';

export default size => ({
    columns: [{
        key: 'id',
        label: 'idz',
        width: 350,
        cell: ({ row, column }) => row[column.key],

        header: ({
            column, columnIndex,
            filter, //: {value, setValue, visibility, setVisibility} = {},
            sort, //: {sortAsc, sortDesc, unSort, direction, isSorting} = {}
        }) => (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Sorter {...{ column, columnIndex, sort }} />
                    <span>{column.label + '_' + columnIndex}</span>
                    <Filter {...{ column, columnIndex, filter }} />
        </div>),
        
        // footer: ({ column, columnIndex }) => column.key + '_' + columnIndex,
        footer: ({
            column, columnIndex,
            filter, //: {value, setValue, visibility, setVisibility} = {},
            sort, //: {sortAsc, sortDesc, unSort, direction, isSorting} = {}
        }) => (<div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{column.label + '_' + columnIndex}</span>
            <Filter {...{ column, columnIndex, filter }} />
            <Sorter {...{ column, columnIndex, sort }} />
        </div>),

        filter: basicFilter,
        
        sort: basicSort,

        // preSorted: 'asc', // autosort at init ? 
        
        // preFiltered: '23'
    }, {
        key: 'entityid',
    }, {
        key: 'name',
        // cell: ({ row, column }) => row[column.key],
        // width: 400,
        // header: ({
        //     column, columnIndex,
        //     filter, //: {value, setValue, visibility, setVisibility} = {},
        //     sort, //: {sortAsc, sortDesc, unSort, direction} = {}
        //     visibility
        // }) => (<div style={{ display: 'flex', alignItems: 'center' }}>
        //     {Boolean(visibility.isVisible) && <>
        //         <span>{column.key + '_' + columnIndex}</span>
        //         <Filter {...{ column, columnIndex, filter }} />
        //         <Sorter {...{ column, columnIndex, sort }} />
        //     </>}
        //     <Visibilist {...{visibility}}/>
        // </div>),
        
        
        // visibilist: Visibilist,
        // // removedContent: ':',

        // filter: basicFilter,
        // sort: basicSort,
        // preFiltered: '34',
    }, {
        key: 'date',
        isVisible: false,
        // cell: ({ row, column }) => row[column.key],
    }, {
        key: 'actions',
        // cell: ({ row, column }) => <div style={{ color: 'green' }}>{row[column.key]}</div>,
        // width: 300
    },
    {
        key: 'id2',
        // width: 150,
        // cell: ({ row, column }) => row[column.key],
        // header: ({
        //     column, columnIndex,
        //     filter, //: {value, setValue, visibility, setVisibility} = {},
        //     sort, //: {sortAsc, sortDesc, unSort, direction} = {}
        //     visibility
        // }) => (<div style={{ display: 'flex', alignItems: 'center' }}>
        //     {Boolean(visibility.isVisible) && <>
        //         <span>{column.key + '_' + columnIndex}</span>
        //         <Filter {...{ column, columnIndex, filter }} />
        //         <Sorter {...{ column, columnIndex, sort }} />
        //     </>}
        //     <Visibilist {...{visibility}}/>
        // </div>),
        // isVisible: true,
        // visibilist: Visibilist,
        // filter: basicFilter,
        // sort: basicSort,
    },
    {
        key: 'date2',
        // width: 300
    },
    { key: 'entityid2', },
    { key: 'name2', },
    { key: 'id3', },
    { key: 'date3', },
    { key: 'entityid3', },
    { key: 'name3', }
    ],

    data: generateRowData([
        { key: 'id', type: 'int' },
        { key: 'entityid', type: 'id' },
        { key: 'name', type: 'str' },
        { key: 'date', type: 'date' },
        { key: 'actions', type: 'str' },
        { key: 'id2', type: 'int' },
        { key: 'entityid2', type: 'int' },
        { key: 'name2', type: 'str' },
        { key: 'date2', type: 'date' },
        { key: 'id3', type: 'id' },
        { key: 'entityid3', type: 'int' },
        { key: 'name3', type: 'str' },
        { key: 'date3', type: 'date' },
    ], size),

    // dimensions: {
    //     height: 900,
    //     width: 1400,
    //     rowHeight: 80,
    // },

    // gap: 15,

    header: {
        height: 80,
        caption: {
            component: HeaderCaption,
            height: 45
        }
    },

    footer: {
        height: 60,
        caption: {
            component: FooterCaption,
            height: 25
        }
    },

    Loader: () => <div className="Loading">loading</div>,
    NoFilterData: ({ total }) => <span>No results out of {total}</span>,

    RightMost,
    LeftMost,


    // commonRemovedContent: '-',

    // defaultColumnWidth: 100 // default value

    cls: {
        // highlight: {
        //     rowHighlightClass: 'TableRowHighlight',
        //     columnHighlightClass: 'TableColumnHighlight',
        //     crossHighlightClass: 'TableCrossHighlight',
        //     cellHightlightClass: 'TableCellHighlight',
        // },
        elements: {
            // contentClass: 'TableContent',
            // cellClass: 'TableCell',
            // wrapperClass: 'Wrapper',
            // rowClass: 'TableRow'
        }
    },

    // events: {
        // onCellClick: (e, { row, column }) => {
        //     console.log('cell click', column, row);
        //     e.stopPropagation();
        // },
        // onCellEnter: (e, { row, column }) => {
        //     console.log('cell enter', column, row);
        // },
        // onCellLeave: (e, { row, column }) => {
        //     console.log('cell leave', column, row);
        // },
        // onHeaderHighlight: false,
        // onFooterHighlight: false,
        // onLeftMostHighlight: false,
        // onRightMostHighlight: false,
        // shiftPageScroll: true
    // },

    // virtualization: {
    //     verticalCutoff: 0
    // }

    // debounceTimes: {
    //     filtering: 5,
    //     scrolling: 10
    // }
});