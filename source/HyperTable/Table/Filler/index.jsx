import React from 'react';

/**
 * Here does not make any sense to use Tr and Td
 */
const Filler = ({
    height,
    colspan,
}) => (
    <tr style={{display: height > 0 ? 'table-row' : 'none'}}>
        <td colSpan={colspan} style={{height:`${height}px`}}></td>
    </tr>
);

export default Filler;