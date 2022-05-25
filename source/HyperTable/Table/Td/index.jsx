import React, { useContext, useCallback } from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
const Td = ({row, column, rowIndex, columnIndex, cls, content}) => {
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
        classes = useStyles({ rowHeight }),
        handlers = {
            onMouseEnter: useCallback(e => {
                cellEnter && cellEnter.call(e, e, { row, column, rowIndex: from + rowIndex, colIndex: columnIndex });
                dispatch({
                    type: 'cellHover',
                    payload: {
                        row,
                        column,
                        rowIndex: from + rowIndex,
                        columnIndex
                    }
                });
            }, [cellEnter, column, columnIndex, dispatch, from, row, rowIndex]),
            onMouseLeave: useCallback(e => {
                cellLeave && cellLeave.call(e, e, { row, column, rowIndex: from + rowIndex, columnIndex });
                dispatch({ type: 'cellOut' });
            }, [cellLeave, column, columnIndex, dispatch, from, row, rowIndex]),
            onClick: useCallback(e => cellClick && cellClick.call(e, e, { row, column }), [cellClick, column, row])
        };

    return <td
        className={cls}
        {...handlers}
    >
        <div className={classes.Cell}>
            {content}
        </div>
    </td>;
};

export default Td;