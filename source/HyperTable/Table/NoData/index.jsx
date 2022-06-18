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
                    contentHeight: height
                }
            }
        } = useContext(TableContext),
        classes = useStyles({width, height});

    return <tbody>
        <tr>
            <td colSpan={colspan} className={classes.Td}>
                <div className={classes.NoData}>
                    <NoFilterData total={total} />
                </div>
            </td>
        </tr>
    </tbody>;
};
export default NoData;