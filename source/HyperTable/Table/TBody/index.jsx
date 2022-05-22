import React, { useContext } from 'react'
import TableContext from '../../Context'
import Filler from '../Filler'
import LeftMost from '../LeftMost'
import RightMost from '../RightMost'
import useStyles from './style.js'
export default () => {
    const {
        state: {
            rows, columns,
            activeRow, activeCol,
            crossHighlight, rowHighlight, columnHighlight, cellHightlight,
            rowHeight,
            virtual: {
                headerFillerHeight,
                footerFillerHeight,
                colspan,
                from, to
            },
            cellClick, cellEnter, cellLeave
        },
        dispatch
    } = useContext(TableContext),
        classes = useStyles({ rowHeight });

    return (
        <tbody>
            <Filler {...{ height: headerFillerHeight, colspan }} />
            {rows.map((row, i) => (
                <tr
                    className={`${activeRow === row._ID ? (crossHighlight || rowHighlight || "") : ''}`}
                    key={row._ID}
                >
                    <LeftMost cls={`${classes.TbodyThMost} ${classes.TbodyThLeftMost} ${classes.AlTop} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`} opts={{ row, i: i + from, from, to }} />
                    {columns.map((col, j) => {
                        let cnt = row[col.key] || 'nothing'
                        if (col.wrap && typeof col.wrap === 'function') {
                            cnt = col.wrap(cnt)
                        }
                        return (
                            <td
                                key={`cell_${row._ID}_${j}`}
                                onClick={e => cellClick.call(e, e, { row, col })}
                                onMouseEnter={e => {
                                    cellEnter.call(e, e, { row, col, rowIndex: from + i, colIndex: j })
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
                                    cellLeave.call(e, e, { row, col, rowIndex: from + i, colIndex: j });
                                    dispatch({ type: 'cellOut' });
                                }}
                                className={[
                                    classes.AlTop,
                                    activeCol === col.key ? (crossHighlight || columnHighlight) : '',
                                    (cellHightlight && activeRow === row._ID && activeCol === col.key) ? cellHightlight : ''
                                ].join(' ')}
                            >
                                <div className={classes.Cell}>
                                    {cnt}
                                </div>
                            </td>
                        )
                    })}
                    <RightMost cls={`${classes.TbodyThMost} ${classes.TbodyThRightMost} ${classes.AlTop} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`} opts={{ row, i: i + from }} />
                </tr>
            ))}
            <Filler {...{ height: footerFillerHeight, colspan }} />
        </tbody>
    );
}
