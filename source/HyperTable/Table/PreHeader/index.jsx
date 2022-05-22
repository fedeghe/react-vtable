import React, {useContext} from 'react'
import TableContext from '../../Context'
import useStyles from './style.js'
export default () => {
    const {
        state: {
            preHeaderHeight,
            PreHeader,
            total,
            activeCol, activeRow,
            activeColIndex, activeRowIndex,
            virtual:{
                from, to, 
            }
        },
        state
    } = useContext(TableContext)
    const classes = useStyles({preHeaderHeight});
    
    return (
        PreHeader && <div className={classes.PreHeader}>{
            typeof PreHeader === 'function'
            ? <PreHeader {...{from, to, total, activeCol, activeRow, activeColIndex, activeRowIndex}}/>
            : PreHeader
        }</div>
    )
}
