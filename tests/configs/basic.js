import generateRowData from './../../source/utils';
export default {
    dimensions:{
        width:800,
        height: 400,
        rowHeight:20
    },
    columns: [{
        key: 'id',
        label: 'idz',
        width:300,
        cell: ({ row, column }) => row[column.key],
    }, {
        key: 'entityid',
        label: 'entity id',
    }, {
        key: 'name',
        label: 'name',
        cell: ({ row, column }) => row[column.key],
        width:300,

    }],
    data: generateRowData([
        { key: 'id', type: 'int' },
        { key: 'entityid', type: 'id' },
        { key: 'name', type: 'str' }
    ], 1000)
};