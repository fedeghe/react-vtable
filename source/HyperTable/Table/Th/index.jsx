import React, { useCallback, useContext } from 'react'
import TableContext from '../../Context'

export default ({ row, column, rowIndex, columnIndex, cls, content, pos }) => {
    const {
        state: {
            onFooterHighlight,
            onHeaderHighlight,
            onRightMostHighlight,
            onLeftMostHighlight,
        },
        dispatch
    } = useContext(TableContext);

    const dealWithEvent = {
        header: onHeaderHighlight,
        footer: onFooterHighlight,
        rightMost: onRightMostHighlight,
        leftMost: onLeftMostHighlight
    }[pos]

    const handlers = {
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
            []
        ),
        onMouseLeave: useCallback(
            () => dealWithEvent && dispatch({ type: 'cellOut' }),
            []
        )
    }

    return (<th
        key={`foot${rowIndex || columnIndex}`} className={cls}
        {...handlers}
    >
        {content}
    </th>)
}
