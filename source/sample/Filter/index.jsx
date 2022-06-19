import React, { useState } from 'react';
import useStyles from './style.js';

export default ({filter}) => {
    const classes = useStyles(),
        {value, setValue, visibility, setVisibility, unFilter} = filter,
        [human, setHuman] = useState(false);

    return <div className={classes.Container}>{
        visibility
        ? <div>
            <input type="text" onChange={e => setValue(e.target.value.replace(/^\s/g, ''))} value={value} autoFocus={human}/>
            <span className={classes.Pointer} onClick={() => {
                setValue('');
                setHuman(false);
                setVisibility(false);
            }}>&times;</span>
            &nbsp;|&nbsp;
            <span data-cy="filter-unfilter-all" className={classes.Pointer} onClick={unFilter}>unfilter all</span>
        </div>
        : <span className={classes.Pointer} onClick={() => {
            setHuman(true);
            setVisibility(true);
        }}>Y</span>
    }</div>;
};
