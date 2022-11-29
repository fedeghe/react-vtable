import React, { useContext, useCallback } from 'react';
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
        classes = useStyles({ rowHeight }),
        getTdContent = useCallback(({row, rowIndex}) =>
            (header, headerIndex) => {
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
            },
            [activeColumn, activeRow, cellHightlightClass, classes.AlTop, columnHighlightClass, commonRemovedContent, crossHighlightClass, rhtID]
        ),
        getSideMostClasses = useCallback(
            ({row, dirClass}) => `${classes.TbodyThMost} ${dirClass} ${classes.AlTop} ${activeRow === row[rhtID] ? (crossHighlightClass || rowHighlightClass) : ''}`,
            [activeRow, classes.AlTop, classes.TbodyThMost, crossHighlightClass, rhtID, rowHighlightClass]
        ),
        getTrContent = useCallback((row, rowIndex) => (
            <Tr
                cls={`${activeRow === row[rhtID] ? (crossHighlightClass || rowHighlightClass || "") : ''}`}
                key={row[rhtID]}
            >
                <LeftMost
                    cls={getSideMostClasses({row, dirClass: classes.TbodyThLeftMost})}
                    opts={{ row, rowIndex: rowIndex + fromRow, type: 'body' }}
                />
                {headers.map(getTdContent({row, rowIndex}))}
                <RightMost
                    cls={getSideMostClasses({row, dirClass: classes.TbodyThRightMost})}
                    opts={{ row, rowIndex: rowIndex + fromRow, type: 'body'}}
                />
            </Tr>
        ), [activeRow, classes.TbodyThLeftMost, classes.TbodyThRightMost, crossHighlightClass, fromRow, getSideMostClasses, getTdContent, headers, rhtID, rowHighlightClass]);

    return (
        <tbody>
            <Filler {...{ height: headerFillerHeight, colspan, LeftMost, RightMost }} />
            {rows.map(getTrContent)}
            <Filler {...{ height: footerFillerHeight, colspan, LeftMost, RightMost }} />
        </tbody>
    );
};
