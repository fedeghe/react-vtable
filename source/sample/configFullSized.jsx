import React from 'react';
import generateRowData from './utils';


import { basicFilter, basicSort } from './basicFilterAndSort';
import HeaderCaption from './HeaderCaption';
import FooterCaption from './FooterCaption';
import ColumnHeader from './ColumnHeader';
import ColumnFooter from './ColumnFooter';
import LeftMost from './LeftMost';
import RightMost from './RightMost';

import Visibilist from './Visibilist';

export default size => ({
    headers: [{
        key: 'id',
        label: 'idz',
        width: 350,
        cell: ({ row, header }) => row[header.key],

        header: ColumnHeader,
        
        // footer: ({ header, headerIndex }) => header.key + '_' + headerIndex,
        footer: ColumnFooter,

        filter: basicFilter,
        
        sort: basicSort,

        // preSorted: 'asc', // autosort at init ? 
        
        // preFiltered: '23',
        visibilist: Visibilist,
    }, {
        key: 'entityid',
    }, {
        key: 'name',
        // cell: ({ row, header }) => row[header.key],
        // width: 400,
        // header: ({
        //     header, headerIndex,
        //     filter, //: {value, setValue, visibility, setVisibility} = {},
        //     sort, //: {sortAsc, sortDesc, unSort, direction} = {}
        //     visibility
        // }) => (<div style={{ display: 'flex', alignItems: 'center' }}>
        //     {Boolean(visibility.isVisible) && <>
        //         <span>{header.key + '_' + headerIndex}</span>
        //         <Filter {...{ header, headerIndex, filter }} />
        //         <Sorter {...{ header, headerIndex, sort }} />
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
        // isVisible: false,
        // cell: ({ row, header }) => row[header.key],
    }, {
        key: 'actions',
        // cell: ({ row, header }) => <div style={{ color: 'green' }}>{row[header.key]}</div>,
        // width: 300
    },
    {
        key: 'id2',
        // width: 150,
        // cell: ({ row, header }) => row[header.key],
        // header: ({
        //     header, headerIndex,
        //     filter, //: {value, setValue, visibility, setVisibility} = {},
        //     sort, //: {sortAsc, sortDesc, unSort, direction} = {}
        //     visibility
        // }) => (<div style={{ display: 'flex', alignItems: 'center' }}>
        //     {Boolean(visibility.isVisible) && <>
        //         <span>{header.key + '_' + headerIndex}</span>
        //         <Filter {...{ header, headerIndex, filter }} />
        //         <Sorter {...{ header, headerIndex, sort }} />
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

    dimensions: {
        height: 600,
        width: 1400,
        rowHeight: 50,
    },

    // gap: 15,

    header: {
        height: 80,
        caption: {
            Component: HeaderCaption,
            height: 45
        }
    },

    footer: {
        height: 40,
        caption: {
            Component: FooterCaption,
            height: 25
        }
    },

    Loader: () => <div className="Loading">loading</div>,
    NoFilterData: ({ total }) => <span>No results out of {total}</span>,
    // globalPreFilter: '24',

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
        // onCellClick: (e, { row, header }) => {
        //     console.log('cell click', header, row);
        //     e.stopPropagation();
        // },
        // onCellEnter: (e, { row, header }) => {
        //     console.log('cell enter', header, row);
        // },
        // onCellLeave: (e, { row, header }) => {
        //     console.log('cell leave', header, row);
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

    debounceTimes: {
        // filtering: 5,
        scrolling: 10
    }
});