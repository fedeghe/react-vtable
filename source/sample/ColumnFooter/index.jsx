import React from 'react';
import Filter from './../Filter';
import Sorter from './../Sorter';

export default  ({
    header, headerIndex,
    filter, //: {value, setValue, visibility, setVisibility} = {},
    sort, //: {sortAsc, sortDesc, unSort, direction, isSorting} = {}
}) => (<div style={{ display: 'flex', alignItems: 'center' }}>
    <span>{header.label + '_' + headerIndex}</span>
    <Filter {...{ header, headerIndex, filter }} />
    <Sorter {...{ header, headerIndex, sort }} />
</div>);