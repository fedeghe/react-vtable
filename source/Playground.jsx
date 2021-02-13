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
        }
    },{
        key: 'entityid',
    },{
        key: 'name',
        headerComponent: (key) => <span>{key}(comp.)</span>,
        component: (col, key) => <span>{col[key]} (comp.)</span>
    },{
        key: 'date'
    },{
        key: 'actions',
        component: o => <button onClick={() => {
            console.log(o)
        }}>what</button>
    }],
    footers: [{
        key: 'id',
    },{
        key: 'entityid',
        onClick: (o, col) => {
            console.log('click footer colum: ', o)
            console.log('col: ', col)
        },
        component: ({key}) => <span>{key} (comp.)</span>
    },{
        key: 'name'
    },{
        key: 'date'
    },{
        key: 'actions'
    }],
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
    height: 500,
    width: 1200
}

export default () => {
    return <div className="Wrapper">
        <HyperTable {...props} />
    </div>
}