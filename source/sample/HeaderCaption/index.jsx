import React from 'react';
import useStyles from './style.js';

export default ({
    total, activeColumn, activeRow, scrollTop,
    unFilter,
    unSort,
    activeFiltersCount,
    isSorting,
    isFiltering,
    loading,
    downloadJson,
    downloadXsv,
}) => {
    const classes = useStyles({isSorting,});
    return (
    <div className={classes.Container}>
        <div>
            Pre header component ({total}) [{activeRow}, {activeColumn}] scrollTop: [{scrollTop}]
        </div>
        <div className={classes.Butts}>
            {loading && <div className="spinner-grow spinner-grow-sm text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            {Boolean(isFiltering) && <button type="button" className="btn btn-secondary btn-sm" onClick={unFilter}>unfilter all <span className="badge text-bg-secondary text-warning">{activeFiltersCount}</span></button>}
            {Boolean(isSorting) && <button type="button" className="btn btn-secondary btn-sm" onClick={unSort}>unsort</button>}
            <button type="button" className="btn btn-secondary btn-sm" onClick={downloadJson}>▼ json</button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => downloadXsv()}>▼ csv</button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => downloadXsv("\t")}>▼ tsv</button>
        </div>
    </div>
)};
