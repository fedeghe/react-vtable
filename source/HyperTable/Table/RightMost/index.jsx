import React, {useContext, useCallback} from 'react'
import TableContext from '../../Context'

export default ({cls, opts}) => {
    const {
        state: {
            rightMost,
            virtual:{
                from, to, 
            },
            onRightMostHighlight
        },
        dispatch
    } = useContext(TableContext);
    const onMouseEnter = useCallback(e => 
        onRightMostHighlight && dispatch({
            type: 'cellHover',
            payload: {
                row : opts.row,
                column: null,
                rowIndex: opts.i,
                columnIndex: null
            }
        }), [])
    const onMouseLeave = useCallback(e => 
        onRightMostHighlight && dispatch({ type: 'cellOut' }),
        []
    )
    return (
        Boolean(rightMost) && (
            <th
                className={`TableRightMost ${cls}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {rightMost({from, to, ...opts})}
            </th>
        )
    );
}
