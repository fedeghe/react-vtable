import React from 'react';

export default ({
    total, activeColumn, activeRow, scrollTop,
    unFilter,
    unSort,
    // activeFiltersCount,
    isSorting,
    isFiltering,
    loading,
    downloadJson,
    downloadXsv,
}) => (
    <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', fontSize: '1.2em', padding:'10px' }}>
        Pre header component ({total}) [{activeRow}, {activeColumn}] scrollTop: [{scrollTop}]
        {Boolean(isFiltering) && <button onClick={unFilter}>unFilter all</button>}-
        {Boolean(isSorting) && <button onClick={unSort}>unSort all</button>} -
        {loading && <span> LOADING</span>}
        <button onClick={downloadJson}>▼ json</button> - 
        <button onClick={() => downloadXsv()}>▼ csv</button> - 
        <button onClick={() => downloadXsv("\t")}>▼ tsv</button> - 
    </div>
);
