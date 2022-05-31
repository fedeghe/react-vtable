import React from 'react';

const HeaderCaption = ({ total, activeColumn, activeRow, scrollTop }) => (
    <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', fontSize: '1.2em', padding:'10px' }}>
        Pre header component ({total}) [{activeRow}, {activeColumn}] scrollTop: [{scrollTop}]
    </div>
);

export default HeaderCaption;
