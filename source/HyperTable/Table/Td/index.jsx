import React, { useContext, useCallback } from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
export default ({row, column, rowIndex, columnIndex, cls, children, style}) => {
    const {
            state: {
                dimensions: {
                    rowHeight
                },
                virtual: {
                    fromRow
                },
                events: {
                    onCellClick, onCellEnter, onCellLeave
                },
                cls: {
                    elements: {
                        contentClass,
                        cellClass
                    }
                }
            },
            dispatch
        } = useContext(TableContext),
        classes = useStyles({ rowHeight }),
        onMouseEnter = useCallback(e => {
            onCellEnter && onCellEnter.call(e, e, { row, column, rowIndex: fromRow + rowIndex, colIndex: columnIndex });
            dispatch({
                type: 'cellEnter',
                payload: {
                    row,
                    column,
                    rowIndex: fromRow + rowIndex,
                    columnIndex
                }
            });
        }, [onCellEnter, column, columnIndex, dispatch, fromRow, row, rowIndex]),
        onMouseLeave = useCallback(e => {
            onCellLeave && onCellLeave.call(e, e, { row, column, rowIndex: fromRow + rowIndex, columnIndex });
            dispatch({ type: 'cellLeave' });
        }, [onCellLeave, column, columnIndex, dispatch, fromRow, row, rowIndex]),
        onClick = useCallback(e => onCellClick && onCellClick.call(e, e, { row, column }), [onCellClick, column, row]),
        handlers = {
            onMouseEnter,
            onMouseLeave,
            onClick
        };

    return <td
        className={[classes.Td, cls, cellClass].join(' ')}
        {...handlers}
    >
        <div className={classes.Cell} style={style}>
            {contentClass ? <div className={contentClass}>
                {children}
            </div>
            : children}
        </div>
    </td>;
};

