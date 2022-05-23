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
        footerLabel: 'id foot',
        headerLabel: (o) => o.label,

        wrap: d => <div style={{width:'200px'}}>{d}</div>, 
        filter: Filter,
        sorting: {
            sort: versus => (rowa, rowb) =>
                rowa.id > rowb.id ? -versus : versus
            ,
        },
    },{
        key: 'entityid',
        label: 'entity id',
        // filter: filter => <Filter filter={filter}/>,
        sorting: {
            sort: versus => (rowa, rowb) =>
                parseInt(rowa.entityid, 10) > parseInt(rowb.entityid, 10) ? -versus : versus
            ,
        },
    
    },{
        key: 'name',
        label: 'name',
        // filter: filter => <Filter filter={filter}/>,
        headerComponent: (col, key) => <span>{col[key]}(comp.)</span>,
        component: (col, key) => <span>{col[key]} (comp.)</span>,
        footerComponent: (col, key) => <span>{col[key]} (comp.)</span>,
        wrap: d => <div style={{width:'200px'}}>{d}</div>, 
        // sorting: {
        //     sort: versus => (rowa, rowb) =>
        //         rowa.name > rowb.name ? -versus : versus
        //     ,
        // },
    },{
        key: 'date',
        wrap: d => <div style={{width:'300px'}}>{d}</div>, 
        label: 'date',
    },{
        key: 'actions',
        label: 'actions',
        component: o => <button onClick={() => {
            console.log(o)
        }}>what</button>,
        width: '80px'

    },{
        key: 'id2',
        label: 'id2',
        width:'10%',
        // filter: filter => <Filter filter={filter}/>,
    },{
        key: 'date2',
        label: 'date2',
    },{
        key: 'entityid2',
        label: 'entityid2'
    },{
        key: 'name2',
        label: 'name2',
    },{
        key: 'id3',
        label: 'id3',
    },{
        key: 'date3',
        label: 'date3',
    },{
        key: 'entityid3',
        label: 'entityid3',
    },{
        key: 'name3',
        label: 'name3',
    }
    ],
    
    headerHeight: 60,
    footerHeight: 60,

    height: 600,
    width: 800,
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
    

        
    cellClick: (e, {row, col}) => {
        console.log('cell click', col, row)
        e.stopPropagation()
    },
    // cellEnter: (e, {row, col}) => {
    //     console.log('cell enter', col, row)
    // },
    // cellLeave: (e, {row, col}) => {
    //     console.log('cell leave', col, row)
    // },
}
