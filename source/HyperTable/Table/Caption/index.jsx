import React, {useContext, useCallback} from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
import {isFunction, asCsv, asJson} from './../../utils';

export default ({type, unFilter, unSort }) => {
    const {
            state: {
                footer: {
                    caption: {
                        height: postFooterHeight,
                        component: FooterCaption
                    } = {}
                },
                header: {
                    caption: {
                        height: preHeaderHeight,
                        component: HeaderCaption
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
        downloadJson = useCallback(() => {
            const a = document.createElement('a'),
                blob = new Blob([JSON.stringify(asJson(currentData, rhtID))]);
            a.href = URL.createObjectURL(blob);
            a.target = '_blank';
            a.download = 'extract.json';                     //filename to download
            a.click();
        }, [currentData, rhtID]),
        downloadCsv = useCallback(() => {
            const a = document.createElement('a'),
                csv = asCsv(columns, currentData, rhtID),
                blob = new Blob([csv], { type: 'text/csv' });
            a.href = URL.createObjectURL(blob);
            a.target = '_blank';
            a.download = 'extract.csv';                     //filename to download
            a.click();
        }, [columns, currentData, rhtID]);

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
                activeFiltersCount,
                isSorting,
                isFiltering,
                loading,
                downloadJson, downloadCsv
            }}/>
            : What.Component
        }</div>
    );
};