import React, {useContext} from 'react';
import TableContext from '../../Context';
import Th from './../Th';

export default ({cls, opts}) => {
    const {
        state: {
            RightMost,
            virtual:{
                from, to, 
            },
        },
    } = useContext(TableContext);

    return (
        Boolean(RightMost) && (
            <Th
                cls={`TableRightMost ${cls}`}
                column={null}
                row={opts.row}
                rowIndex={opts.rowIndex}
                columnIndex={null}
                pos="rightMost"
            ><RightMost from={from} to={to} {...opts}/></Th>
        )
    );
};
