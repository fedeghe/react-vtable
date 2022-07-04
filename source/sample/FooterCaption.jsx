import React from 'react';

export default ({
    fromRow, toRow,
    activeColumnIndex, activeRowIndex,
    filtered, total
}) => (
    <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', textAlign: 'center' }}>
        Post footer component [{fromRow}, {toRow}] [row: {activeRowIndex}, col: {activeColumnIndex}] filtered {filtered} out of {total}
    </div>
);

