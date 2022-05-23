import React, { useCallback, useContext } from 'react'
import TableContext from '../../Context'

// TODO : 
/*
This still needs to be usabe in leftMost and rightMost
small changes are needed
*/


export default ({column, i, j, cls, content, isHeader, isFooter}) => {
    const {
        state: {
            rowHeight,
            virtual: {
                from
            },
            cellClick, cellEnter, cellLeave,
            onFooterHighlight,
            onHeaderHighlight
        },
        dispatch
    } = useContext(TableContext);

    const onMouseEnter = useCallback(e => {
        if (
            (isFooter && onFooterHighlight)
            || (isHeader && onHeaderHighlight)
        ) dispatch({
            type: 'cellHover',
            payload: {
                row: null,
                column,
                rowIndex: null,
                columnIndex: j
            }
        })
    }, [])

    const onMouseLeave = useCallback(e => {
        if (
            (isFooter && onFooterHighlight)
            || (isHeader && onHeaderHighlight)
        ) dispatch({ type: 'cellOut' })
    }, [])


    return ( <th
        key={`foot${j}`} className={cls}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {content}
    </th>)
}
