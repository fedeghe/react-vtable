import React, {useContext, useCallback} from 'react';
import TableContext from './../../Context';
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
                header: {
                    height: headerHeight
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

        classes = useStyles({headerHeight}),

        getColumnContent = useCallback(({header, headerIndex}) => {
            let content;
            if ('header' in header) {
                if (isFunction(header.header)) {
                    const headerProps = {
                        header,
                        headerIndex,
                    };
                    if (isFunction(header.sort)) {
                        headerProps.sort = {
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
                        headerProps.filter = {
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
                        headerProps.visibility = {
                            setVisibility: visibility => dispatch({
                                type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY,
                                payload: {
                                    key: header.key,
                                    isVisible: visibility
                                }
                            }),
                            isVisible: header.isVisible,
                            header
                        };
                    }
                    content = header.header(headerProps);
                } else {
                    content = header.header;
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
        
    return (Boolean(headerHeight) &&
        <thead className={classes.Thead}>
            <Tr cls={classes.Thead}>
                <LeftMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderLeft}`} opts={{type:'header'}}/>
                {headers.map((header, headerIndex) => (
                    <Th
                        wrapperStyle={header.isVisible ? {width: `${header.width}px`} : {}}
                        key={`head${headerIndex}`}
                        cls={`TableHeader ${classes.TheadTh} ${activeColumn === header.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                        header={header}
                        headerIndex={headerIndex}
                        pos="header"
                    >{getColumnContent({header, headerIndex})}</Th>
                ))}
                <RightMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderRight}`} opts={{type: 'header'}}/>
            </Tr>
        </thead>
    );
};
