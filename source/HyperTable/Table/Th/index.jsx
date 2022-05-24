import React, { useCallback, useContext } from 'react'
import TableContext from '../../Context'

export default ({column, row, i, j, cls, content, pos}) => {
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
        header : onHeaderHighlight,
        footer : onFooterHighlight,
        rightMost : onRightMostHighlight,
        leftMost: onLeftMostHighlight
    }[pos]

    const onMouseEnter = useCallback(e => {
        dealWithEvent && dispatch({
            type: 'cellHover',
            payload: {
                row,
                column,
                rowIndex: i,
                columnIndex: j
            }
        })
    }, [])

    const onMouseLeave = useCallback(e => {
        dealWithEvent && dispatch({ type: 'cellOut' })
    }, [])

    return ( <th
        key={`foot${j||i}`} className={cls}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {content}
    </th>)
}
