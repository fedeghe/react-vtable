import React from 'react'
import Filter from './sample/Filter'
import Sorter from './sample/Sorter'
import { generateRowData } from './utils'

const PostFooter = ({ from, to, activeColumnIndex, activeRowIndex }) => (
    <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', textAlign: 'center' }}>Post footer component [{from}, {to}] [row: {activeRowIndex}, col: {activeColumnIndex}]</div>
)
const PreHeader = ({ total, activeColumn, activeRow }) => (
    <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', fontSize: '1.2em' }}>Pre header component ({total}) [{activeRow}, {activeColumn}]</div>
)
/*
const FilterComponent = ({ value, setValue, visibility, setVisibility }) => {
    return <input type="text" value={value} onChange={e => setValue(e.target.value)} />
}
*/
/*
// ▲ &bull; ▼ 
const SortComponent = ({sortAsc, sortDesc, unsort, direction}) => {
    <>
        <span onClick={e => {direction!=='asc' && sortAsc()}} >▲</span>
        <span onClick={() => {direction && unsort()}}>&bull;</span>
        <span onClick={e => {direction!=='desc' && sortDesc()}} >▼</span>
    </>
}
*/   

const basicFilter = ({userValue, row, columnKey}) => row[columnKey].includes(userValue)
const basicSort = ({rowA, rowB, columnKey, direction}) => {
    const v = rowA[columnKey] > rowB[columnKey] ? 1 : -1;
    return {
        asc : v,
        desc: -v
    }[direction]
}

export default {
    leftMost: ({ row, rowIndex, isHeader, isFooter, from, to }) => {
        if (isFooter) return <div style={{ width: '70px' }}>LF {to}</div>
        if (isHeader) return <div style={{ width: '70px' }}>LH {from}</div>
        return `left ${rowIndex}`
    },
    rightMost: ({ row, rowIndex, isHeader, isFooter, from, to }) => {
        if (isFooter) return <div style={{ width: '70px' }}>RF {to}</div>
        if (isHeader) return <div style={{ width: '70px' }}>RH {from}</div>
        return `right ${rowIndex}`
    },
    columns: [{
        key: 'id',
        label: 'idz',
        header: ({
            column, columnIndex,
            filter, //: {value, setValue, visibility, setVisibility} = {},
            sort, //: {sortAsc, sortDesc, unsort, direction} = {}
        }) => (<>
            <span>{column.label + '_' + columnIndex}</span>
            <Filter {...{column, columnIndex, filter}}/>
            <Sorter {...{column, columnIndex, sort}}/>
        </>),
        footer: ({ column, columnIndex }) => column.key + '_' + columnIndex,
        cell: ({ row, column }) => <div style={{ width: '300px' }}>{row[column.key]}</div>,
        filter: basicFilter,
        sort: basicSort,
    }, {
        key: 'entityid',
        label: 'entity id',
    }, {
        key: 'name',
        label: 'name',
        cell: ({ row, column }) => <div style={{ width: '200px' }}>{row[column.key]}</div>,
    }, {
        key: 'date',
        cell: ({ row, column }) => <div style={{ width: '100px' }}>{row[column.key]}</div>,
    }, {
        key: 'actions',
        cell: ({ row, column }) => <div style={{ width: '300px' }}>{row[column.key]}</div>,
    },
    {
        key: 'id2',
        header: ({
            column, columnIndex,
            sort, //: {sortAsc, sortDesc, unsort, direction} = {}
        }) => (<>
            <span>{column.key + '_' + columnIndex}</span>
            <Sorter {...{column, columnIndex, sort}}/>
        </>),
        footer: ({ column, columnIndex }) => column.key + '_' + columnIndex,
        cell: ({ row, column }) => <div style={{ width: '100px' }}>{row[column.key]}</div>,
        filter: basicFilter,
        sort: basicSort,

    },
    {
        key: 'date2',
        cell: ({ row, column }) => <div style={{ width: '300px' }}>{row[column.key]}</div>,
    },
    { key: 'entityid2', },
    { key: 'name2', },
    { key: 'id3', },
    {
        key: 'date3',
        cell: ({ row, column }) => <div style={{ width: '300px' }}>{row[column.key]}</div>,
    },
    {
        key: 'entityid3',
    },
    { key: 'name3', }
    ],

    headerHeight: 60,
    footerHeight: 60,

    height: 900,
    width: 1400,
    rowHeight: 180,

    preHeaderHeight: 45,
    postFooterHeight: 25,
    PreHeader,
    PostFooter,

    noFilterData: 'No data',


    // rowHighlight: 'TableRowHighlight',
    // columnHighlight: 'TableColumnHighlight',

    crossHighlight: 'TableCrossHighlight',
    // cellHightlight: 'TableCellHighlight',

    onHeaderHighlight: false,
    onFooterHighlight: false,
    onLeftMostHighlight: false,
    onRightMostHighlight: false,

    gap: 10,

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
        console.log('cell click', column, row)
        e.stopPropagation()
    },
    // cellEnter: (e, {row, column}) => {
    //     console.log('cell enter', col, row)
    // },
    // cellLeave: (e, {row, column}) => {
    //     console.log('cell leave', col, row)
    // },
}
