import React from 'react';
import Filter from './sample/Filter';
import Sorter from './sample/Sorter';
import generateRowData from './utils';

const FooterCaption = ({ from, to, activeColumnIndex, activeRowIndex, filtered, total }) => (
        <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', textAlign: 'center' }}>Post footer component [{from}, {to}] [row: {activeRowIndex}, col: {activeColumnIndex}] filtered {filtered} out of {total}</div>
    ),
    
    HeaderCaption = ({ total, activeColumn, activeRow, scrollTop }) => (
        <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', fontSize: '1.2em' }}>
            Pre header component ({total}) [{activeRow}, {activeColumn}] scrollTop: [{scrollTop}]
        </div>
    ),

    leftMost = ({ row, rowIndex, isHeader, isFooter, from, to }) => {
        if (isFooter) return <div style={{ width: '100px' }}>LF {to}</div>;
        if (isHeader) return <div style={{ width: '100px' }}>LH {from}</div>;
        return `left ${rowIndex}`;
    },

    rightMost = ({ row, rowIndex, isHeader, isFooter, from, to }) => {
        if (isFooter) return <div style={{ width: '100px' }}>RF {to}</div>;
        if (isHeader) return <div style={{ width: '100px' }}>RH {from}</div>;
        return `right ${rowIndex}`;
    },
    
    basicFilter = ({userValue, row, columnKey}) => {
        
        // eslint-disable-next-line no-unused-vars
        const t = 3;
        return `${row[columnKey]}`.includes(userValue);
    },
    
    basicSort = ({rowA, rowB, columnKey, direction}) => {
        const v = rowA[columnKey] > rowB[columnKey] ? 1 : -1;
        return {
            asc : v,
            desc: -v
        }[direction];
    };

export default {
    
    columns: [{
        key: 'id',
        label: 'idz',
        header: ({
            column, columnIndex,
            filter, //: {value, setValue, visibility, setVisibility} = {},
            sort, //: {sortAsc, sortDesc, unsort, direction} = {}
            isSorting
        }) => (<div style={{display: 'flex', alignItems: 'center'}}>
            <span>{column.label + '_' + columnIndex}</span>
            <Filter {...{column, columnIndex, filter}}/>
            <Sorter {...{column, columnIndex, sort, isSorting}}/>
        </div>),
        footer: ({ column, columnIndex }) => column.key + '_' + columnIndex,
        cell: ({ row, column }) => row[column.key],
        width:300,
        filter: basicFilter,
        sort: basicSort,
    }, {
        key: 'entityid',
        label: 'entity id',

    }, {
        key: 'name',
        label: 'name',
        cell: ({ row, column }) => row[column.key],
        header: ({
            column, columnIndex,
            filter, //: {value, setValue, visibility, setVisibility} = {},
            sort, //: {sortAsc, sortDesc, unsort, direction} = {}
            isSorting
        }) => (<div style={{display: 'flex', alignItems: 'center'}}>
            <span>{column.label + '_' + columnIndex}</span>
            <Filter {...{column, columnIndex, filter}}/>
            <Sorter {...{column, columnIndex, sort, isSorting}}/>
        </div>),
        filter: basicFilter,
        sort: basicSort,
        width:300
    }, {
        key: 'date',
        cell: ({ row, column }) => row[column.key],
        width:100
    }, {
        key: 'actions',
        cell: ({ row, column }) => <div style={{ color: 'green' }}>{row[column.key]}</div>,
        width:300
    },
    {
        key: 'id2',
        header: ({
            column, columnIndex,
            sort, //: {sortAsc, sortDesc, unsort, direction} = {}
            isSorting
        }) => (<div style={{display: 'flex', alignItems: 'center'}}>
            <span>{column.key + '_' + columnIndex}</span>
            <Sorter {...{column, columnIndex, sort, isSorting}}/>
        </div>),
        footer: ({ column, columnIndex }) => column.key + '_' + columnIndex,
        cell: ({ row, column }) => row[column.key],
        filter: basicFilter,
        sort: basicSort,
        width:150

    },
    {
        key: 'date2',
        cell: ({ row, column }) => row[column.key],
        width:300
    },
    { 
        key: 'entityid2',
    },
    { 
        key: 'name2',
    },
    { 
        key: 'id3',
    },
    {
        key: 'date3',
        cell: ({ row, column }) => row[column.key],
        width:300
    },
    {
        key: 'entityid3',
    },
    { 
        key: 'name3',
    }],
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

    ], 300),

    dimensions: {
        height: 900,
        width: 1400,
        rowHeight: 180,    
    },

    height: 900,
    width: 1400,
    rowHeight: 180,
    
    // gap: 15,

    

    // header: {
    //     height: 80,
    //     caption: {
    //         component: HeaderCaption,
    //         height: 45
    //     }
    // },
    // footer: {
        // height: 60,
        // caption: {
        //     component: FooterCaption,
        //     height: 25
        // }
    // },

    // noFilterData: ({total}) => <span>No results out of {total}</span>,

    // leftMost,
    // rightMost,


    // defaultColumnWidth = 100 // default value


    // highlight: {
        // rowHighlightClass: 'TableRowHighlight',
        // columnHighlightClass: 'TableColumnHighlight',
        // crossHighlightClass: 'TableCrossHighlight',
        // cellHightlightClass: 'TableCellHighlight',
        // cellClass: 'TableCell',
        // onHeaderHighlight: true,
        // onFooterHighlight: true,
        // onLeftMostHighlight: true,
        // onRightMostHighlight: true,
    // },



    // events: {
    //     onCellClick: (e, { row, column }) => {
    //         console.log('cell click', column, row);
    //         e.stopPropagation();
    //     },
    //     onCellEnter: (e, {row, column}) => {
    //         console.log('cell enter', col, row)
    //     },
    //     onCellLeave: (e, {row, column}) => {
    //         console.log('cell leave', col, row)
    //     },
    // }
};