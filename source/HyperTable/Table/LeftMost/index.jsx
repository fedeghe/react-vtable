import React, {useContext} from 'react';
import TableContext from '../../Context';
import Th from './../Th';

const _LeftMost = ({cls, opts}) => {
    const {
        state: {
            LeftMost,
            virtual:{
                from, to, 
            },
        },
    } = useContext(TableContext);
    
    return (
        Boolean(LeftMost) && (
            <Th
                cls={`TableLeftMost ${cls}`}
                column={null}
                row={opts.row}
                rowIndex={opts.rowIndex}
                columnIndex={null}
                pos="leftMost"
            ><LeftMost from ={from} to = {to} {...opts}/></Th>
        )
    );
};
export default _LeftMost;