import React from 'react'
import Filter from './Filter'
import {generateRowData} from './utils'

export default {
    leftMost: ({row, i}) => `left ${i+1}`, 
    rightMost: ({row, i}) => `right ${i+1}`, 
    columns: [{
        key: 'id',
        label: 'id',
        onClick: (o, col, row) => {
            console.log('click id colum: ', o)
            console.log('col: ', col)
            console.log('row: ', row)
        },
        align:'center',
        sorting: {
            sort: versus => (rowa, rowb) =>
                rowa.id > rowb.id ? -versus : versus
            ,
        },
        width:'5%'
    },{
        key: 'entityid',
        label: 'entity id',
        footerLabel: '--entityid--',
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
        // sorting: {
        //     sort: versus => (rowa, rowb) =>
        //         rowa.name > rowb.name ? -versus : versus
        //     ,
        // },
    },{
        key: 'date',
        label: 'date',
    },{
        key: 'actions',
        label: 'actions',
        headerLabel: 'actions',
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
    noFilterData: 'No data',
    crossHighlight: 'TableCrossHighlight',

    // rowHighlight: 'TableRowHighlight',
    // columnHighlight: 'TableColumnHighlight',
    cellHightlight: 'TableCellHighlight',
    
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
    ], 50),
    captionTop: {
        text: 'This is the top caption __COUNT__ / __TOTAL__',
        className: 'tableCaptionUp'
    },
    captionBottom: {
        text: 'This is the bottom caption',
        className: 'tableCaptionDown'
    },
    height: '600px',
    width: '800px',
    lineHeight: 100,

        
    cellClick: (e, row, col) => {
        console.log('cell click', col, row)
        e.stopPropagation()
    },
    cellEnter: (e, row, col) => {
        console.log('cell enter', col, row)
    },
    cellLeave: (e, row, col) => {
        console.log('cell leave', col, row)
    },
}
