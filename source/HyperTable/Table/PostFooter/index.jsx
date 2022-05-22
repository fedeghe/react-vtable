import React, {useContext} from 'react'
import TableContext from '../../Context'
import useStyles from './style.js'
export default () => {
    const {
            state: {
                postFooterHeight,
                PostFooter,
                total,
                activeCol, activeRow,
                activeColIndex, activeRowIndex,
                virtual:{
                    from, to, 
                }
            },
        } = useContext(TableContext),
        classes = useStyles({postFooterHeight});
    return (
        PostFooter && <div className={classes.PostFooter}>{
            typeof PostFooter === 'function'
            ? <PostFooter {...{from, to, total, activeCol, activeRow, activeColIndex, activeRowIndex}}/>
            : PostFooter
        }</div>
    );
}
