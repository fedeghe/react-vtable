import React from 'react';

export default ({
    height,
    virtualColspan,
}) => (
    <tr style={{display: height > 0 ? 'table-row' : 'none'}}>
        <td colSpan={virtualColspan} style={{height:`${height}px`}}></td>
    </tr>
);

