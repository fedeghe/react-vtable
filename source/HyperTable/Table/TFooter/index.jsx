import React, {useContext, useCallback} from 'react'
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
                columnHighlight,

                onFooterHighlight
            },
            dispatch
        } = useContext(TableContext),
        classes = useStyles({footerHeight});

    // const onMouseOver = useCallback()

    return (
        Boolean(footerHeight) &&
        <tfoot className={classes.Tfoot}>
            <Tr>
                <LeftMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterLeft}`} opts={{isFooter:true}}/>
                {columns.map((column, k) => {
                    let content = column.key;
                    if ('footer' in column) {
                        content = typeof column.footer === 'function' ? column.footer({column, index: k}) : column.footer
                    }
                    return <Th
                        key={`foot${k}`}
                        cls={`TableFooter ${classes.TfootTh} ${activeCol === column.key ? (crossHighlight || columnHighlight) : ''}`}
                        content={content}
                        column={column}
                        j={k}
                        isFooter
                    />
                })}
                <RightMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterRight}`} opts={{isFooter:true}}/>
            </Tr>
        </tfoot>
    );
}
