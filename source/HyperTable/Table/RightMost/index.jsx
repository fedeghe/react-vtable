import React, {useContext} from 'react'
import TableContext from '../../Context'
import Th from './../Th'

export default ({cls, opts}) => {
    const {
        state: {
            rightMost,
            virtual:{
                from, to, 
            },
        },
    } = useContext(TableContext);

    return (
        Boolean(rightMost) && (
            <Th
                cls={`TableRightMost ${cls}`}
                column={null}
                row={opts.row}
                i={opts.i}
                j={null}
                content={rightMost({from, to, ...opts})}
                pos="rightMost"
            />
        )
    );
}
