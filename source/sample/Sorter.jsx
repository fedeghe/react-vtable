import React from 'react';

const Sorter =  ({sort}) => {
    const {sortAsc, sortDesc, unsort, direction, isSorting} = sort;
    return <div style={{display:'inline-block', marginLeft:'5px'}}>
        <span style={{cursor:'pointer', color: isSorting && direction === 'asc' ? 'green' : 'black' }} onClick={() => sortAsc()}>▲</span>
        <span style={{cursor:'pointer' }} onClick={() => direction && unsort()}>&bull;</span>
        <span style={{cursor:'pointer', color: isSorting && direction === 'desc' ? 'green' : 'black' }} onClick={() => sortDesc()}>▼</span>
    </div>;
};
export default Sorter;
//▲ &bull; ▼ 