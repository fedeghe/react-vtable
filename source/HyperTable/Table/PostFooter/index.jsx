import React, {useContext} from 'react'
import TableContext from '../../Context'
import useStyles from './style.js'
import {isFunction} from './../../utils'
export default () => {
    const {
            state: {
                postFooterHeight,
                PostFooter,
                total,
                activeColumn, activeRow,
                activeColumnIndex, activeRowIndex,
                virtual:{
                    from, to, 
                }
            },
        } = useContext(TableContext),
        classes = useStyles({postFooterHeight});
    return (
        PostFooter && <div className={classes.PostFooter}>{
            isFunction(PostFooter)
            ? <PostFooter {...{from, to, total, activeColumn, activeRow, activeColumnIndex, activeRowIndex}}/>
            : PostFooter
        }</div>
    );
}
