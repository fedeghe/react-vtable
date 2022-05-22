import React, {useContext} from 'react'
import TableContext from '../../Context'
import useStyles from './style.js'
export default () => {
    const classes = useStyles();
    const {state: {PreHeader}} = useContext(TableContext)
    return (<div className={classes.NoData}>{noFilterData}</div>)
}
