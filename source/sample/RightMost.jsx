import React from 'react';

export default ({ row, rowIndex, type, fromRow, toRow }) => {
    switch(type) {
        case 'footer':
            return <div style={{ width: '100px', paddingLeft:10 }}>RF {toRow}</div>;
        case 'header':
            return <div style={{ width: '100px', paddingLeft:10 }}>RH {fromRow}</div>;
        default: 
            return <div style={{ width: '100px', paddingLeft:10 }}>R {rowIndex}</div>;
    }
};
