import React, {useContext} from 'react';
import TableContext from '../../Context';

const NoData = () => {
    const {state: {noFilterData}} = useContext(TableContext);
    return (<tbody><tr><td>{noFilterData}</td></tr></tbody>);
};
export default NoData;