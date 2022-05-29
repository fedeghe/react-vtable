import generateRowData from './../../source/utils';
export default {
    
    columns: [{
        key: 'id',
        label: 'idz',
        width:300,
        cell: ({ row, column }) => row[column.key],

        // header: ({
        //     column, columnIndex,
        //     filter, //: {value, setValue, visibility, setVisibility} = {},
        //     sort, //: {sortAsc, sortDesc, unsort, direction} = {}
        //     isSorting
        // }) => (<div style={{display: 'flex', alignItems: 'center'}}>
        //     <span>{column.label + '_' + columnIndex}</span>
        //     <Filter {...{column, columnIndex, filter}}/>
        //     <Sorter {...{column, columnIndex, sort, isSorting}}/>
        // </div>),
        // footer: ({ column, columnIndex }) => column.key + '_' + columnIndex,
        // filter: basicFilter,
        // sort: basicSort,
    }, {
        key: 'entityid',
        label: 'entity id',

    }, {
        key: 'name',
        label: 'name',
        cell: ({ row, column }) => row[column.key],
        width:300,

    }, {
        key: 'date',
        cell: ({ row, column }) => row[column.key],
        width:100
    }, 
    {
        key: 'id2',
        width:150,
        cell: ({ row, column }) => row[column.key],


    },
    {
        key: 'date2',
        cell: ({ row, column }) => row[column.key],
        width:300
    },
    { 
        key: 'entityid2',
    },
    { 
        key: 'name2',
    },
    { 
        key: 'id3',
    },
    {
        key: 'date3',
        cell: ({ row, column }) => row[column.key],
        width:300
    },
    {
        key: 'entityid3',
    },
    { 
        key: 'name3',
    }],
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

    ], 1000)
};