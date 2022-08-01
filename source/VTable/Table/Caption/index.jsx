import React, {useContext, useCallback} from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
import {isFunction, asXsv, asJson} from './../../utils';

export default ({type, unFilter, unSort, globalFilter, globalFilterValue }) => {
    const {
            state: {
                footer: {
                    caption: {
                        height: postFooterHeight,
                        Component: FooterCaption
                    } = {}
                },
                header: {
                    caption: {
                        height: preHeaderHeight,
                        Component: HeaderCaption
                    } = {}
                },
                columns,
                total,
                activeColumn, activeRow,
                activeColumnIndex, activeRowIndex,
                filtered,
                virtual:{
                    fromRow, toRow, 
                    scrollTop,
                    loading
                },
                activeFiltersCount,
                isSorting,
                isFiltering,
                currentData,
                rhtID
            },
        } = useContext(TableContext),
        classes = useStyles({postFooterHeight, preHeaderHeight}),
        What = {
            header: {
                Component : HeaderCaption,
                cls: classes.HeaderCaption
            },
            footer: {
                Component : FooterCaption,
                cls:classes.FooterCaption
            }
        }[type],
        filterDataFields = useCallback(({fields}) => 
            fields ? currentData.map(e => {
                const o = fields.reduce((acc, f) => {
                    if (f in e) acc[f] = e[f];
                    return acc;
                }, {});
                return o;
            }) : currentData
        , [currentData]),
        downloadJson = useCallback(({fields} = {}) => {
            const a = document.createElement('a'),
                data = filterDataFields({fields}),
                blob = new Blob([JSON.stringify(asJson(data, rhtID))]);
            a.href = URL.createObjectURL(blob);
            a.target = '_blank';
            a.download = 'extract.json';                     //filename to download
            a.click();
        }, [filterDataFields, rhtID]),
        downloadXsv = useCallback(({separator = ',', fields} = {}) => {
            const a = document.createElement('a'),
                data = filterDataFields({fields}),
                xsv = asXsv(fields ? fields.map(f => ({key: f})) : columns, data, rhtID, separator),
                blob = new Blob([xsv], { type: 'text/csv' });
            a.href = URL.createObjectURL(blob);
            a.target = '_blank';
            a.download = 'extract.csv';                     //filename to download
            a.click();
        }, [columns, filterDataFields, rhtID]);

    return (
        What.Component && <div className={What.cls}>{
            isFunction(What.Component)
            ? <What.Component {...{
                fromRow, toRow, total,
                activeColumn, activeColumnIndex,
                activeRow, activeRowIndex,
                filtered,
                scrollTop,
                unFilter, unSort,
                globalFilter, globalFilterValue,
                activeFiltersCount,
                isSorting,
                isFiltering,
                loading,
                downloadJson, downloadXsv
            }}/>
            : What.Component
        }</div>
    );
};