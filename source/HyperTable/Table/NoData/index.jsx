import React, {useContext} from 'react';
import TableContext from '../../Context';

const NoData = () => {
    const {state: {noFilterData, width, total,  virtual: {colspan}}} = useContext(TableContext);
    return <tbody>
        <tr>
            <td colSpan={colspan}>
                <div style={{position:'sticky', left:  0, width:`${width}px`, textAlign:'center', margin:'30px 0'}}>{noFilterData({total})}</div>
            </td>
        </tr>
    </tbody>;
};
export default NoData;