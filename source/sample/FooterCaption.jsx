import React from 'react';

const FooterCaption = ({ from, to, activeColumnIndex, activeRowIndex, filtered, total }) => (
    <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', textAlign: 'center' }}>Post footer component [{from}, {to}] [row: {activeRowIndex}, col: {activeColumnIndex}] filtered {filtered} out of {total}</div>
);

export default FooterCaption;
