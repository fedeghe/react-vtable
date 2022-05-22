import React, { useReducer, useEffect, useRef, useCallback } from 'react'

import Filler from './Table/Filler'
import Table from './Table'
import TableContext from './Context'
import reducerFactory from './reducer'
import { replaceall } from './utils'

import useStyles from './style.js'


const debounce = (func, wait) => {
    let timeout
    let enabled = true
    return (...params) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (!enabled) return
        func(...params)
        enabled = false
        setTimeout(() => enabled = true, wait)
      }, wait)
    }
  }


const HyperTable = cnf => {

    const {
        height, width,
        PreHeader,
        PostFooter,
    } = cnf

    const { reducer, init } = reducerFactory()
    const [ state, dispatch ] = useReducer(reducer, init(cnf))
    const {
        total,
        activeRow, activeCol,
        activeRowIndex, activeColIndex,
        preHeaderHeight,
        postFooterHeight,
        virtual: {from, to}
    } = state
    
    const classes = useStyles({
        width, height,
        preHeaderHeight,
        postFooterHeight,
    })
    
    return <div className={classes.Wrapper}>
        <TableContext.Provider value={{state, dispatch}}>
            {PreHeader && <div className={classes.PreHeader}>{
                typeof PreHeader === 'function'
                ? <PreHeader {...{from, to, total, activeCol, activeRow, activeColIndex, activeRowIndex}}/>
                : PreHeader
            }</div>}
            <Table/>
            {PostFooter && <div className={classes.PostFooter}>{
                typeof PostFooter === 'function'
                ? <PostFooter {...{from, to, total, activeCol, activeRow, activeColIndex, activeRowIndex}}/>
                : PostFooter
            }</div>}
        </TableContext.Provider>
    </div>

}

export default HyperTable