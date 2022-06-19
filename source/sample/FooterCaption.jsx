import React from 'react';

export default ({
    from, to,
    activeColumnIndex, activeRowIndex,
    filtered, total
}) => (
    <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', textAlign: 'center' }}>
        Post footer component [{from}, {to}] [row: {activeRowIndex}, col: {activeColumnIndex}] filtered {filtered} out of {total}
    </div>
);

