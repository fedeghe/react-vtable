import React, { useContext, useCallback } from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
const Td = ({row, column, rowIndex, columnIndex, cls, content, style}) => {
    const {
            state: {
                dimensions: {
                    rowHeight
                },
                virtual: {
                    from
                },
                events: {
                    onCellClick, onCellEnter, onCellLeave
                }, cellClass
            },
            dispatch
        } = useContext(TableContext),
        classes = useStyles({ rowHeight }),
        handlers = {
            onMouseEnter: useCallback(e => {
                onCellEnter && onCellEnter.call(e, e, { row, column, rowIndex: from + rowIndex, colIndex: columnIndex });
                dispatch({
                    type: 'cellEnter',
                    payload: {
                        row,
                        column,
                        rowIndex: from + rowIndex,
                        columnIndex
                    }
                });
            }, [onCellEnter, column, columnIndex, dispatch, from, row, rowIndex]),
            onMouseLeave: useCallback(e => {
                onCellLeave && onCellLeave.call(e, e, { row, column, rowIndex: from + rowIndex, columnIndex });
                dispatch({ type: 'cellLeave' });
            }, [onCellLeave, column, columnIndex, dispatch, from, row, rowIndex]),
            onClick: useCallback(e => onCellClick && onCellClick.call(e, e, { row, column }), [onCellClick, column, row])
        };

    return <td
        className={cls}
        {...handlers}
    >
        <div className={classes.Cell} style={style}>
            <div className={cellClass}>
                {content}
            </div>
        </div>
    </td>;
};

export default Td;