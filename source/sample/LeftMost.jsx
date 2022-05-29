import React from 'react';

const LeftMost = ({ row, rowIndex, isHeader, isFooter, from, to }) => {
    if (isFooter) return <div style={{ width: '100px' }}>LF {to}</div>;
    if (isHeader) return <div style={{ width: '100px' }}>LH {from}</div>;
    return <div style={{ width: '100px' }}>L {rowIndex}</div>;
};

export default LeftMost;