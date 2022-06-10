import React, { useContext, useCallback } from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
const Td = ({row, column, rowIndex, columnIndex, cls, children, style}) => {
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
        onMouseLeave = useCallback(e => {
            onCellLeave && onCellLeave.call(e, e, { row, column, rowIndex: from + rowIndex, columnIndex });
            dispatch({ type: 'cellLeave' });
        }, [onCellLeave, column, columnIndex, dispatch, from, row, rowIndex]),
        onClick = useCallback(e => onCellClick && onCellClick.call(e, e, { row, column }), [onCellClick, column, row]),
        handlers = {
            onMouseEnter,
            onMouseLeave,
            onClick
        };

    return <td
        style={{padding:0}}
        className={[cls, cellClass].join(' ')}
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

export default Td;