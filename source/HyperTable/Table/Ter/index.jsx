import React, {useContext, useCallback} from 'react';
import TableContext from '../../Context';
import RightMost from '../RightMost';
import LeftMost from '../LeftMost';
import Tr from '../Tr';
import Th from '../Th';
import {isFunction, debounce} from './../../utils';
import useStyles from './style.js';
export default ({typehf}) => {
    const isHeader = typehf === 'header',
        {
            state: {
                header: {
                    height: headerHeight,
                },
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

        classes = useStyles({type: typehf, height : isHeader ? headerHeight : footerHeight}),

        getColumnContent = useCallback(({column, columnIndex}) => {
            let content;
            if (typehf in column) {
                
                if (isFunction(column[typehf])) {
                    const props = {
                        column,
                        columnIndex,
                    };
                    if (isFunction(column.sort)) {
                        props.sort = {
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

                        props.filter = {
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
                        props.visibility = {
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
                    content = column[typehf](props);

                } else {
                    content = column.isVisible ? column[typehf] : '';
                }
                
            } else {
                content = column.isVisible ? column.key : '';
            }
            return content;
        }, [
            sortingDirection, sortingColumn, dispatch,
            filters, filteringDebounceTime,
            activeFiltersCount, isFiltering, typehf
        ]),
        height = isHeader ? headerHeight : footerHeight,
        TerTag = ({children, ...props}) => isHeader
            ? <thead {...props}>{children}</thead>
            : <tfoot {...props}>{children}</tfoot>,
        thTableClass = isHeader ? 'TableHeader' : 'TableFooter';

    return (
        Boolean(height) &&
        <TerTag className={classes.Ter}>
            <Tr cls={classes.Ter}>
                <LeftMost cls={`${classes.T_Th} ${classes.Torig_} ${classes.Torig_Left}`} opts={{type: typehf}}/>
                {columns.map((column, columnIndex) => (
                    <Th
                        style={column.isVisible ? {width: `${column.width}px`} : {}}
                        key={`${typehf}${columnIndex}`}
                        cls={`${thTableClass} ${classes.T_Th} ${activeColumn === column.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                        column={column}
                        columnIndex={columnIndex}
                        pos={typehf}
                    >{getColumnContent({column, columnIndex})}</Th>
                ))}
                <RightMost cls={`${classes.T_Th} ${classes.Torig_} ${classes.Torig_Right}`} opts={{type: typehf}}/>
            </Tr>
        </TerTag>
    );
};
