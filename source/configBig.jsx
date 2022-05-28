import React from 'react';
import Filter from './sample/Filter';
import Sorter from './sample/Sorter';
import generateRowData from './utils';

const PostFooter = ({ from, to, activeColumnIndex, activeRowIndex, filtered, total }) => (
        <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', textAlign: 'center' }}>Post footer component [{from}, {to}] [row: {activeRowIndex}, col: {activeColumnIndex}] filtered {filtered} out of {total}</div>
    ),
    
    PreHeader = ({ total, activeColumn, activeRow, scrollTop }) => (
        <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', fontSize: '1.2em' }}>
            Pre header component ({total}) [{activeRow}, {activeColumn}] scrollTop: [{scrollTop}]
        </div>
    ),
    
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
    // eslint-disable-next-line no-unused-vars
    // leftMost: ({ row, rowIndex, isHeader, isFooter, from, to }) => {
    //     if (isFooter) return <div style={{ width: '100px' }}>LF {to}</div>;
    //     if (isHeader) return <div style={{ width: '100px' }}>LH {from}</div>;
    //     return `left ${rowIndex}`;
    // },
    // eslint-disable-next-line no-unused-vars
    // rightMost: ({ row, rowIndex, isHeader, isFooter, from, to }) => {
    //     if (isFooter) return <div style={{ width: '100px' }}>RF {to}</div>;
    //     if (isHeader) return <div style={{ width: '100px' }}>RH {from}</div>;
    //     return `right ${rowIndex}`;
    // },
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

    headerHeight: 80,
    // footerHeight: 60,

    height: 900,
    width: 1400,
    rowHeight: 180,

    preHeaderHeight: 45,
    postFooterHeight: 25,
    // PreHeader,
    // PostFooter,

    noFilterData: ({total}) => <span>No results out of {total}</span>,

    // defaultColumnWidth = 100 // default value


    // rowHighlight: 'TableRowHighlight',
    // columnHighlight: 'TableColumnHighlight',

    crossHighlight: 'TableCrossHighlight',
    cellHightlight: 'TableCellHighlight',
    cellClass: 'TableCell',

    onHeaderHighlight: false,
    onFooterHighlight: false,
    onLeftMostHighlight: false,
    onRightMostHighlight: false,

    gap: 5,

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

    cellClick: (e, { row, column }) => {
        console.log('cell click', column, row);
        e.stopPropagation();
    },
    // cellEnter: (e, {row, column}) => {
    //     console.log('cell enter', col, row)
    // },
    // cellLeave: (e, {row, column}) => {
    //     console.log('cell leave', col, row)
    // },
};