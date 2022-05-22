import React, {useContext} from 'react'
import TableContext from '../../Context'

export default ({cls, opts}) => {
    const {
        state: {
            leftMost,
            virtual:{
                from, to, 
            }
        },
    } = useContext(TableContext)

    return (
        Boolean(leftMost) && (
            <th className={cls}>{leftMost({from, to, ...opts})}</th>
        )
    )
}
