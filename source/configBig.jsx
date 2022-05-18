import React from 'react'
import Filter from './Filter'
import {generateRowData} from './utils'

const PostFooter = () => {
    return <div style={{color:'white', backgroundColor: 'royalBlue', height:'inherit'}}>Component post footer</div>
}
const PreHeader = () => {
    return <div style={{color:'white', backgroundColor: 'royalBlue', height:'inherit'}}>Component pre header</div>
}


export default {
    leftMost: ({row, i}) => `left ${i+1}`, 
    rightMost: ({row, i}) => `right ${i+1}`, 
    columns: [{
        key: 'id',
        label: 'id',
        footerLabel: 'id foot',
        headerLabel: 'id head',

        wrap: d => <div style={{width:'200px'}}>{d}</div>, 
        align:'center',
        sorting: {
            sort: versus => (rowa, rowb) =>
                rowa.id > rowb.id ? -versus : versus
            ,
        },
    },{
        key: 'entityid',
        label: 'entity id',
        filter: filter => <Filter filter={filter}/>,
        sorting: {
            sort: versus => (rowa, rowb) =>
                parseInt(rowa.entityid, 10) > parseInt(rowb.entityid, 10) ? -versus : versus
            ,
        },
    
    },{
        key: 'name',
        label: 'name',
        filter: filter => <Filter filter={filter}/>,
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
        filter: filter => <Filter filter={filter}/>,
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
    preHeaderHeight: 25,
    postFooterHeight: 25,
    headerHeight: 40,
    footerHeight: 40,

    height: 600,
    width: 800,
    rowHeight: 80,

    PreHeader,
    // postFooter: 'Post-footer here',
    PostFooter,
    noFilterData: 'No data',


    // rowHighlight: 'TableRowHighlight',
    // columnHighlight: 'TableColumnHighlight',
    
    // crossHighlight: 'TableCrossHighlight',
    // cellHightlight: 'TableCellHighlight',
    
    rowVerticalAlign: 'top',

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
    
    ], 2e4),
    captionTop: {
        text: 'This is the top caption __COUNT__ / __TOTAL__',
        className: 'tableCaptionUp'
    },
    captionBottom: {
        text: 'This is the bottom caption',
        className: 'tableCaptionDown'
    },
    

        
    // cellClick: (e, row, col) => {
    //     console.log('cell click', col, row)
    //     e.stopPropagation()
    // },
    // cellEnter: (e, row, col) => {
    //     console.log('cell enter', col, row)
    // },
    // cellLeave: (e, row, col) => {
    //     console.log('cell leave', col, row)
    // },
}
