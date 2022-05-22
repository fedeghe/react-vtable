import React, { useCallback, useContext } from 'react'

import Filler from './Filler'
import NoData from './NoData'
import Header from './Header'
import Footer from './Footer'
import LeftMost from './LeftMost'
import RightMost from './RightMost'
import TableContext from './../Context'

import { debounce } from './../utils'

import useStyles from './style.js'


const Table = () => {

    const {state, dispatch} = useContext(TableContext),
        {
            columns,
            rows,
            width, height,
            activeRow, activeCol,
            leftMost, rightMost,
        
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
            virtual: {
                headerFillerHeight,
                footerFillerHeight,
                rowHeight,
                from, to
            }
        } = state,
        classes = useStyles({
            width, height,
            preHeaderHeight: PreHeader ? preHeaderHeight : 0,
            postFooterHeight: PostFooter ? postFooterHeight : 0,
            headerHeight,
            footerHeight,
            rowHeight
        }),
        virtualColspan = columns.length + !!leftMost + !!rightMost,
        onScroll = useCallback(debounce(e => {
            e.preventDefault()
            e.stopPropagation()
            dispatch({
                type:'scroll',
                payload: e.nativeEvent.target.scrollTop
            })
        }, 20), []);
    
    return (
        <div
            className={classes.TableContainer}
            onScroll={onScroll}
        >{
            rows.length
            ? (
                <table className={classes.Table}>
                    <Header/>
                    <tbody>
                        <Filler {...{height: headerFillerHeight, virtualColspan}}/>
                        {rows.map((row, i) => (
                            <tr
                                className={`${activeRow === row._ID ? (crossHighlight || rowHighlight || "") : ''}`}
                                key={row._ID}
                            >   
                                <LeftMost cls={`${classes.TbodyThLeftMost} ${classes.Th} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`} opts={{row, i: i +from, from, to}}/>
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
                                <RightMost cls={`${classes.TbodyThRightMost} ${classes.Th} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`} opts={{row, i: i + from}}/>
                            </tr>
                        ))}
                        <Filler {...{height: footerFillerHeight, virtualColspan}}/>
                    </tbody>
                    <Footer/>
                </table>
            )
            : <NoData/>
        }
        </div>
    );
}

export default Table