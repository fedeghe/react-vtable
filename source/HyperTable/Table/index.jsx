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
            width, height,
            preHeaderHeight, postFooterHeight,
            headerHeight, footerHeight,
            PreHeader, PostFooter,
            virtual: {
                rowHeight
            }
        } = state,
        classes = useStyles({
            width, height,
            preHeaderHeight: PreHeader ? preHeaderHeight : 0,
            postFooterHeight: PostFooter ? postFooterHeight : 0,
            headerHeight,
            footerHeight,
            rowHeight
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onScroll = useCallback(debounce(e => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({
                type: 'scroll',
                payload: e.nativeEvent.target.scrollTop
            });
        }, 20), []);

    return (
        <div
            className={classes.TableContainer}
            onScroll={onScroll}
        >
            <table className={classes.Table}>
                <THeader />
                {rows.length ? <TBody /> : <NoData />}
                <TFooter />
            </table>
        </div>
    );
};

export default Table;