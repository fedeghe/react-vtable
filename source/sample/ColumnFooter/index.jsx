import React from 'react';
import Filter from './../Filter';
import Sorter from './../Sorter';

export default  ({
    footer, footerIndex,
    filter, //: {value, setValue, visibility, setVisibility} = {},
    sort, //: {sortAsc, sortDesc, unSort, direction, isSorting} = {}
    visibility
}) => (<div style={{ display: 'flex', alignItems: 'center' }}>
    {Boolean(visibility.isVisible) && <>
        <span>{footer.label + '_' + footerIndex}</span>
        <Filter {...{ header: footer, headerIndex: footerIndex, filter }} />
        <Sorter {...{ header: footer, headerIndex: footerIndex, sort }} />
    </>}
</div>);