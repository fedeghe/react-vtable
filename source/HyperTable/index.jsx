import React, { useReducer, useMemo } from 'react';

import TableContext from './Context';
import reducerFactory from './reducer';
import Table from './Table';
import Caption from './Table/Caption';

import useStyles from './style.js';

const HyperTable = cnf => {
    const { reducer, init } = reducerFactory(),
        initialState = useMemo(() => init(cnf), [cnf, init]),
        [ state, dispatch ] = useReducer(reducer, initialState),
        {
            width, height,
            preHeaderHeight,
            postFooterHeight,
        } = state,
        classes = useStyles({
            width, height,
            preHeaderHeight,
            postFooterHeight,
        });
    
    return <div className={classes.Wrapper}>
        <TableContext.Provider value={{state, dispatch}}>
            <Caption type="pre"/>
            <Table/>
            <Caption type="post"/>
        </TableContext.Provider>
    </div>;

};

export default HyperTable;