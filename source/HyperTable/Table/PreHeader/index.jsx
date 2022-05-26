import React, {useContext} from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
import {isFunction} from './../../utils';
const PreHeader = () => {
    const {
            state: {
                preHeaderHeight,
                PreHeader,
                total,
                activeColumn, activeRow,
                activeColumnIndex, activeRowIndex,
                filtered,
                virtual:{
                    from, to, 
                    scrollTop
                }
            },
        } = useContext(TableContext),
        classes = useStyles({preHeaderHeight});
    
    return (
        PreHeader && <div className={classes.PreHeader}>{
            isFunction(PreHeader)
            ? <PreHeader {...{from, to, total, activeColumn, activeRow, activeColumnIndex, activeRowIndex, filtered, scrollTop}}/>
            : PreHeader
        }</div>
    );
};

export default PreHeader;