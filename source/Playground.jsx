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
        sorting: {
            sort: versus => (rowa, rowb) =>
                rowa.id > rowb.id ? -versus : versus
            ,
        } 
    },{
        key: 'entityid',
        footerLabel: '--entityid--',
        sorting: {
            sort: versus => (rowa, rowb) =>
                parseInt(rowa.entityid, 10) > parseInt(rowb.entityid, 10) ? -versus : versus
            ,
        } 
    },{
        key: 'name',
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
        }}>what</button>
    }],

    // columnClick: (e, col, row) => {
    //     console.log('column click', col, row)
    // },
    // columnEnter: (e, col) => {
    //     console.log('column entered', col)
    // },
    // columnLeave: (e, col) => {
    //     console.log('column leave', col)
    // },

    // rowClick: (e, row) => {
    //     console.log('row click', row)
    // },
    // rowEnter: (e, row) => {
    //     console.log('row entered', row)
    // },
    // rowLeave: (e, row) => {
    //     console.log('row leave', row)
    // },
    
    // cellClick: (e, col, row) => {
    //     console.log('cell click', col, row)
    // },
    // cellEnter: (e, col, row) => {
    //     console.log('cell enter', col, row)
    // },
    // cellLeave: (e, col, row) => {
    //     console.log('cell leave', col, row)
    // },
    rowVerticalalign: 'top',
    data: generateRowData([
        {key: 'id', type: 'id'},
        {key: 'entityid', type: 'int'},
        {key: 'name', type: 'str'},
        {key: 'date', type: 'date'},
    ], 50),
    caption: {
        text: 'This is the caption',
    },
    height: 400,
    width: 1200
}

export default () => {
    return <div className="Wrapper">
        <HyperTable {...props} />
    </div>
}