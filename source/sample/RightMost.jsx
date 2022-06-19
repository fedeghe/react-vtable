import React from 'react';

export default ({ row, rowIndex, type, from, to }) => {
    switch(type) {
        case 'footer':
            return <div style={{ width: '100px' }}>RF {to}</div>;
        case 'header':
            return <div style={{ width: '100px' }}>RH {from}</div>;
        default: 
            return <div style={{ width: '100px' }}>R {rowIndex}</div>;
    }
};
