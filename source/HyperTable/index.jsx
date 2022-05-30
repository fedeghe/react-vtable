import React, { useReducer, useMemo } from 'react';

import TableContext from './Context';
import reducerFactory from './reducer';
import Table from './Table';
import Caption from './Table/Caption';

import useStyles from './style.js';

const HyperTable = ({config}) => {
    const { reducer, init } = reducerFactory(),
        initialState = useMemo(() => init(config), [config, init]),
        [ state, dispatch ] = useReducer(reducer, initialState),
        {
            dimensions: {
                width, height
            },
            header:{caption: {height : preHeaderHeight} = {}} = {},
            footer:{caption: {height : postFooterHeight} = {}} = {},
            virtual: {
                loading,
                loader
            }
        } = state,
        classes = useStyles({
            width, height,
            preHeaderHeight,
            postFooterHeight,
        });
    
    return <div className={classes.Wrapper}>
        <TableContext.Provider value={{state, dispatch}}>
            {loading && loader}
            <Caption type="header"/>
            <Table/>
            <Caption type="footer"/>
        </TableContext.Provider>
    </div>;

};

export default HyperTable;