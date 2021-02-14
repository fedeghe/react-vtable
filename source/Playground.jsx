import React from 'react'

import HyperTable from './HyperTable'
import {generateRowData} from './utils'

import './user.less'
const props = {
    columns: [{
        key: 'id',
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
        footerLabel: '--entityid--',
        filter: (col, filter) => {
            return <input type="text" onChange={e => filter(e.target.value)}/>
        },
        sorting: {
            sort: versus => (rowa, rowb) =>
                parseInt(rowa.entityid, 10) > parseInt(rowb.entityid, 10) ? -versus : versus
            ,
        },
    
    },{
        key: 'name',
        filter: (col, filter) => {
            return <input type="text" onChange={e => filter(e.target.value)}/>
        },
        headerComponent: (col, key) => <span>{col[key]}(comp.)</span>,
        component: (col, key) => <span>{col[key]} (comp.)</span>,
        footerComponent: (col, key) => <span>{col[key]} (comp.)</span>
    },{
        key: 'date'
    },{
        key: 'actions',
        headerLabel: 'my actions',
        component: o => <button onClick={() => {
            console.log(o)
        }}>what</button>,
        width: '80px'

    }],
    // crossHighlight: 'TableCrossHighlight',
    // rowHighlight: 'TableRowHighlight',
    // columnHighlight: 'TableColumnHighlight',
    // cellHightlight: 'TableCellHighlight',
    
    rowVerticalAlign: 'top',

    data: generateRowData([
        {key: 'id', type: 'id'},
        {key: 'entityid', type: 'int'},
        {key: 'name', type: 'str'},
        {key: 'date', type: 'date'},
    ], 50),
    captionTop: {
        text: 'This is top caption',
        className: 'tableCaptionUp'
    },
    captionBottom: {
        text: 'This is bottom caption',
        className: 'tableCaptionDown'
    },
    height: 400,
    width: 1200,

        
    // cellClick: (e, col, row) => {
    //     console.log('cell click', col, row)
    // },
    // cellEnter: (e, col, row) => {
    //     console.log('cell enter', col, row)
    // },
    // cellLeave: (e, col, row) => {
    //     console.log('cell leave', col, row)
    // },
    //----------------------------------------
    // rowClick: (e, row) => {
    //     console.log('row click', row)
    // },
    // rowEnter: (e, row) => {
    //     console.log('row entered', row)
    // },
    // rowLeave: (e, row) => {
    //     console.log('row leave', row)
    // },
    //----------------------------------------
    // columnClick: (e, col, row) => {
    //     console.log('column click', col, row)
    // },
    // columnEnter: (e, col) => {
    //     console.log('column entered', col)
    // },
    // columnLeave: (e, col) => {
    //     console.log('column leave', col)
    // },


}

export default () => {
    return <div className="Wrapper">
        <HyperTable {...props} />
    </div>
}