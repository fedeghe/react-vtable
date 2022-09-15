import React, {useContext} from 'react';
import TableContext from '../../Context';
import Th from './../Th';

export default ({cls, opts}) => {
    const {
        state: {
            RightMost,
            virtual:{
                fromRow, toRow, 
            },
        },
    } = useContext(TableContext);

    return (
        Boolean(RightMost) && (
            <Th
                cls={`TableRightMost ${cls}`}
                header={null}
                row={opts.row}
                rowIndex={opts.rowIndex}
                headerIndex={null}
                pos="rightMost"
            ><RightMost fromRow={fromRow} toRow={toRow} {...opts}/></Th>
        )
    );
};
