import React from 'react';

export default ({ row, rowIndex, type, fromRow, toRow }) => {
    switch(type) {
        case 'footer':
            return <div style={{ width: '100px' }}>RF {toRow}</div>;
        case 'header':
            return <div style={{ width: '100px' }}>RH {fromRow}</div>;
        default: 
            return <div style={{ width: '100px' }}>R {rowIndex}</div>;
    }
};
