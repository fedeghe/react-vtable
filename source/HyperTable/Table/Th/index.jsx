import React, { useCallback, useContext } from 'react';
import TableContext from '../../Context';

const Th = ({ row, column, rowIndex, columnIndex, cls, content, pos, style }) => {
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

        handlers = {
            onMouseEnter: useCallback(
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
            onMouseLeave: useCallback(
                () => dealWithEvent && dispatch({ type: 'cellLeave' }),
                [dealWithEvent, dispatch]
            )
        };

    return <th
        
        key={`foot${rowIndex || columnIndex}`} className={cls}
        {...handlers}
    >   
        <div style={style}>
            {content}
        </div>
    </th>;
};
export default Th;