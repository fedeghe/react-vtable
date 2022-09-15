import React, {useContext} from 'react';
import TableContext from '../../Context';
import Th from './../Th';

export default ({cls, opts}) => {
    const {
        state: {
            LeftMost,
            virtual:{
                fromRow, toRow, 
            },
        },
    } = useContext(TableContext);
    
    return (
        Boolean(LeftMost) && (
            <Th
                cls={`TableLeftMost ${cls}`}
                header={null}
                row={opts.row}
                rowIndex={opts.rowIndex}
                headerIndex={null}
                pos="leftMost"
            ><LeftMost fromRow ={fromRow} toRow = {toRow} {...opts}/></Th>
        )
    );
};