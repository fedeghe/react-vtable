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
    }, {
        key: 'entityid',
    }, {
        key: 'name',
        width:300,
    }],
    data: generateRowData([
        { key: 'id', type: 'int' },
        { key: 'entityid', type: 'id' },
        { key: 'name', type: 'str' }
    ], 1000, true),
    gap: 2,
};