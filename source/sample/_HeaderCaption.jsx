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
    <div style={{ color: 'white', backgroundColor: 'royalBlue', height: 'inherit', padding:'10px' }}>
        Pre header component ({total}) [{activeRow}, {activeColumn}] scrollTop: [{scrollTop}]

        {Boolean(isFiltering) && <button type="button" className="btn btn-warning btn-sm" onClick={unFilter}>unfilter all</button>}
        {Boolean(isSorting) && <button type="button" className="btn btn-warning btn-sm" onClick={unSort}>unsort all</button>}
        <button type="button" className="btn btn-info btn-sm" onClick={downloadJson}>▼ json</button>
        <button type="button" className="btn btn-info btn-sm" onClick={() => downloadXsv()}>▼ csv</button>
        <button type="button" className="btn btn-info btn-sm" onClick={() => downloadXsv("\t")}>▼ tsv</button>
        {loading && <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>}
    </div>
);
