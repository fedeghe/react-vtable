import React, {useContext, useCallback} from 'react';
import TableContext from './../../Context';
import { ACTION_TYPES } from './../../reducer/actions';
import RightMost from './../RightMost';
import LeftMost from '../LeftMost';
import Tr from './../Tr';
import Th from './../Th';
import {isFunction, debounce} from './../../utils';
import useStyles from './style.js';
export default () => {
    const {
            state: {
                footer: {
                    height: footerHeight,
                },
                headers,
                activeColumn,
                cls: { 
                    highlight: {
                        crossHighlightClass,
                        columnHighlightClass,
                    },
                },
                filters,
                sorting:{header: sortingColumn, direction: sortingDirection},
                debounceTimes: {
                    filtering : filteringDebounceTime,
                } ,
                activeFiltersCount,
                isFiltering
            },
            dispatch
        } = useContext(TableContext),

        classes = useStyles({footerHeight}),

        footerSortDir = useCallback(({footer, direction}) => 
            () => dispatch({
                type: ACTION_TYPES.SORT,
                payload: {
                    header: footer.key,
                    direction,
                    sorter: footer.sort
                }
            }),
            [dispatch]
        ),
        unSort = useCallback(() => dispatch({type: ACTION_TYPES.UNSORT}), [dispatch]),
        setFilterValue = useCallback(({footer }) => debounce(value => dispatch({
            type: ACTION_TYPES.FILTER,
            payload: {
                header: footer.key,
                value
            }
        }), filteringDebounceTime), [dispatch, filteringDebounceTime]),
        setFilterVisibility = useCallback(({footer}) => visibility => 
            dispatch({
                type: ACTION_TYPES.FILTER,
                payload: {
                    header: footer.key,
                    visibility
                }
            }), [dispatch]),
        unFilter = useCallback(() => debounce(() => dispatch({type: ACTION_TYPES.UNFILTER}), filteringDebounceTime), [dispatch, filteringDebounceTime]),
        setVisibilistVisibility = useCallback(({footer}) => visibility => dispatch({
            type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY,
            payload: {
                key: footer.key,
                isVisible: visibility
            }
        }), [dispatch]),

        getColumnContent = useCallback(({footer, footerIndex}) => {
            let content;
            if ('footer' in footer) {
                if (isFunction(footer.footer)) {
                    const footerProps = {
                        footer,
                        footerIndex,
                    };
                    if (isFunction(footer.sort)) {
                        footerProps.sort = {
                            sortAsc: footerSortDir({footer, direction: 'asc'}),
                            sortDesc: footerSortDir({footer, direction: 'desc'}),
                            unSort,
                            direction: sortingDirection,
                            isSorting: footer.key === sortingColumn,
                        };
                    }
                    if (isFunction(footer.filter)) {
                        const theFilter = filters?.[footer.key];

                        footerProps.filter = {
                            value: theFilter?.value,
                            setValue: setFilterValue({footer}),
                            visibility: theFilter?.visibility,
                            setVisibility: setFilterVisibility({footer}),
                            unFilter: unFilter(),
                            activeFiltersCount,
                            isFiltering
                        };
                    }
                    if (isFunction(footer.visibilist)){
                        footerProps.visibility = {
                            setVisibility: setVisibilistVisibility({footer}),
                            isVisible: footer.isVisible,
                            footer,
                        };
                    }
                    content = footer.footer(footerProps);
                } else {
                    content = footer.isVisible ? footer.footer : null;
                }
            } else {
                content = footer.isVisible ? footer.key : null;
            }
            return content;
        }, [
            footerSortDir, unSort, sortingDirection, sortingColumn,
            filters, setFilterValue, setFilterVisibility, unFilter,
            activeFiltersCount, isFiltering, setVisibilistVisibility
        ]),
        getHeaderContent = useCallback((footer, footerIndex) => (
            <Th
                wrapperStyle={footer.isVisible ? {width: `${footer.width}px`} : {}}
                key={`foot${footerIndex}`}
                cls={`TableFooter ${classes.TfootTh} ${activeColumn === footer.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                header={footer}
                headerIndex={footerIndex}
                pos="footer"
            >{getColumnContent({footer, footerIndex})}</Th>
        ), [activeColumn, classes.TfootTh, columnHighlightClass, crossHighlightClass, getColumnContent]);
        

    return (
        Boolean(footerHeight) &&
        <tfoot className={classes.Tfoot}>
            <Tr cls={classes.Tfoot}>
                <LeftMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterLeft}`} opts={{type: 'footer'}}/>
                {headers.map(getHeaderContent)}
                <RightMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterRight}`} opts={{type: 'footer'}}/>
            </Tr>
        </tfoot>
    );
};
