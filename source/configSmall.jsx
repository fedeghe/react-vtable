import generateRowData from './utils';
export default {
    columns: [
        { key: 'id', },
        { key: 'entityid', },
        { key: 'name', },
        { key: 'date', },
        { key: 'actions', },
        { key: 'id2', },
        { key: 'date2', },
        { key: 'entityid2', },
        { key: 'name2', },
        { key: 'id3', },
        { key: 'date3', },
        { key: 'entityid3', },
        { key: 'name3', }
    ],
    data: generateRowData([
        { key: 'id', type: 'int' },
        { key: 'entityid', type: 'id' },
        { key: 'name', type: 'str' },
        { key: 'date', type: 'date' },
        { key: 'actions', type: 'str' },
        { key: 'id2', type: 'int' },
        { key: 'entityid2', type: 'int' },
        { key: 'name2', type: 'str' },
        { key: 'date2', type: 'date' },
        { key: 'id3', type: 'id' },
        { key: 'entityid3', type: 'int' },
        { key: 'name3', type: 'str' },
        { key: 'date3', type: 'date' },
    ], 1e5),
};