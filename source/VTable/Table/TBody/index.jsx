import React, { useContext } from 'react';
import TableContext from '../../Context';
import Filler from '../Filler';
import LeftMost from '../LeftMost';
import RightMost from '../RightMost';
import Tr from '../Tr';
import Td from '../Td';
import {isFunction} from './../../utils';
import useStyles from './style.js';
export default () => {
    const {
            state: {
                rows, headers,
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
                    fromRow
                },
                commonRemovedContent,
                rhtID
            },
        } = useContext(TableContext),
        classes = useStyles({ rowHeight });

    return (
        <tbody>
            <Filler {...{ height: headerFillerHeight, colspan, leftMost }} />
            {rows.map((row, rowIndex) => (
                <Tr
                    cls={`${activeRow === row[rhtID] ? (crossHighlightClass || rowHighlightClass || "") : ''}`}
                    key={row[rhtID]}
                >
                    <LeftMost
                        cls={`${classes.TbodyThMost} ${classes.TbodyThLeftMost} ${classes.AlTop} ${activeRow === row[rhtID] ? (crossHighlightClass || rowHighlightClass) : ''}`}
                        opts={{ row, rowIndex: rowIndex + fromRow, type: 'body' }}
                    />
                    {headers.map((header, headerIndex) => {
                        let content = row[header.key] || 'nothing';
                        if (header.cell && isFunction(header.cell)) {
                            content = header.cell({row, header, rowIndex, headerIndex});
                        }
                        if (!header.isVisible)
                            content = header.removedContent || commonRemovedContent || '';
                        return (
                            <Td
                                wrapperStyle={header.isVisible ? {width: `${header.width}px`} : {}}
                                key={`cell_${row[rhtID]}_${headerIndex}`}
                                row={row}
                                header={header}
                                rowIndex={rowIndex}
                                headerIndex={headerIndex}
                                cls={[
                                    classes.AlTop,
                                    activeColumn === header.key ? (crossHighlightClass || columnHighlightClass) : '',
                                    (cellHightlightClass && activeRow === row[rhtID] && activeColumn === header.key) ? cellHightlightClass : ''
                                ].join(' ')}
                            >{content}</Td>
                        );
                    })}
                    <RightMost
                        cls={`${classes.TbodyThMost} ${classes.TbodyThRightMost} ${classes.AlTop} ${activeRow === row[rhtID] ? (crossHighlightClass || rowHighlightClass) : ''}`}
                        opts={{ row, rowIndex: rowIndex + fromRow, type: 'body'}}
                    />
                </Tr>
            ))}
            <Filler {...{ height: footerFillerHeight, colspan, rightMost }} />
        </tbody>
    );
};
