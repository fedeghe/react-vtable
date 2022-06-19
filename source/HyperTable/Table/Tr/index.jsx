import React, {useContext} from 'react';
import TableContext from './../../Context';

export default ({cls, children}) => {
    const {
        state: {
            cls: { 
                elements: {
                    rowClass,
                },
            }
        }
    } = useContext(TableContext);
    return <tr className={[cls, rowClass].join(' ')} style={{padding:0}}>{children}</tr>;
};

