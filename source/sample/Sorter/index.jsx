import React from 'react';
import useStyles from './style.js';

export default ({sort}) => {
    const {sortAsc, sortDesc, unSort, direction, isSorting} = sort,
        classes = useStyles({isSorting, direction});
    return <div className={classes.Container}>
        <span data-cy="sort-asc" className={[classes.Item, classes.Ascending].join(' ')} onClick={sortAsc}>▲</span>
        {direction && isSorting &&  <span data-cy="sort-unsort" className={classes.Item} onClick={unSort}>&times;</span>}
        <span data-cy="sort-desc" className={[classes.Item, classes.Descending].join(' ')} onClick={sortDesc}>▼</span>
    </div>;
};

//▲ &bull; ▼ 