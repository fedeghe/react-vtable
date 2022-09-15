import React from 'react';
import Filter from './../Filter';
import Sorter from './../Sorter';
import Visibilist from './../Visibilist';

export default  ({
    header, headerIndex,
    filter, //: {value, setValue, visibility, setVisibility} = {},
    sort, //: {sortAsc, sortDesc, unSort, direction, isSorting} = {},
    visibility
}) => (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {Boolean(visibility.isVisible) && <>
                <Sorter {...{ header, headerIndex, sort }} />
                <span>{header.label + '_' + headerIndex}</span>
                <Filter {...{ header, headerIndex, filter }} />
            </>}
            <Visibilist {...{visibility}}/>
</div>);