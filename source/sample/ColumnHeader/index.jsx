import React from 'react';
import Filter from './../Filter';
import Sorter from './../Sorter';
import Visibilist from './../Visibilist';

export default  ({
    column, columnIndex,
    filter, //: {value, setValue, visibility, setVisibility} = {},
    sort, //: {sortAsc, sortDesc, unSort, direction, isSorting} = {},
    visibility
}) => (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {Boolean(visibility.isVisible) && <>
                <Sorter {...{ column, columnIndex, sort }} />
                <span>{column.label + '_' + columnIndex}</span>
                <Filter {...{ column, columnIndex, filter }} />
            </>}
            <Visibilist {...{visibility}}/>
</div>);