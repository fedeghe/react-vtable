import React from 'react'
// import Filter from './Filter'
import {generateRowData} from './utils'

const PostFooter = ({from, to, activeColIndex, activeRowIndex}) => {
    return <div style={{color:'white', backgroundColor: 'royalBlue', height:'inherit', textAlign: 'center'}}>Post footer component [{from}, {to}] [row: {activeRowIndex}, col: {activeColIndex}]</div>
}
const PreHeader = ({total, activeCol, activeRow}) => {
    return <div style={{color:'white', backgroundColor: 'royalBlue', height:'inherit', fontSize:'1.2em'}}>Pre header component ({total}) [{activeRow}, {activeCol}]</div>
}

const Filter = ({value, setValue}) => {
    return <input type="text" value={value} onChange={e=> setValue(e.target.value)}/>
}


export default {
    leftMost: ({row, i, isHeader, isFooter, from, to}) => {
        if (isFooter) return <div style={{width:'70px'}}>LF {to}</div>
        if (isHeader) return <div style={{width:'70px'}}>LH {from}</div>
        return `left ${i}`
    }, 
    rightMost: ({row, i, isHeader, isFooter, from, to}) => {
        if (isFooter) return <div style={{width:'70px'}}>RF {to}</div>
        if (isHeader) return <div style={{width:'70px'}}>RH {from}</div>
        return `right ${i}`
    }, 
    columns: [{
        key: 'id',
        label: 'id',
        header: ({column, index}) => column.key+ '_' + index,
        footer: ({column, index}) => column.key+ '_' + index,
        cell: ({row, column}) => <div style={{width:'300px'}}>{row[column.key]}</div>, 
    },{
        key: 'entityid',
        label: 'entity id',
    },{
        key: 'name',
        label: 'name',
        cell: ({row, column}) => <div style={{width:'200px'}}>{row[column.key]}</div>, 
    },{
        key: 'date',
        cell: ({row, column}) => <div style={{width:'100px'}}>{row[column.key]}</div>, 
    },{
        key: 'actions',
        width: '80px'
    },{
        key: 'id2',
    },{
        key: 'date2',
    },{
        key: 'entityid2',
    },{
        key: 'name2',
    },{
        key: 'id3',
    },{
        key: 'date3',
    },{
        key: 'entityid3',
    },{
        key: 'name3',
    }
    ],
    
    headerHeight: 60,
    footerHeight: 60,

    height: 1000,
    width: 600,
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

    gap: 5,

    data: generateRowData([
        {key: 'id', type: 'id'},
        {key: 'entityid', type: 'int'},
        {key: 'name', type: 'str'},
        {key: 'date', type: 'date'},
        {key: 'id2', type: 'id'},
        {key: 'entityid2', type: 'int'},
        {key: 'name2', type: 'str'},
        {key: 'date2', type: 'date'},
        {key: 'id3', type: 'id'},
        {key: 'entityid3', type: 'int'},
        {key: 'name3', type: 'str'},
        {key: 'date3', type: 'date'},
    
    ], 5000),
    

        
    cellClick: (e, {row, column}) => {
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
