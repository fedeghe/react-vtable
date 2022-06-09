import React, { useContext } from 'react';
import TableContext from '../../Context';

import useStyles from './style.js';
const NoData = () => {

    const {
            state: {
                NoFilterData,
                dimensions: { width },
                total,
                virtual: {
                    colspan,
                    contentHeight
                }
            }
        } = useContext(TableContext),
        classes = useStyles({width, height: contentHeight});
        console.log(contentHeight)
    return <tbody>
        <tr>
            <td colSpan={colspan}>
                <div className={classes.NoData}>{NoFilterData({ total })}</div>
            </td>
        </tr>
    </tbody>;
};
export default NoData;