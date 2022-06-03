import React, {useContext, useCallback} from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
import {isFunction} from './../../utils';
const Caption = ({type, unFilter, unSort }) => {
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
                // postFooterHeight,
                // FooterCaption,
                // preHeaderHeight,
                // HeaderCaption,

                total,
                activeColumn, activeRow,
                activeColumnIndex, activeRowIndex,
                filtered,
                virtual:{
                    from, to, 
                    scrollTop,
                    loading
                },
                activeFiltersCount,
                isSorting,
                isFiltering,
                currentData
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
                blob = new Blob([JSON.stringify(currentData)]);
            a.href = URL.createObjectURL(blob);
            a.download = 'newFile.json';                     //filename to download
            a.click();
        }, [currentData]),
        downloadCsv = useCallback(() => {
            const a = document.createElement('a'),
                blob = new Blob([JSON.stringify(currentData)]);
            a.href = URL.createObjectURL(blob);
            a.download = 'newFile.json';                     //filename to download
            a.click();
        }, [currentData]);

    return (
        What.Component && <div className={What.cls}>{
            isFunction(What.Component)
            ? <What.Component {...{
                from, to, total,
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
export default Caption;