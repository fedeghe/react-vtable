import React, { useReducer } from 'react'

import TableContext from './Context'
import reducerFactory from './reducer'
import Table from './Table'
import PreHeader from './Table/PreHeader'
import PostFooter from './Table/PostFooter'

import useStyles from './style.js'

const HyperTable = cnf => {
    const { reducer, init } = reducerFactory(),
        [ state, dispatch ] = useReducer(reducer, init(cnf)),
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
            <PreHeader/>
            <Table/>
            <PostFooter/>
        </TableContext.Provider>
    </div>

}

export default HyperTable