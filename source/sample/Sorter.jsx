import React from 'react';

const Sorter =  ({sort}) => {
    const {sortAsc, sortDesc, unsort, direction} = sort;
    return <>
        <span style={{cursor:'pointer'}} onClick={() => sortAsc()}>▲</span>
        <span style={{cursor:'pointer'}} onClick={() => direction && unsort()}>&bull;</span>
        <span style={{cursor:'pointer'}} onClick={() => sortDesc()}>▼</span>
    </>;
};
export default Sorter;
//▲ &bull; ▼ 