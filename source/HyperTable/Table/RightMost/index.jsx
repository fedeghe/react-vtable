import React, {useContext} from 'react';
import TableContext from '../../Context';
import Th from './../Th';

const RightMost = ({cls, opts}) => {
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
                content={RightMost({from, to, ...opts})}
                pos="rightMost"
            />
        )
    );
};
export default RightMost;