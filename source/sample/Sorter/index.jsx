import React from 'react';
import useStyles from './style.js';

export default ({sort}) => {
    const {sortAsc, sortDesc, unSort, direction, isSorting} = sort,
        classes = useStyles({isSorting, direction});
    return <div className={classes.Container}>
        <i className={['bi', 'bi-sort-down-alt', classes.Item, classes.Ascending].join(' ')}
            onClick={() => {(!isSorting || direction !== 'asc')  ? sortAsc() : unSort();}}
        />
        {/* {direction && isSorting &&  <span className={classes.Item} onClick={unSort}>&times;</span>} */}
        <i className={['bi', 'bi-sort-down', classes.Item, classes.Descending].join(' ')}
            onClick={() => {(!isSorting || direction !== 'desc')  ? sortDesc() : unSort();}}
        />
        
    </div>;
};

//▲ &bull; ▼ 