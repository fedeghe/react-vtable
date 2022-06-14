import React from 'react';
import useStyles from './style.js';
/**
 * Here does not make any sense to use Tr and Td
 */
const Filler = ({
    height,
    colspan,
    leftMost,
    rightMost
}) => {

    /**
     * Here the leftMost and right most styles column could be rendered, it woud look a way better
     */
    const classes = useStyles({height});
    return <tr className={classes.Tr}>
        <td colSpan={colspan} className={classes.Td}></td>
    </tr>;
};

export default Filler;