import React from 'react';

export default ({
    fromRow, toRow,
    activeColumnIndex, activeRowIndex,
    filtered, total
}) => (
    <div style={{ color: 'white', backgroundColor: 'rgb(112, 182, 201)', height: 'inherit', textAlign: 'center' }}>
        Post footer component [{fromRow}, {toRow}] [row: {activeRowIndex}, col: {activeColumnIndex}] filtered {filtered} out of {total}
    </div>
);

