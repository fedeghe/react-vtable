import React, { useContext, useCallback } from 'react';
import TableContext from './../../Context';
import { ACTION_TYPES } from './../../reducer/actions';
import useStyles from './style.js';
export default ({row, header, rowIndex, headerIndex, cls, children, wrapperStyle}) => {
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
            onCellEnter && onCellEnter.call(e, e, { row, header, rowIndex: fromRow + rowIndex, colIndex: headerIndex });
            dispatch({
                type: ACTION_TYPES.CELL_ENTER,
                payload: {
                    row,
                    header,
                    rowIndex: fromRow + rowIndex,
                    headerIndex
                }
            });
        }, [onCellEnter, header, headerIndex, dispatch, fromRow, row, rowIndex]),
        onMouseLeave = useCallback(e => {
            onCellLeave && onCellLeave.call(e, e, { row, header, rowIndex: fromRow + rowIndex, headerIndex });
            dispatch({ type: ACTION_TYPES.CELL_LEAVE });
        }, [onCellLeave, header, headerIndex, dispatch, fromRow, row, rowIndex]),
        onClick = useCallback(e => onCellClick && onCellClick.call(e, e, { row, header }), [onCellClick, header, row]),
        handlers = {
            onMouseEnter,
            onMouseLeave,
            onClick
        };

    return <td
        className={[classes.Td, cls, cellClass].join(' ')}
        {...handlers}
    >
        <div className={classes.Cell} style={wrapperStyle}>
            {contentClass ? <div className={contentClass}>
                {children}
            </div>
            : children}
        </div>
    </td>;
};

