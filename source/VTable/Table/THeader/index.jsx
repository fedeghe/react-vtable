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
                columns,
                activeColumn,
                cls: { 
                    highlight: {
                        crossHighlightClass,
                        columnHighlightClass,
                    },
                },
                filters,
                sorting:{column: sortingColumn, direction: sortingDirection},
                debounceTimes: {
                    filtering : filteringDebounceTime,
                } ,
                activeFiltersCount,
                isFiltering
            },
            dispatch
        } = useContext(TableContext),

        classes = useStyles({headerHeight}),

        getColumnContent = useCallback(({column, columnIndex}) => {
            let content;
            if ('header' in column) {
                if (isFunction(column.header)) {
                    const headerProps = {
                        column,
                        columnIndex,
                    };
                    if (isFunction(column.sort)) {
                        headerProps.sort = {
                            sortAsc: () => dispatch({
                                type: ACTION_TYPES.SORT,
                                payload: {
                                    column: column.key,
                                    direction: 'asc',
                                    sorter: column.sort
                                }
                            }),
                            sortDesc: () => dispatch({
                                type: ACTION_TYPES.SORT,
                                payload: {
                                    column: column.key,
                                    direction: 'desc',
                                    sorter: column.sort
                                }
                            }),
                            unSort: () => dispatch({type: ACTION_TYPES.UNSORT}),
                            direction: sortingDirection,
                            isSorting: column.key === sortingColumn,
                        };
                    }
                    if (isFunction(column.filter)) {
                        const theFilter = filters?.[column.key];
                        headerProps.filter = {
                            value: theFilter?.value,
                            setValue: debounce(value => dispatch({
                                type: ACTION_TYPES.FILTER,
                                payload: {
                                    column: column.key,
                                    value
                                }
                            }), filteringDebounceTime),
                            visibility: theFilter?.visibility,
                            setVisibility: visibility => 
                                dispatch({
                                    type: ACTION_TYPES.FILTER,
                                    payload: {
                                        column: column.key,
                                        visibility
                                    }
                                }),
                            unFilter: debounce(() => dispatch({type: ACTION_TYPES.UNFILTER}), filteringDebounceTime),
                            activeFiltersCount,
                            isFiltering
                        };
                    }
                    if (isFunction(column.visibilist)){
                        headerProps.visibility = {
                            setVisibility: visibility => dispatch({
                                type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY,
                                payload: {
                                    key: column.key,
                                    isVisible: visibility
                                }
                            }),
                            isVisible: column.isVisible,
                            column
                        };
                    }
                    content = column.header(headerProps);
                } else {
                    content = column.header;
                }
            } else {
                content = column.isVisible ? column.key : '';
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
                {columns.map((column, columnIndex) => (
                    <Th
                        wrapperStyle={column.isVisible ? {width: `${column.width}px`} : {}}
                        key={`head${columnIndex}`}
                        cls={`TableHeader ${classes.TheadTh} ${activeColumn === column.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                        column={column}
                        columnIndex={columnIndex}
                        pos="header"
                    >{getColumnContent({column, columnIndex})}</Th>
                ))}
                <RightMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderRight}`} opts={{type: 'header'}}/>
            </Tr>
        </thead>
    );
};
