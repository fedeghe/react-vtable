import React from 'react'
import generateRowData from './../../source/sample/utils';
export default {
    dimensions: {
        height: 200,
        width: 400,
        rowHeight: 40
    },
    headers: [{
        key: 'id',
        width:300,
        cell: ({ row, header, rowIndex, headerIndex }) => <div data-uie={'uie-' + rowIndex+ '-'+headerIndex}>{row[header.key]}</div>,
    }, {
        key: 'entityid',
        cell: ({ row, header, rowIndex, headerIndex }) => <div data-uie={'uie-' + rowIndex+ '-'+headerIndex}>{row[header.key]}</div>,
    }, {
        key: 'name',
        cell: ({ row, header, rowIndex, headerIndex }) => <div data-uie={'uie-' + rowIndex+ '-'+headerIndex}>{row[header.key]}</div>,
        width:300,

    }],
    data: generateRowData([
        { key: 'id', type: 'int' },
        { key: 'entityid', type: 'id' },
        { key: 'name', type: 'str' }
    ], 50, true),
    gap: 5,
};