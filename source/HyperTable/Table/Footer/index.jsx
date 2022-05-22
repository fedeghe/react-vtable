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
    } = useContext(TableContext)
    const classes = useStyles({footerHeight});
    return (Boolean(footerHeight) && footerHeight && <tfoot className={classes.Tfoot}>
    <tr>
        <LeftMost cls={`${classes.TfootTh}  ${classes.TorigBL}`} opts={{isFooter:true}}/>
        {columns.map((column, k) => {
            let label = column.key;
            if ('footerLabel' in column) {
                label = typeof column.footerLabel === 'function' ? column.footerLabel(column) : column.footerLabel
            }
            return <th key={`foot${k}`} className={`${classes.TfootTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}>
                {label}
            </th>
        })}
        <RightMost cls={`${classes.TfootTh}  ${classes.TorigBR}`} opts={{isFooter:true}}/>
    </tr>
</tfoot>)
}
