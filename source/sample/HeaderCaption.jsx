import React from 'react';

const HeaderCaption = ({
    total, activeColumn, activeRow, scrollTop,
    unFilter,
    unSort,
    // activeFiltersCount,
    isSorting,
    isFiltering,
    loading,
    downloadJson,
    downloadCsv,
}) => (
    <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', fontSize: '1.2em', padding:'10px' }}>
        Pre header component ({total}) [{activeRow}, {activeColumn}] scrollTop: [{scrollTop}]
        {Boolean(isFiltering) && <button onClick={unFilter}>unFilter all</button>}
        {Boolean(isSorting) && <button onClick={unSort}>unSort all</button>}
        {loading && <span> LOADING</span>}
        <span onClick={downloadJson}>download as json</span> - 
        <span onClick={downloadCsv}>download as csv</span> - 
    </div>
);

export default HeaderCaption;
