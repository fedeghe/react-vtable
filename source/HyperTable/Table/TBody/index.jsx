import React, { useContext } from 'react'
import TableContext from '../../Context'
import Filler from '../Filler'
import LeftMost from '../LeftMost'
import RightMost from '../RightMost'
import Tr from '../Tr'
import Td from '../Td'
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
                <Tr
                    cls={`${activeRow === row._ID ? (crossHighlight || rowHighlight || "") : ''}`}
                    key={row._ID}
                >
                    <LeftMost cls={`${classes.TbodyThMost} ${classes.TbodyThLeftMost} ${classes.AlTop} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`} opts={{ row, i: i + from, from, to }} />
                    {columns.map((column, j) => {
                        let content = row[column.key] || 'nothing'
                        if (column.cell && typeof column.cell === 'function') {
                            content = column.cell({row, column, rowIndex: i, columnIndex: j})
                        }
                        return (
                            <Td
                                key={`cell_${row._ID}_${j}`}
                                row={row}
                                column={column}
                                content={content}
                                i={i}
                                j={j}
                                cls={[
                                    classes.AlTop,
                                    activeCol === column.key ? (crossHighlight || columnHighlight) : '',
                                    (cellHightlight && activeRow === row._ID && activeCol === column.key) ? cellHightlight : ''
                                ].join(' ')}
                            />
                        )
                    })}
                    <RightMost cls={`${classes.TbodyThMost} ${classes.TbodyThRightMost} ${classes.AlTop} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`} opts={{ row, i: i + from }} />
                </Tr>
            ))}
            <Filler {...{ height: footerFillerHeight, colspan }} />
        </tbody>
    );
}
