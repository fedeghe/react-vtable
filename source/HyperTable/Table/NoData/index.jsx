import React, { useContext } from 'react';
import TableContext from '../../Context';

import useStyles from './style.js';
const NoData = () => {

    const {
            state: {
                noFilterData,
                dimensions: { width },
                total,
                virtual: {
                    colspan,
                    contentHeight
                }
            }
        } = useContext(TableContext),
        classes = useStyles({width, height: contentHeight});
    return <tbody>
        <tr>
            <td colSpan={colspan}>
                <div className={classes.NoData}>{noFilterData({ total })}</div>
            </td>
        </tr>
    </tbody>;
};
export default NoData;