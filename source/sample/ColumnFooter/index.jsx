import React from 'react';
import Filter from './../Filter';
import Sorter from './../Sorter';

export default  ({
    column, columnIndex,
    filter, //: {value, setValue, visibility, setVisibility} = {},
    sort, //: {sortAsc, sortDesc, unSort, direction, isSorting} = {}
}) => (<div style={{ display: 'flex', alignItems: 'center' }}>
    <span>{column.label + '_' + columnIndex}</span>
    <Filter {...{ column, columnIndex, filter }} />
    <Sorter {...{ column, columnIndex, sort }} />
</div>);