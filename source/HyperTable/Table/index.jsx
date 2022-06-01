import React, { useCallback, useContext } from 'react';
import NoData from './NoData';

import THeader from './THeader';
import TBody from './TBody';
import TFooter from './TFooter';
import TableContext from './../Context';
import { debounce } from './../utils';
import useStyles from './style.js';

const Table = () => {

    const { state, dispatch } = useContext(TableContext),
        {
            rows,
            dimensions: {
                width, height,
                rowHeight
            },
            header: {
                height: headerHeight,
                caption: {
                    component: HeaderCaption,
                    height: preHeaderHeight
                } = {}
            } = {},
            footer: {
                height: footerHeight,
                caption: {
                    component: FooterCaption,
                    height: postFooterHeight
                } = {}
            } = {},
            debounceTimes: {
                scrolling: scrollingDebounceTime
            },
            virtual: {
                scrollTop,
                dataHeight
            }
        } = state,
        classes = useStyles({
            width, height,
            rowHeight,
            preHeaderHeight: HeaderCaption ? preHeaderHeight : 0,
            postFooterHeight: FooterCaption ? postFooterHeight : 0,
            headerHeight,
            footerHeight,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onScroll = useCallback(debounce(e => {
            // e.preventDefault();
            // e.stopPropagation();
            const payload = e.target.scrollTop;
            dispatch({
                type: 'scroll',
                payload: payload > 0 ? payload : 0
            });
        }, scrollingDebounceTime), []);
        
    return (
        <div
            className={classes.TableContainer}
            onScroll={e => {
                if (Math.abs(e.target.scrollTop - scrollTop) > dataHeight / 4){
                    dispatch({type: 'loading'});
                }
                onScroll(e);
            }}
        >
            <table className={classes.Table}>
                <THeader />
                {rows.length ? <TBody /> :  <NoData />}
                <TFooter />
            </table>
        </div>
    );
};

export default Table;