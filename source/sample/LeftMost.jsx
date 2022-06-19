import React from 'react';

export default ({ row, rowIndex, type, from, to }) => {
    switch(type) {
        case 'footer': 
            return <div style={{ width: '100px' }}>LF {to}</div>;
        case 'header': 
            return <div style={{ width: '100px' }}>LH {from}</div>;
        default: 
            return <div style={{ width: '100px' }}>L {rowIndex}</div>;
    }
};
