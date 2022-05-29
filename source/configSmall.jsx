import generateRowData from './utils';

export default {
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