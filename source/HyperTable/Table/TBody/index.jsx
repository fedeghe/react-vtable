import React, { useContext } from 'react';
import TableContext from '../../Context';
import Filler from '../Filler';
import LeftMost from '../LeftMost';
import RightMost from '../RightMost';
import Tr from '../Tr';
import Td from '../Td';
import {isFunction} from './../../utils';
import useStyles from './style.js';
const Tbody = () => {
    const {
        state: {
            rows, columns,
            activeRow, activeColumn,
            leftMost, rightMost,
            cls: {
                highlight: {
                    crossHighlightClass,
                    rowHighlightClass,
                    columnHighlightClass,
                    cellHightlightClass,
                }
            },
            dimensions: {
                rowHeight
            },
            virtual: {
                headerFillerHeight,
                footerFillerHeight,
                colspan,
                from
            },
            commonRemovedContent
        },
    } = useContext(TableContext),
        classes = useStyles({ rowHeight });

    return (
        <tbody>
            <Filler {...{ height: headerFillerHeight, colspan, leftMost }} />
            {rows.map((row, rowIndex) => (
                <Tr
                    cls={`${activeRow === row._ID ? (crossHighlightClass || rowHighlightClass || "") : ''}`}
                    key={row._ID}
                >
                    <LeftMost
                        cls={`${classes.TbodyThMost} ${classes.TbodyThLeftMost} ${classes.AlTop} ${activeRow === row._ID ? (crossHighlightClass || rowHighlightClass) : ''}`}
                        opts={{ row, rowIndex: rowIndex + from, type: 'body' }}
                    />
                    {columns.map((column, columnIndex) => {
                        
                        let content = row[column.key] || 'nothing';
                        if (column.cell && isFunction(column.cell)) {
                            content = column.cell({row, column, rowIndex, columnIndex});
                        }
                        if (!column.isVisible) content = column.removedContent || commonRemovedContent || '';
                        return (
                            <Td
                                style={column.isVisible ? {width: `${column.width}px`} : {}}
                                key={`cell_${row._ID}_${columnIndex}`}
                                row={row}
                                column={column}
                                rowIndex={rowIndex}
                                columnIndex={columnIndex}
                                cls={[
                                    classes.AlTop,
                                    activeColumn === column.key ? (crossHighlightClass || columnHighlightClass) : '',
                                    (cellHightlightClass && activeRow === row._ID && activeColumn === column.key) ? cellHightlightClass : ''
                                ].join(' ')}
                            >{content}</Td>
                        );
                    })}
                    <RightMost
                        cls={`${classes.TbodyThMost} ${classes.TbodyThRightMost} ${classes.AlTop} ${activeRow === row._ID ? (crossHighlightClass || rowHighlightClass) : ''}`}
                        opts={{ row, rowIndex: rowIndex + from, type: 'body'}}
                    />
                </Tr>
            ))}
            <Filler {...{ height: footerFillerHeight, colspan, rightMost }} />
        </tbody>
    );
};
export default Tbody;