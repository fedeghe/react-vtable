import React, {useContext} from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
const NoData = () => {
    const classes = useStyles(),
        {state: {noFilterData}} = useContext(TableContext);
    return (<div className={classes.NoData}>{noFilterData}</div>);
};
export default NoData;