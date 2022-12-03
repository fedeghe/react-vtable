import React, { useReducer } from 'react';

import TableContext from './Context';
import reducerFactory from './Table/reducer';
import { ACTION_TYPES } from './Table/reducer/actions';
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
        unFilter = debounce(() => dispatch({type: ACTION_TYPES.UNFILTER}), filteringDebounceTime),
        globalFilter = debounce(value => dispatch({type: ACTION_TYPES.GLOBAL_FILTER, payload: value || ''}), filteringDebounceTime),
        unSort = debounce(() => dispatch({type: ACTION_TYPES.UNSORT}), filteringDebounceTime),
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

