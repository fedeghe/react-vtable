import React, {useContext} from 'react'
import TableContext from '../../Context'
import LeftMost from '../LeftMost'
import RightMost from '../RightMost'
import useStyles from './style.js'
export default () => {
    const {
            state: {
                footerHeight,
                columns,
                activeCol,
                crossHighlight,
                columnHighlight
            },
        } = useContext(TableContext),
        classes = useStyles({footerHeight});

    return (
        Boolean(footerHeight) &&
        <tfoot className={classes.Tfoot}>
            <tr>
                <LeftMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterLeft}`} opts={{isFooter:true}}/>
                {columns.map((column, k) => {
                    let label = column.key;
                    if ('footerLabel' in column) {
                        label = typeof column.footerLabel === 'function' ? column.footerLabel(column) : column.footerLabel
                    }
                    return <th key={`foot${k}`} className={`TableFooter ${classes.TfootTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}>
                        {label}
                    </th>
                })}
                <RightMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterRight}`} opts={{isFooter:true}}/>
            </tr>
        </tfoot>
    );
}
