import React from 'react';
import useStyles from './style.js';

const Visibilist =  ({ visibility }) => {
    const classes = useStyles(),
        {visible, setVisibility} = visibility;

    return <div className={classes.Container}>{
        visible
        ? <span onClick={() => setVisibility(false)}>hide</span>
        : <span onClick={() => setVisibility(true)}>+</span>
    }</div>;
};
export default Visibilist;
