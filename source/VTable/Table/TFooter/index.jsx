import React, {useContext, useCallback} from 'react';
import TableContext from '../../Context';
import { ACTION_TYPES } from '../../reducer';
import RightMost from '../RightMost';
import LeftMost from '../LeftMost';
import Tr from '../Tr';
import Th from '../Th';
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

        getColumnContent = useCallback(({header, headerIndex}) => {
            let content;
            if ('footer' in header) {
                if (isFunction(header.footer)) {
                    const footerProps = {
                        header,
                        headerIndex,
                    };
                    if (isFunction(header.sort)) {
                        footerProps.sort = {
                            sortAsc: () => dispatch({
                                type: ACTION_TYPES.SORT,
                                payload: {
                                    header: header.key,
                                    direction: 'asc',
                                    sorter: header.sort
                                }
                            }),
                            sortDesc: () => dispatch({
                                type: ACTION_TYPES.SORT,
                                payload: {
                                    header: header.key,
                                    direction: 'desc',
                                    sorter: header.sort
                                }
                            }),
                            unSort: () => dispatch({type: ACTION_TYPES.UNSORT}),
                            direction: sortingDirection,
                            isSorting: header.key === sortingColumn,
                        };
                    }
                    if (isFunction(header.filter)) {
                        const theFilter = filters?.[header.key];

                        footerProps.filter = {
                            value: theFilter?.value,
                            setValue: debounce(value => dispatch({
                                type: ACTION_TYPES.FILTER,
                                payload: {
                                    header: header.key,
                                    value
                                }
                            }), filteringDebounceTime),
                            visibility: theFilter?.visibility,
                            setVisibility: visibility => 
                                dispatch({
                                    type: ACTION_TYPES.FILTER,
                                    payload: {
                                        header: header.key,
                                        visibility
                                    }
                                }),
                            unFilter: debounce(() => dispatch({type: ACTION_TYPES.UNFILTER}), filteringDebounceTime),
                            activeFiltersCount,
                            isFiltering
                        };
                    }
                    if (isFunction(header.visibilist)){
                        footerProps.visibility = {
                            setVisibility: visibility => dispatch({
                                type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY,
                                payload: {
                                    key: header.key,
                                    isVisible: visibility
                                }
                            }),
                            isVisible: header.isVisible,
                            header,
                        };
                    }
                    content = header.footer(footerProps);
                } else {
                    content = header.isVisible ? header.footer : '';
                }
            } else {
                content = header.isVisible ? header.key : '';
            }
            return content;
        }, [
            sortingDirection, sortingColumn, dispatch,
            filters, filteringDebounceTime,
            activeFiltersCount, isFiltering
        ]);
        

    return (
        Boolean(footerHeight) &&
        <tfoot className={classes.Tfoot}>
            <Tr cls={classes.Tfoot}>
                <LeftMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterLeft}`} opts={{type: 'footer'}}/>
                {headers.map((header, headerIndex) => (
                    <Th
                        wrapperStyle={header.isVisible ? {width: `${header.width}px`} : {}}
                        key={`foot${headerIndex}`}
                        cls={`TableFooter ${classes.TfootTh} ${activeColumn === header.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                        header={header}
                        headerIndex={headerIndex}
                        pos="footer"
                    >{getColumnContent({header, headerIndex})}</Th>
                ))}
                <RightMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterRight}`} opts={{type: 'footer'}}/>
            </Tr>
        </tfoot>
    );
};
