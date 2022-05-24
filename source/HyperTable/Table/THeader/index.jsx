import React, {useContext} from 'react';
import TableContext from '../../Context';
import RightMost from '../RightMost';
import LeftMost from '../LeftMost';
import Tr from '../Tr';
import Th from '../Th';
import useStyles from './style.js';
export default () => {
    const {
            state: {
                headerHeight,
                columns,
                activeCol,
                crossHighlight,
                columnHighlight
            },
        } = useContext(TableContext),
        classes = useStyles({headerHeight});
    return (Boolean(headerHeight) &&
        <thead className={classes.Thead}>
            <Tr>
                <LeftMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderLeft}`} opts={{isHeader:true}}/>
                {columns.map((column, columnIndex) => {
                    let content = column.key;
                    if ('header' in column) {
                        content = typeof column.header === 'function' ? column.header({column, columnIndex}) : column.header
                    }

                    return <Th
                        key={`head${columnIndex}`}
                        cls={`TableHeader ${classes.TheadTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}
                        content={content}
                        column={column}
                        columnIndex={columnIndex}
                        pos="header"
                    />
                })}
                <RightMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderRight}`} opts={{isHeader:true}}/>
            </Tr>
        </thead>
    );
}
