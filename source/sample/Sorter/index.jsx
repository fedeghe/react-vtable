import React from 'react';
import useStyles from './style.js';

const Sorter =  ({sort}) => {
    const {sortAsc, sortDesc, unSort, direction, isSorting} = sort,
        classes = useStyles({isSorting, direction});
    return <div className={classes.Container}>
        <span className={[classes.Item, classes.Ascending].join(' ')} onClick={sortAsc}>▲</span>
        {direction && isSorting &&  <span className={classes.Item} onClick={unSort}>&times;</span>}
        <span className={[classes.Item, classes.Descending].join(' ')} onClick={sortDesc}>▼</span>
    </div>;
};
export default Sorter;
//▲ &bull; ▼ 