import React, {useContext} from 'react';
import TableContext from '../../Context';
import Th from './../Th'

export default ({cls, opts}) => {
    const {
        state: {
            leftMost,
            virtual:{
                from, to, 
            },
        },
    } = useContext(TableContext);
    
    return (
        Boolean(leftMost) && (
            <Th
                cls={`TableLeftMost ${cls}`}
                column={null}
                row={opts.row}
                rowIndex={opts.rowIndex}
                columnIndex={null}
                content={leftMost({from, to, ...opts})}
                pos="leftMost"
            />
        )
    );
};
