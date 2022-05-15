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
        preTableHeight: '20px',
        postTableHeight: '20px',
        headerHeight: '40px'
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
        <div className={classes.PreTable}>pre header there</div>
        <div className={classes.TableContainer}>
            <table ref={table} className={classes.Table}>
                <thead className={classes.Thead}>
                    <tr>
                        {leftMost && (
                            <th className={`${classes.TheadTh} ${classes.Th} ${classes.TorigTL}`}>
                                <div style={{width:'70px'}}>&bull;</div>
                            </th>
                        )}
                        {columns.map((column, k) => <th key={`head${k}`} className={`${classes.TheadTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}>{column.label}</th>)}
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
                            {columns.map((col, j) => (
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
                                    {row[col.key] || 'nothing'}
                                </td>
                            ))}
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
                        {columns.map((column, k) => <th key={`foot${k}`} className={`${classes.TfootTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}>{column.label}</th>)}
                        {rightMost && (
                            <th className={`${classes.TfootTh} ${classes.TorigBR}`}>
                                <div style={{width:'70px'}}>&bull;</div>
                            </th>
                        )}
                    </tr>
                </tfoot>
            </table>
        </div>
        <div className={classes.PostTable}>post footer there</div>
    </div>

}

export default HyperTable