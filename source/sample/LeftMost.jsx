import React from 'react';

export default ({ row, rowIndex, type, fromRow, toRow }) => {
    switch(type) {
        case 'footer': 
            return <div style={{ width: '100px', paddingLeft:10 }}>LF {toRow}</div>;
        case 'header': 
            return <div style={{ width: '100px', paddingLeft:10 }}>LH {fromRow}</div>;
        default: 
            return <div style={{ width: '100px', paddingLeft:10 }}>L {rowIndex}</div>;
    }
};
