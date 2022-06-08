import React, {useContext} from 'react';
import TableContext from '../../Context';
import Th from './../Th';

const LeftMost = ({cls, opts}) => {
    const {
        state: {
            LeftMost: theLeftMost,
            virtual:{
                from, to, 
            },
        },
    } = useContext(TableContext);
    
    return (
        Boolean(theLeftMost) && (
            <Th
                cls={`TableLeftMost ${cls}`}
                column={null}
                row={opts.row}
                rowIndex={opts.rowIndex}
                columnIndex={null}
                pos="leftMost"
            >{theLeftMost({from, to, ...opts})}</Th>
        )
    );
};
export default LeftMost;