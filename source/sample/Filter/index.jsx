import React from 'react';
import useStyles from './style.js';

const Filter =  ({filter}) => {
    const classes = useStyles(),
        {value, setValue, visibility, setVisibility, unfilter} = filter;

    return <div className={classes.Container}>{
        visibility
        ? <div>
            <input type="text" onChange={e => setValue(e.target.value.replace(/^\s/g, ''))} value={value} autoFocus/>
            <span className={classes.Pointer} onClick={() => {
                setValue('');
                setVisibility(false);
            }}>&times;</span>
            <span onClick={unfilter}>unfilter</span>
        </div>
        : <span className={classes.Pointer} onClick={() => setVisibility(true)}>Y</span>
    }</div>;
};
export default Filter;
