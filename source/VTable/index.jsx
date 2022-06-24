import React, { useReducer } from 'react';

import TableContext from './Context';
import reducerFactory from './reducer';
import Table from './Table';
import Caption from './Table/Caption';

import { debounce } from './utils';

import useStyles from './style.js';

export default ({config}) => {
    const { reducer, init } = reducerFactory(),
        // initialState = useMemo(() => init(config), [config, init]),
        [ state, dispatch ] = useReducer(reducer, config, init),
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
                Loader
            },
            debounceTimes: {
                filtering : filteringDebounceTime,
            },
            globalFilterValue
        } = state,
        classes = useStyles({
            width, height,
            preHeaderHeight,
            postFooterHeight,
        }),
        unFilter = debounce(() => dispatch({type: 'unFilter'}), filteringDebounceTime),
        globalFilter = debounce(value => dispatch({type: 'globalFilter', payload: value || ''}), filteringDebounceTime),
        unSort = debounce(() => dispatch({type: 'unSort'}), filteringDebounceTime),
        p = {
            unSort, unFilter, globalFilter, globalFilterValue
        };
    
    return <div className={[classes.Wrapper, wrapperClass].join(' ')}>
        <TableContext.Provider value={{state, dispatch}}>
            {loading && <div className={classes.LoaderContainer}><Loader/></div>}
            <Caption type="header" {...p}/>
            <Table/>
            <Caption type="footer" {...p}/>
        </TableContext.Provider>
    </div>;

};

