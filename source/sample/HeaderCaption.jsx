import React from 'react';

const HeaderCaption = ({ total, activeColumn, activeRow, scrollTop, unFilter, activeFiltersCount }) => (
    <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', fontSize: '1.2em', padding:'10px' }}>
        Pre header component ({total}) [{activeRow}, {activeColumn}] scrollTop: [{scrollTop}]
        {activeFiltersCount && <button onClick={unFilter}>unFilter all</button>}
    </div>
);

export default HeaderCaption;
