import React, { useCallback, useContext } from 'react';
import TableContext from '../../Context';

const Th = ({ row, column, rowIndex, columnIndex, cls, children, pos, style }) => {
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
                type: 'cellEnter',
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
            () => dealWithEvent && dispatch({ type: 'cellLeave' }),
            [dealWithEvent, dispatch]
        ),
        handlers = {
            onMouseEnter,
            onMouseLeave
        };

    return <th
        style={{padding:0}}
        key={`foot${rowIndex || columnIndex}`} className={cls}
        {...handlers}
    >   
        <div style={style}>
            {children}
        </div>
    </th>;
};
export default Th;