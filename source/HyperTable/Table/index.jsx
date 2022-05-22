import React, { useCallback, useContext } from 'react'

import Filler from './Filler'
import TableContext from './../Context'

import { replaceall } from './../utils'

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


const Table = () => {

    const {state, dispatch} = useContext(TableContext)
    const {
        total,
        columns,
        rows,
        width, height,
        activeRow, activeCol,
        leftMost, rightMost,
        activeRowIndex, activeColIndex,
    
        preHeaderHeight, postFooterHeight,
        headerHeight, footerHeight,

        PreHeader, PostFooter,

        crossHighlight,
        columnHighlight,
        rowHighlight,
        cellHightlight,
        cellClick,
        cellEnter,
        cellLeave,
        noFilterData,
        filters, sorting : {
            field: sortingField,
            versus: sortingVersus

        } = {},
        virtual: {
            headerFillerHeight,
            footerFillerHeight,
            rowHeight,
            from, to
        }
    } = state
    
    const classes = useStyles({
        width, height,
        preHeaderHeight: PreHeader ? preHeaderHeight : 0,
        postFooterHeight: PostFooter ? postFooterHeight : 0,
        headerHeight,
        footerHeight,
        rowHeight
    })
    
    const virtualColspan = columns.length + !!leftMost + !!rightMost
    

    const onScroll = useCallback(debounce(e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch({
            type:'scroll',
            payload: e.nativeEvent.target.scrollTop
        })
    }, 20), [])
    
    
    
    return (
            <div
                className={classes.TableContainer}
                onScroll={onScroll}
            >
                {rows.length ? (
                <table className={classes.Table}>
                    {headerHeight && <thead className={classes.Thead}>
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
                    </thead>}
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
                    {footerHeight && <tfoot className={classes.Tfoot}>
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
                    </tfoot>}
                </table>
                ) : <div className={classes.NoData}>{noFilterData}</div>}
            </div>
    )

}

export default Table