import React from 'react';

export default ({
    height,
    colspan,
}) => (
    <tr style={{display: height > 0 ? 'table-row' : 'none'}}>
        <td colSpan={colspan} style={{height:`${height}px`}}></td>
    </tr>
);

