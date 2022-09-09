import React, { useCallback, useContext } from 'react';
import TableContext from '../../Context';
import { ACTION_TYPES } from '../../reducer';
import useStyles from './style.js';

export default ({ row, column, rowIndex, columnIndex, cls, children, pos, wrapperStyle }) => {
    const {
            state: {
                events: {
                    onFooterHighlight,
                    onHeaderHighlight,
                    onRightMostHighlight,
                    onLeftMostHighlight,
                }
            },
            dispatch
        } = useContext(TableContext),

        dealWithEvent = {
            header: onHeaderHighlight,
            footer: onFooterHighlight,
            rightMost: onRightMostHighlight,
            leftMost: onLeftMostHighlight
        }[pos],
        onMouseEnter = useCallback(
            () => dealWithEvent && dispatch({
                type: ACTION_TYPES.CELL_ENTER,
                payload: {
                    row,
                    column,
                    rowIndex,
                    columnIndex
                }
            }),
            [column, columnIndex, dealWithEvent, dispatch, row, rowIndex]
        ),
        onMouseLeave = useCallback(
            () => dealWithEvent && dispatch({ type: ACTION_TYPES.CELL_LEAVE }),
            [dealWithEvent, dispatch]
        ),
        handlers = {
            onMouseEnter,
            onMouseLeave
        },
        classes = useStyles();

    return <th
        className={[classes.Th, cls].join(' ')}
        key={`Th${rowIndex || columnIndex}`}
        {...handlers}
    >   
        <div style={wrapperStyle}>
            {children}
        </div>
    </th>;
};
