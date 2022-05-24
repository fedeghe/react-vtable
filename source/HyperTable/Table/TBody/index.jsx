import React, { useContext } from 'react'
import TableContext from '../../Context'
import Filler from '../Filler'
import LeftMost from '../LeftMost'
import RightMost from '../RightMost'
import Tr from '../Tr'
import Td from '../Td'
import {isFunction} from './../../utils'
import useStyles from './style.js'
const Tbody = () => {
    const {
        state: {
            rows, columns,
            activeRow, activeColumn,
            crossHighlight, rowHighlight, columnHighlight, cellHightlight,
            rowHeight,
            virtual: {
                headerFillerHeight,
                footerFillerHeight,
                colspan,
                from, to
            },
        },
    } = useContext(TableContext),
        classes = useStyles({ rowHeight });

    return (
        <tbody>
            <Filler {...{ height: headerFillerHeight, colspan }} />
            {rows.map((row, rowIndex) => (
                <Tr
                    cls={`${activeRow === row._ID ? (crossHighlight || rowHighlight || "") : ''}`}
                    key={row._ID}
                >
                    <LeftMost
                        cls={`${classes.TbodyThMost} ${classes.TbodyThLeftMost} ${classes.AlTop} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`}
                        opts={{ row, rowIndex: rowIndex + from, from, to }}
                    />
                    {columns.map((column, columnIndex) => {
                        let content = row[column.key] || 'nothing'
                        if (column.cell && isFunction(column.cell)) {
                            content = column.cell({row, column, rowIndex, columnIndex})
                        }
                        return (
                            <Td
                                key={`cell_${row._ID}_${columnIndex}`}
                                row={row}
                                column={column}
                                content={content}
                                rowIndex={rowIndex}
                                columnIndex={columnIndex}
                                cls={[
                                    classes.AlTop,
                                    activeColumn === column.key ? (crossHighlight || columnHighlight) : '',
                                    (cellHightlight && activeRow === row._ID && activeColumn === column.key) ? cellHightlight : ''
                                ].join(' ')}
                            />
                        )
                    })}
                    <RightMost
                        cls={`${classes.TbodyThMost} ${classes.TbodyThRightMost} ${classes.AlTop} ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`}
                        opts={{ row, rowIndex: rowIndex + from }}
                    />
                </Tr>
            ))}
            <Filler {...{ height: footerFillerHeight, colspan }} />
        </tbody>
    );
}
export default Tbody