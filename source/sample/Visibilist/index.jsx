import React from 'react';
import useStyles from './style.js';

export default ({ visibility }) => {
    const classes = useStyles(),
        {isVisible, setVisibility, column} = visibility;

    return <div className={classes.Container}>{
        isVisible
        ? <span className={classes.Pointer} title={`hide column \`${column.key}\``} onClick={() => setVisibility(false)}>hide</span>
        : <span className={classes.Pointer} title={`show column \`${column.key}\``} onClick={() => setVisibility(true)}>+</span>
    }</div>;
};
