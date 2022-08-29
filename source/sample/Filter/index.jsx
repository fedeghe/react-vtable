import React, { useState } from 'react';
import useStyles from './style.js';

export default ({filter}) => {
    const {value, setValue, visibility, setVisibility, unFilter} = filter,
        classes = useStyles({visibility}),    
        [human, setHuman] = useState(false);

    return <div className={classes.Container}>{
        visibility
        ? <div>
            <input type="text" onChange={e => setValue(e.target.value.replace(/^\s/g, ''))} value={value} autoFocus={human}/>
            <i className={['bi', 'bi-x-lg', classes.Close, classes.Pointer].join(' ')} onClick={() => {
                setValue('');
                setHuman(false);
                setVisibility(false);
            }}/>
            
            {/* <i className={['bi', 'bi-filter-circle-fill', classes.Pointer].join(' ')} title={"unfilter all"} onClick={unFilter}/> */}
        </div>
        : <i className={['bi', 'bi-filter', classes.Pointer].join(' ')} onClick={() => {
            setHuman(true);
            setVisibility(true);
        }}/>
    }</div>;
};