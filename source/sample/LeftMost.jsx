import React from 'react';

export default ({ row, rowIndex, type, fromRow, toRow }) => {
    switch(type) {
        case 'footer': 
            return <div style={{ width: '100px' }}>LF {toRow}</div>;
        case 'header': 
            return <div style={{ width: '100px' }}>LH {fromRow}</div>;
        default: 
            return <div style={{ width: '100px' }}>L {rowIndex}</div>;
    }
};
