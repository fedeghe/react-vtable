import React from 'react'

const Sorter =  ({sort}) => {
    console.log('Sorter render')
    const {sortAsc, sortDesc, unsort, direction} = sort;

    return <>
            <span onClick={() => direction !== 'asc' && sortAsc()}>▲</span>
            <span onClick={() => direction && unsort()}>&bull;</span>
            <span onClick={() => direction !== 'desc' && sortDesc()}>▼</span>
        </>
}
export default Sorter
//▲ &bull; ▼ 