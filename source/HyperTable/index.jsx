import React, { useReducer, useEffect, useRef, useCallback } from 'react'

import Filler from './components/Filler'
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


const HyperTable = ({
    columns,
    data,
    height, width,

    

    
    
    
    noFilterData,
    
    PreHeader,
    PostFooter,
    leftMost,
    rightMost,
    
    crossHighlight='',
    columnHighlight='',
    rowHighlight='',
    cellHightlight='',
    rowHeight = 50,
    preHeaderHeight = 20,
    postFooterHeight = 20,
    headerHeight = 40,
    footerHeight = 40,
    
    cellClick = () => { },
    cellEnter = () => { },
    cellLeave = () => { },
}) => {


    const { reducer, init } = reducerFactory()
    const [state, dispatch] = useReducer(reducer, init({
        data,
        height, width,
        preHeaderHeight,
        postFooterHeight,
        headerHeight,
        footerHeight,
        rowHeight
    }))
    const {
        total,
        rows,
        activeRow, activeCol,
        activeRowIndex, activeColIndex,
        filters, sorting : {
            field: sortingField,
            versus: sortingVersus

        } = {},
        virtual: {
            scrollTop,
            headerFillerHeight,
            footerFillerHeight,
            from, to
        }
    } = state
    
    const classes = useStyles({
        width, height,
        preHeaderHeight,
        postFooterHeight,
        headerHeight,
        footerHeight,
        rowHeight
    })
    const table = useRef(null);
    const virtualColspan = columns.length + !!leftMost + !!rightMost
    

    const onScroll = useCallback(debounce(e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch({
            type:'scroll',
            payload: e.nativeEvent.target.scrollTop
        })
    }, 20), [])
    
    // console.log(state.virtual)
    
    return <div className={classes.Wrapper}>
        {PreHeader && <div className={classes.PreHeader}>{typeof PreHeader === 'function' ? <PreHeader {...{from, to, total, activeCol, activeRow, activeColIndex, activeRowIndex}}/> : PreHeader}</div>}
        <div
            className={classes.TableContainer}
            onScroll={onScroll}
        >
            <table ref={table} className={classes.Table}>
                <thead className={classes.Thead}>
                    <tr>
                        {leftMost && (
                            <th className={`${classes.TheadTh} ${classes.TorigTL}`}>
                                {leftMost({isHeader:true, from, to})}
                            </th>
                        )}
                        {columns.map((column, k) => {
                            let label = column.key;
                            if ('headerLabel' in column) {
                                label = typeof column.headerLabel === 'function' ? column.headerLabel(column) : column.headerLabel
                            }

                            return <th key={`head${k}`} className={`${classes.TheadTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}>
                                {label}
                                {/* filter */}
                            </th>
                        })}
                        {rightMost && (
                            <th className={`${classes.TheadTh} ${classes.TorigTR}`}>
                                {rightMost({isHeader:true, from, to})}
                            </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    <Filler {...{height: headerFillerHeight, virtualColspan}}/>
                    {rows.map((row, i) => (
                        
                        <tr
                            className={`${activeRow === row._ID ? (crossHighlight || rowHighlight || "") : ''}`}
                            key={row._ID}
                        >
                            {leftMost &&
                                <th className={`${classes.TbodyThLeftMost} ${classes.Th} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`}>
                                    {leftMost({row, i: i + from, from, to})}
                                </th>
                            }
                            {columns.map((col, j) => {
                                let cnt = row[col.key] || 'nothing'
                                if (col.wrap && typeof col.wrap === 'function') {
                                    cnt = col.wrap(cnt)
                                }
                                return (
                                    <td
                                        key={`cell_${row._ID}_${j}`}
                                        onClick={e => {
                                            cellClick.call(e, e, {row, col})
                                        }}
                                        onMouseEnter={e => {
                                            cellEnter.call(e, e, {row, col, rowIndex: from + i, colIndex: j})
                                            dispatch({
                                                type: 'cellHover',
                                                payload: {
                                                    row,
                                                    col,
                                                    rowIndex: from + i,
                                                    colIndex: j
                                                }
                                            });
                                        }}
                                        onMouseLeave={e => {
                                            cellLeave.call(e, e, {row, col,rowIndex: from + i, colIndex: j});
                                            dispatch({type: 'cellOut'});
                                        }}
                                        className={`${classes.Td} ${activeCol === col.key ? (crossHighlight || columnHighlight) : ''} ${(cellHightlight && activeRow === row._ID && activeCol === col.key) ? cellHightlight : ''}`}>
                                        <div className={classes.Cell}>
                                            {cnt}
                                        </div>
                                    </td>
                                )
                            })}
                            {rightMost &&
                                <th className={`${classes.TbodyThRightMost} ${classes.Th} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`}>
                                    {rightMost({row, i: i + from, from, to})}
                                </th>
                            }
                        </tr>
                    ))}
                    <Filler {...{height: footerFillerHeight, virtualColspan}}/>
                </tbody>
                <tfoot className={classes.Tfoot}>
                    <tr>
                        {leftMost && (
                            <th className={`${classes.TfootTh} ${classes.Th} ${classes.TorigBL}`}>
                                {leftMost({isFooter:true, from, to})}
                            </th>
                        )}
                        {columns.map((column, k) => {
                            let label = column.key;
                            if ('footerLabel' in column) {
                                label = typeof column.footerLabel === 'function' ? column.footerLabel(column) : column.footerLabel
                            }
                            return <th key={`foot${k}`} className={`${classes.TfootTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}>
                                {label}
                            </th>
                        })}
                        {rightMost && (
                            <th className={`${classes.TfootTh} ${classes.TorigBR}`}>
                                {rightMost({isFooter:true, from, to})}
                            </th>
                        )}
                    </tr>
                </tfoot>
            </table>
        </div>
        {PostFooter && <div className={classes.PostFooter}>{typeof PostFooter === 'function' ? <PostFooter {...{from, to, total, activeCol, activeRow, activeColIndex, activeRowIndex}}/> : PostFooter}</div>}
    </div>

}

export default HyperTable