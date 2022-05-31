import React from 'react'
import generateRowData from './../../source/utils';
export default {
    dimensions: {
        height: 200,
        width: 400,
        rowHeight: 40
    },
    columns: [{
        key: 'id',
        width:300,
        cell: ({ row, column, rowIndex, columnIndex }) => <div data-uie={'uie-' + rowIndex+ '-'+columnIndex}>{row[column.key]}</div>,
    }, {
        key: 'entityid',
        cell: ({ row, column, rowIndex, columnIndex }) => <div data-uie={'uie-' + rowIndex+ '-'+columnIndex}>{row[column.key]}</div>,
    }, {
        key: 'name',
        cell: ({ row, column, rowIndex, columnIndex }) => <div data-uie={'uie-' + rowIndex+ '-'+columnIndex}>{row[column.key]}</div>,
        width:300,

    }],
    data: generateRowData([
        { key: 'id', type: 'int' },
        { key: 'entityid', type: 'id' },
        { key: 'name', type: 'str' }
    ], 1000, true),
    gap: 5,
};