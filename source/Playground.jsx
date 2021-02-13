import React from 'react'

import HyperTable from './HyperTable'
import {generateRowData} from './utils'

import './user.less'
const props = {
    columns: [{
        key: 'id',
    },{
        key: 'entityid',
    },{
        key: 'name'
    },{
        key: 'date'
    }],
    footers: [{
        key: 'id',
    },{
        key: 'entityid'
    },{
        key: 'name'
    },{
        key: 'date'
    }],
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
    width: 800
}

export default () => {
    return <div className="Wrapper">
        <HyperTable {...props} />
    </div>
}