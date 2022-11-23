import React, {useContext} from 'react';
import TableContext from './../../Context';
import useStyles from './style.js';

export default ({cls, children}) => {
    const {
            state: {
                cls: { 
                    elements: {
                        rowClass,
                    },
                }
            }
        } = useContext(TableContext),
        classes = useStyles();
    return <tr className={[classes.Tr, cls, rowClass].join(' ')}>{children}</tr>;
};

