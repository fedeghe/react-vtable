import React, {useContext, useCallback} from 'react';
import TableContext from '../../Context';

export default ({cls, opts}) => {
    const {
        state: {
            leftMost,
            virtual:{
                from, to, 
            },
            onLeftMostHighlight
        },
        dispatch
    } = useContext(TableContext);
    
    const onMouseEnter = useCallback(
        e => onLeftMostHighlight && dispatch({
            type: 'cellHover',
            payload: {
                row : opts.row,
                column: null,
                rowIndex: opts.i,
                columnIndex: null
            }
        }),
        []
    )
    const onMouseLeave = useCallback(
        e => onLeftMostHighlight && dispatch({ type: 'cellOut' }),
        []
    )
    return (
        Boolean(leftMost) && (
            <th
                className={`TableLeftMost ${cls}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {leftMost({from, to, ...opts})}
            </th>
        )
    );
};
