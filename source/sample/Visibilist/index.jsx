import React from 'react';
import useStyles from './style.js';

export default ({ visibility }) => {
    const classes = useStyles(),
        {isVisible, setVisibility, header} = visibility;

    return <div className={classes.Container}>{
        isVisible
        ? <span className={classes.Pointer} title={`hide column \`${header.key}\``} onClick={() => setVisibility(false)}>hide</span>
        : <span className={classes.Pointer} title={`show column \`${header.key}\``} onClick={() => setVisibility(true)}>+</span>
    }</div>;
};
