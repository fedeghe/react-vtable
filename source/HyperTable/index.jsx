import React, { useReducer, useEffect, useRef } from 'react'

import reducerFactory from './reducer'
import { replaceall } from './utils'

import useStyles from './style.js'

const HyperTable = ({
    columns,
    data,
    captionTop,
    captionBottom,

    height, width,

    leftMost = false,
    rightMost = false,

    rowVerticalAlign,

    crossHighlight,
    columnHighlight,
    rowHighlight,
    cellHightlight,

    noFilterData,

    PreHeader,
    PostFooter,
    preHeaderHeight = '20px',
    postFooterHeight = '20px',
    headerHeight = '40px',
    footerHeight = '40px',
    
    cellClick = () => { },
    cellEnter = () => { },
    cellLeave = () => { },
}) => {


    const { reducer, init } = reducerFactory()
    const [state, dispatch] = useReducer(reducer, init(data))
    const {total, rows, activeRow, activeCol, filters, sorting : {
        field: sortingField,
        versus: sortingVersus
    } = {}} = state

    const classes = useStyles({
        width, height,
        preHeaderHeight,
        postFooterHeight,
        headerHeight,
        footerHeight
    })
    const table = useRef(null);

    useEffect(() => {
        table.current.style.display = 'table';
        return () => {
            table.current.style.display = 'none'
        }
    }, [])
    console.log({activeCol, activeRow})
    return <div className={classes.Wrapper}>
        {PreHeader && <div className={classes.PreHeader}>{typeof PreHeader === 'function' ? <PreHeader/> : PreHeader}</div>}
        <div className={classes.TableContainer}>
            <table ref={table} className={classes.Table}>
                <thead className={classes.Thead}>
                    <tr>
                        {leftMost && (
                            <th className={`${classes.TheadTh} ${classes.TorigTL}`}>
                                <div style={{width:'70px'}}>&bull;</div>
                            </th>
                        )}
                        {columns.map((column, k) => {
                            let label = column.key;
                            if ('headerLabel' in column) {
                                label = typeof column.headerLabel === 'function' ? column.headerLabel(column) : column.headerLabel
                            }

                            return <th key={`head${k}`} className={`${classes.TheadTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}>
                                {label}
                            </th>
                        })}
                        {rightMost && (
                            <th className={`${classes.TheadTh} ${classes.TorigTR}`}>
                                <div style={{width:'70px'}}>&bull;</div>
                            </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr
                            className={`${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`}
                            key={`row${i}`}
                        >
                            {leftMost && <th className={`${classes.TbodyThLeftMost} ${classes.Th} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`}>{leftMost({row, i})}</th>}
                            {columns.map((col, j) => {
                                let cnt = row[col.key] || 'nothing'
                                if (col.wrap && typeof col.wrap === 'function') {
                                    cnt = col.wrap(cnt)
                                }
                                return (
                                    <td
                                        key={`cell_${i}_${j}`}
                                        onClick={e => {
                                            cellClick.call(e, e, row, col)
                                        }}
                                        onMouseEnter={e => {
                                            cellEnter.call(e, e, row, col)
                                            
                                            dispatch({
                                                type: 'cellHover',
                                                payload: {
                                                    row,
                                                    col
                                                }
                                            });
                                        }}
                                        onMouseLeave={e => {
                                            cellLeave.call(e, e, row, col);
                                            
                                            dispatch({
                                                type: 'cellOut',
                                                payload: {
                                                    row,
                                                    col
                                                }
                                            });
                                        }}
                                        className={`${classes.Td} ${activeCol === col.key ? (crossHighlight || columnHighlight) : ''} ${(cellHightlight && activeRow === row._ID && activeCol === col.key) ? cellHightlight : ''}`}>
                                        {cnt}
                                    </td>
                                )
                            })}
                            {rightMost && <th className={`${classes.TbodyThRightMost} ${classes.Th} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`}>{rightMost({row, i})}</th>}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        {leftMost && (
                            <th className={`${classes.TfootTh} ${classes.Th} ${classes.TorigBL}`}>
                                <div style={{width:'70px'}}>&bull;</div>
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
                                <div style={{width:'70px'}}>&bull;</div>
                            </th>
                        )}
                    </tr>
                </tfoot>
            </table>
        </div>
        {PostFooter && <div className={classes.PostFooter}>{typeof PostFooter === 'function' ? <PostFooter/> : PostFooter}</div>}
    </div>

}

export default HyperTable