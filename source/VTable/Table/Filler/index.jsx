import React from 'react';
import useStyles from './style.js';
/**
 * Here does not make any sense to use Tr and Td
 */
export default ({
    height,
    colspan,
}) => {
    const classes = useStyles({height});
    return <tr className={classes.Tr}>
        <td colSpan={colspan} className={classes.Td}></td>
    </tr>;
};
