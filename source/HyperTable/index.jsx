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
    columnClick = () => { },
    columnEnter = () => { },
    columnLeave = () => { },
    rowClick = () => { },
    rowEnter = () => { },
    rowLeave = () => { },
    cellClick = () => { },
    cellEnter = () => { },
    cellLeave = () => { },
}) => {

    const classes = useStyles({
        width, height,
        preTableHeight: '20px',
        postTableHeight: '20px',
        headerHeight: '40px'
    })
    const table = useRef(null);

    debugger

    useEffect(() => {
        table.current.style.display = 'table';
        return () => {
            table.current.style.display = 'none'
        }
    }, [])

    return <div className={classes.Wrapper}>
        <div className={classes.PreTable}>header there</div>
        <div className={classes.TableContainer}>
            <table ref={table} className={classes.Table}>
                <thead className={classes.Thead}>
                    <tr>
                        {leftMost && (
                            <th className={`${classes.TheadTh} ${classes.Th} ${classes.TorigTL}`}>
                                <div style={{width:'70px'}}>&bull;</div>
                            </th>
                        )}
                        {columns.map(column => <th className={classes.TheadTh}>{column.key}</th>)}
                        
                        {rightMost && (
                            <th className={`${classes.TheadTh} ${classes.TorigTR}`}>
                                <div style={{width:'70px'}}>&bull;</div>
                            </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr>
                            {leftMost && <th className={`${classes.TbodyThLeftMost} ${classes.Th}`}>r {i}</th>}
                            {columns.map((col, j) => <td className={classes.Td}>{row[col.key] || 'nothing'}</td>)}
                            {rightMost && <th className={`${classes.TbodyThRightMost} ${classes.Th}`}>r {i}</th>}
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
                        {columns.map(column => <th className={classes.TfootTh}>{column.id}</th>)}
                        
                        {rightMost && (
                            <th className={`${classes.TfootTh} ${classes.TorigBR}`}>
                                <div style={{width:'70px'}}>&bull;</div>
                            </th>
                        )}
                    </tr>
                </tfoot>
            </table>
        </div>
        <div className={classes.PostTable}>footer there</div>
    </div>

}

export default HyperTable