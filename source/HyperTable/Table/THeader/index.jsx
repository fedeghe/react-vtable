import React, {useContext} from 'react';
import TableContext from '../../Context';
import RightMost from '../RightMost';
import LeftMost from '../LeftMost';
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
            <tr>
                <LeftMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderLeft}`} opts={{isHeader:true}}/>
                {columns.map((column, k) => {
                    let label = column.key;
                    if ('headerLabel' in column) {
                        label = typeof column.headerLabel === 'function' ? column.headerLabel(column) : column.headerLabel
                    }

                    return <th key={`head${k}`} className={`${classes.TheadTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}>
                        {label}
                        {/* filter */}
                    </th>
                })}
                <RightMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderRight}`} opts={{isHeader:true}}/>
            </tr>
        </thead>
    );
}
