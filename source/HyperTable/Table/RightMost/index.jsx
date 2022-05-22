import React, {useContext} from 'react'
import TableContext from '../../Context'

export default ({cls, opts}) => {
    const {
        state: {
            rightMost,
            virtual:{
                from, to, 
            }
        },
    } = useContext(TableContext);

    return (
        Boolean(rightMost) && (
            <th className={cls}>{rightMost({from, to, ...opts})}</th>
        )
    );
}
