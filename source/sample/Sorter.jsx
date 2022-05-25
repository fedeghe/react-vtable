import React from 'react'

const Sorter =  ({sort}) => {
    console.log('Sorter render')
    const {sortAsc, sortDesc, unsort, direction} = sort;

    return <>
            <span style={{cursor:'pointer'}} onClick={() => direction !== 'asc' && sortAsc()}>▲</span>
            <span style={{cursor:'pointer'}} onClick={() => direction && unsort()}>&bull;</span>
            <span style={{cursor:'pointer'}} onClick={() => direction !== 'desc' && sortDesc()}>▼</span>
        </>
}
export default Sorter
//▲ &bull; ▼ 