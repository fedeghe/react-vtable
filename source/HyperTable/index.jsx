import React, { useReducer } from 'react';

import TableContext from './Context';
import reducerFactory from './reducer';
import Table from './Table';
import Caption from './Table/Caption';

import { debounce } from './utils';

import useStyles from './style.js';

const HyperTable = ({config}) => {
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
        } = state,
        classes = useStyles({
            width, height,
            preHeaderHeight,
            postFooterHeight,
        }),
        unFilter = debounce(() => dispatch({type: 'unFilter'}), filteringDebounceTime),
        unSort = debounce(() => dispatch({type: 'unSort'}), filteringDebounceTime),
        p = {
            unSort, unFilter
        };
    
    return <div className={[classes.Wrapper, wrapperClass].join(' ')}>
        <TableContext.Provider value={{state, dispatch}}>
            {loading && <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}><Loader/></div>}
            <Caption type="header" {...p}/>
            <Table/>
            <Caption type="footer" {...p}/>
        </TableContext.Provider>
    </div>;

};

export default HyperTable;