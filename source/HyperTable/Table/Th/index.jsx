import React, { useCallback, useContext } from 'react';
import TableContext from '../../Context';

const Th = ({ row, column, rowIndex, columnIndex, cls, content, pos, style }) => {
    const {
            state: {
                onFooterHighlight,
                onHeaderHighlight,
                onRightMostHighlight,
                onLeftMostHighlight,
            },
            dispatch
        } = useContext(TableContext),

        dealWithEvent = {
            header: onHeaderHighlight,
            footer: onFooterHighlight,
            rightMost: onRightMostHighlight,
            leftMost: onLeftMostHighlight
        }[pos],

        handlers = {
            onMouseEnter: useCallback(
                () => dealWithEvent && dispatch({
                    type: 'cellHover',
                    payload: {
                        row,
                        column,
                        rowIndex,
                        columnIndex
                    }
                }),
                [column, columnIndex, dealWithEvent, dispatch, row, rowIndex]
            ),
            onMouseLeave: useCallback(
                () => dealWithEvent && dispatch({ type: 'cellOut' }),
                [dealWithEvent, dispatch]
            )
        };

    return <th
        style={style}
        key={`foot${rowIndex || columnIndex}`} className={cls}
        {...handlers}
    >
        {content}
    </th>;
};
export default Th;