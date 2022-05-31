import React, {useContext} from 'react';
import TableContext from '../../Context';
import RightMost from '../RightMost';
import LeftMost from '../LeftMost';
import Tr from '../Tr';
import Th from '../Th';
import {isFunction} from './../../utils';
import useStyles from './style.js';
const TFooter = () => {
    const {
            state: {
                footer: {
                    height: footerHeight,
                },
                columns,
                activeColumn,
                cls: {
                    highlight: {
                        crossHighlightClass,
                        columnHighlightClass
                    }
                }
            },
        } = useContext(TableContext),
        classes = useStyles({footerHeight});

    return (
        Boolean(footerHeight) &&
        <tfoot className={classes.Tfoot}>
            <Tr>
                <LeftMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterLeft}`} opts={{isFooter:true}}/>
                {columns.map((column, columnIndex) => {
                    let content = column.key;
                    if ('footer' in column) {
                        content = isFunction(column.footer) ? column.footer({column, columnIndex}) : column.footer;
                    }
                    return <Th
                        key={`foot${columnIndex}`}
                        cls={`TableFooter ${classes.TfootTh} ${activeColumn === column.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                        content={content}
                        column={column}
                        columnIndex={columnIndex}
                        pos="footer"
                    />;
                })}
                <RightMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterRight}`} opts={{isFooter:true}}/>
            </Tr>
        </tfoot>
    );
};
export default TFooter;