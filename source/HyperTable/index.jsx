import React, { useReducer, useMemo, useCallback, useEffect } from 'react';

import TableContext from './Context';
import reducerFactory from './reducer';
import Table from './Table';
import Caption from './Table/Caption';

import { debounce } from './utils';

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
            cls : {
                elements: {
                    wrapperClass
                }
            },
            virtual: {
                loading,
                loader
            },
            debounceTimes: {
                filtering : filteringDebounceTime,
            },
        } = state,
        classes = useStyles({
            width, height,
            preHeaderHeight,
            postFooterHeight,
        }),
        unFilter = useCallback(
            debounce(() => dispatch({type: 'unFilter'}), filteringDebounceTime),
            [filteringDebounceTime]
        ),
        unSort = useCallback(
            debounce(() => dispatch({type: 'unSort'}), filteringDebounceTime),
            [filteringDebounceTime]
        ),
        p = {
            unSort, unFilter
        };
    
    return <div className={[classes.Wrapper, wrapperClass].join(' ')}>
        <TableContext.Provider value={{state, dispatch}}>
            {loading && loader}
            <Caption type="header" {...p}/>
            <Table/>
            <Caption type="footer" {...p}/>
        </TableContext.Provider>
    </div>;

};

export default HyperTable;