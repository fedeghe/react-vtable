import React, { useCallback, useContext, useRef, useEffect } from 'react';
import NoData from './NoData';

import TBody from './TBody';
import THeader from './THeader';
// import Ter from './Ter';
import TFooter from './TFooter';
import TableContext from './../Context';
import { debounce } from './../utils';
import useStyles from './style.js';

export default () => {
    const ref = useRef(),
        { state, dispatch } = useContext(TableContext),
        {
            rows,
            dimensions: {
                width, height,
                rowHeight
            },
            header: {
                height: headerHeight,
                caption: {
                    Component: HeaderCaption,
                    height: preHeaderHeight
                } = {}
            } = {},
            footer: {
                height: footerHeight,
                caption: {
                    Component: FooterCaption,
                    height: postFooterHeight
                } = {}
            } = {},
            debounceTimes: {
                scrolling: scrollingDebounceTime
            },
            events: { shiftPageScroll },
            virtual: {
                scrollTop,
                dataHeight,
                visibleElementsHeight,
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
        doOnScroll = useCallback(debounce(e => {
            e.preventDefault();
            e.stopPropagation();
            const payload = e.target.scrollTop;
            dispatch({
                type: 'scroll',
                payload: payload > 0 ? payload : 0
            });
        }, scrollingDebounceTime), []),

        onScroll = useCallback(e => {
            Math.abs(e.target.scrollTop - scrollTop) > (dataHeight / 4)
                && dispatch({ type: 'loading' });
            doOnScroll(e);
        }, [dataHeight, dispatch, doOnScroll, scrollTop]),

        onKeyDown = useCallback(e => {
            if (shiftPageScroll &&
                (
                    (e.shiftKey && [38, 40].includes(e.keyCode)) // shift+arrowUp, shift + arrowDown
                    || [33, 34].includes(e.keyCode)// pgup pgdown
                )
            ) {
                e.preventDefault();
                e.stopPropagation();
                const sign = [34, 40].includes(e.keyCode) ? 1 : -1,
                    scrTo = scrollTop + sign * visibleElementsHeight;
                ref.current.scrollTo(0, scrTo >= 0 ? scrTo : 0);
            }
        }, [scrollTop, shiftPageScroll, visibleElementsHeight]);
    /**
     * on filter | unfilter
     * the state.virtual.scrollTop gets resetted... (a linear solution is not possible to mantain the scroll position)
     * thus here when it gets to 0 we force the scroll top to reset
     */
    useEffect(() => {
        if (scrollTop === 0) {
            // ref.current.scrollTo(ref.current.scrollLeft, 0);
            ref.current.scrollTop = 0;
        }
    }, [scrollTop, ref]);

    return (
        <div
            ref={ref}
            tabIndex={0} // needed for enavble keydown
            className={classes.TableContainer}
            onKeyDown={onKeyDown}
            onScroll={onScroll}
        >
            <table className={classes.Table}>
                <THeader />
                {/* <Ter typehf='header'/> */}
                {rows.length ? <TBody /> : <NoData />}
                {/* <Ter typehf='footer'/> */}
                <TFooter />
            </table>
        </div>
    );
};

