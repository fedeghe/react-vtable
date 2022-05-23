import React, {useContext} from 'react'
import TableContext from '../../Context'
import RightMost from '../RightMost'
import LeftMost from '../LeftMost'
import Tr from '../Tr';
import Th from '../Th';
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
            <Tr>
                <LeftMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterLeft}`} opts={{isFooter:true}}/>
                {columns.map((column, j) => {
                    let content = column.key;
                    if ('footer' in column) {
                        content = typeof column.footer === 'function' ? column.footer({column, index: j}) : column.footer
                    }
                    return <Th
                        key={`foot${j}`}
                        cls={`TableFooter ${classes.TfootTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}
                        content={content}
                        column={column}
                        j={j}
                        isFooter
                    />
                })}
                <RightMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterRight}`} opts={{isFooter:true}}/>
            </Tr>
        </tfoot>
    );
}
