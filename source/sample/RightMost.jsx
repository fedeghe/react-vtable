import React from 'react';

const RightMost =({ row, rowIndex, isHeader, isFooter, from, to }) => {
    if (isFooter) return <div style={{ width: '100px' }}>RF {to}</div>;
    if (isHeader) return <div style={{ width: '100px' }}>RH {from}</div>;
    return `right ${rowIndex}`;
};

export default RightMost;