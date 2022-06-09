import React from 'react';

const LeftMost = ({ row, rowIndex, type, from, to }) => {
    switch(type) {
        case 'footer': 
            return <div style={{ width: '100px' }}>LF {to}</div>;
        case 'header': 
            return <div style={{ width: '100px' }}>LH {from}</div>;
        default: 
            return <div style={{ width: '100px' }}>L {rowIndex}</div>;
    }
};

export default LeftMost;