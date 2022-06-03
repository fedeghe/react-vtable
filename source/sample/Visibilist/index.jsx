import React from 'react';
import useStyles from './style.js';

const Visibilist =  ({ visibility }) => {
    const classes = useStyles(),
        {visible, setVisibility, column} = visibility;

    return <div className={classes.Container}>{
        visible
        ? <span className={classes.Pointer} title={`hide column \`${column.key}\``} onClick={() => setVisibility(false)}>hide</span>
        : <span className={classes.Pointer} title={`show column \`${column.key}\``} onClick={() => setVisibility(true)}>+</span>
    }</div>;
};
export default Visibilist;
