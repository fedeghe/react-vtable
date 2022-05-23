import React, { useContext, useCallback } from 'react'
import TableContext from '../../Context'
import useStyles from './style.js'
export default ({row, column, i, j, cls, content}) => {
    const {
        state: {
            rowHeight,
            virtual: {
                from
            },
            cellClick, cellEnter, cellLeave
        },
        dispatch
    } = useContext(TableContext),
        classes = useStyles({ rowHeight });

    const handlers = {
        onMouseEnter: useCallback(e => {
            cellEnter.call(e, e, { row, column, rowIndex: from + i, colIndex: j })
            dispatch({
                type: 'cellHover',
                payload: {
                    row,
                    column,
                    rowIndex: from + i,
                    columnIndex: j
                }
            });
        }, []),
        onMouseLeave: useCallback(e => {
            cellLeave.call(e, e, { row, column, rowIndex: from + i, columnIndex: j });
            dispatch({ type: 'cellOut' });
        }, []),
        onClick: useCallback(e => cellClick.call(e, e, { row, column }), [])
    }

    return (<td
        className={cls}
        {...handlers}
    >
        <div className={classes.Cell}>
            {content}
        </div>
    </td>)
}
