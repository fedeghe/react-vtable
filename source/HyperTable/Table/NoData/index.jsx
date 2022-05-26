import React, {useContext} from 'react';
import TableContext from '../../Context';

const NoData = () => {
    const {state: {noFilterData, virtual: {colspan}}} = useContext(TableContext);
    return <tbody>
        <tr>
            <td colSpan={colspan} style={{width:'100%', textAlign:'center'}}>
                <div style={{margin:'30px 0'}}>{noFilterData}</div>
            </td>
        </tr>
    </tbody>;
};
export default NoData;