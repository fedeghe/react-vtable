import React, {useContext, useCallback} from 'react';
import TableContext from '../../Context';
import RightMost from '../RightMost';
import LeftMost from '../LeftMost';
import Tr from '../Tr';
import Th from '../Th';
import {isFunction, debounce} from './../../utils';
import useStyles from './style.js';
const TFooter = () => {
    const {
            state: {
                footer: {
                    height: footerHeight,
                },
                columns,
                activeColumn,
                cls: { 
                    highlight: {
                        crossHighlightClass,
                        columnHighlightClass,
                    },
                },
                // eslint-disable-next-line no-unused-vars
                filters,
                // eslint-disable-next-line no-unused-vars
                sorting:{column: sortingColumn, direction: sortingDirection},
                debounceTimes: {
                    
                    filtering : filteringDebounceTime,
                } ,
                activeFiltersCount,
                isFiltering
            },
            dispatch
        } = useContext(TableContext),

        classes = useStyles({footerHeight}),

        getColumnContent = useCallback(({column, columnIndex}) => {
            let content;
            if ('footer' in column) {
                
                
                if (isFunction(column.footer)) {
                    const footerProps = {
                        column,
                        columnIndex,
                    };
                    if (isFunction(column.sort)) {
                        footerProps.sort = {
                            sortAsc: () => dispatch({
                                type:'sort',
                                payload: {
                                    column: column.key,
                                    direction: 'asc',
                                    sorter: column.sort
                                }
                            }),
                            sortDesc: () => dispatch({
                                type:'sort',
                                payload: {
                                    column: column.key,
                                    direction: 'desc',
                                    sorter: column.sort
                                }
                            }),
                            unSort: () => dispatch({type:'unSort'}),
                            direction: sortingDirection,
                            isSorting: column.key === sortingColumn,
                        };
                    }
                    if (isFunction(column.filter)) {
                        const theFilter = filters?.[column.key];

                        footerProps.filter = {
                            value: theFilter?.value,
                            setValue: debounce(value => dispatch({
                                type: 'filter',
                                payload: {
                                    column: column.key,
                                    value
                                }
                            }), filteringDebounceTime),
                            visibility: theFilter?.visibility,
                            setVisibility: visibility => 
                                dispatch({
                                    type: 'filter',
                                    payload: {
                                        column: column.key,
                                        visibility
                                    }
                                }),
                            unFilter: debounce(() => dispatch({type: 'unFilter'}), filteringDebounceTime),
                            activeFiltersCount,
                            isFiltering
                        };
                    }
                    if (isFunction(column.visibilist)){
                        footerProps.visibility = {
                            setVisibility:  visibility => dispatch({
                                type: 'toggleColumnVisibility',
                                payload: {
                                    key: column.key,
                                    isVisible: visibility
                                }
                            }),
                            isVisible: column.isVisible,
                            column,
                        };
                    }
                    content = column.footer(footerProps);

                } else {
                    content = column.isVisible ? column.footer : '';
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
        

    return (
        Boolean(footerHeight) &&
        <tfoot className={classes.Tfoot}>
            <Tr cls={classes.Tfoot}>
                <LeftMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterLeft}`} opts={{type: 'footer'}}/>
                {columns.map((column, columnIndex) => (
                    <Th
                        style={column.isVisible ? {width: `${column.width}px`} : {}}
                        key={`foot${columnIndex}`}
                        cls={`TableFooter ${classes.TfootTh} ${activeColumn === column.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                        column={column}
                        columnIndex={columnIndex}
                        pos="footer"
                    >{getColumnContent({column, columnIndex})}</Th>
                ))}
                <RightMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigFooterRight}`} opts={{type: 'footer'}}/>
            </Tr>
        </tfoot>
    );
};
export default TFooter;