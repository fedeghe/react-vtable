import React, {useContext} from 'react'
import TableContext from '../../Context'
import useStyles from './style.js'
import {isFunction} from './../../utils'
export default () => {
    const {
            state: {
                preHeaderHeight,
                PreHeader,
                total,
                activeColumn, activeRow,
                activeColumnIndex, activeRowIndex,
                virtual:{
                    from, to, 
                }
            },
        } = useContext(TableContext),
        classes = useStyles({preHeaderHeight});
    
    return (
        PreHeader && <div className={classes.PreHeader}>{
            isFunction(PreHeader)
            ? <PreHeader {...{from, to, total, activeColumn, activeRow, activeColumnIndex, activeRowIndex}}/>
            : PreHeader
        }</div>
    );
}
