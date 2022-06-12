import React from 'react';
import useStyles from './style.js';

const Filter =  ({filter}) => {
    const classes = useStyles(),
        {value, setValue, visibility, setVisibility, unFilter} = filter;

    return <div className={classes.Container}>{
        visibility
        ? <div>
            <input data-cy="filter-input" type="text" onChange={e => setValue(e.target.value.replace(/^\s/g, ''))} value={value} autoFocus/>
            <span data-cy="filter-close" className={classes.Pointer} onClick={() => {
                setValue('');
                setVisibility(false);
            }}>&times;</span>
            &nbsp;|&nbsp;
            <span data-cy="filter-unfilter-all" className={classes.Pointer} onClick={unFilter}>unfilter all</span>
        </div>
        : <span data-cy="filter-button" className={classes.Pointer} onClick={() => setVisibility(true)}>Y</span>
    }</div>;
};
export default Filter;
