import React from 'react';
import useStyles from './style.js';

const Visibilist =  ({ visibility }) => {
    const classes = useStyles(),
        {visible, setVisibility} = visibility;

    return <div className={classes.Container}>{
        visible
        ? <span className={classes.Pointer} onClick={() => setVisibility(false)}>hide</span>
        : <span className={classes.Pointer} onClick={() => setVisibility(true)}>+</span>
    }</div>;
};
export default Visibilist;
