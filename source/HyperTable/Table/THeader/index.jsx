import React, {useContext, useCallback} from 'react';
import TableContext from './../../Context';
import RightMost from '../RightMost';
import LeftMost from '../LeftMost';
import Tr from '../Tr';
import Th from '../Th';
import {isFunction, debounce} from './../../utils';
import useStyles from './style.js';
const Theader =  () => {
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
                // eslint-disable-next-line no-unused-vars
                filters,
                // eslint-disable-next-line no-unused-vars
                sorting:{column: sortingColumn, direction: sortingDirection},
                debounceTimes: {
                    
                    filtering : filteringDebounceTime,
                } 
            },
            dispatch
        } = useContext(TableContext),


        classes = useStyles({headerHeight}),

        getColumnContent = useCallback(({column, columnIndex}) => {
            let content = column.key;
            if ('header' in column) {
                
                
                if (isFunction(column.header)) {
                    const headerProps = {
                        column,
                        columnIndex,
                    };
                    if (isFunction(column.sort)) {
                        headerProps.sort = {
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
                            unsort: () => dispatch({type:'unsort'}),
                            direction: sortingDirection,
                            isSorting: column.key === sortingColumn,
                        };
                    }
                    if (isFunction(column.filter)) {
                        const theFilter = filters[column.key];

                        headerProps.filter = {
                            value: theFilter.value,
                            setValue: debounce(value => dispatch({
                                type: 'filter',
                                payload: {
                                    column: column.key,
                                    value
                                }
                            }), filteringDebounceTime),
                            visibility: theFilter.visibility,
                            setVisibility: visibility => 
                                dispatch({
                                    type: 'filter',
                                    payload: {
                                        column: column.key,
                                        visibility
                                    }
                                })
                        };
                    }
                    content = column.header(headerProps);
                } else {
                    content  = column.header;
                }
            }
            return content;
        }, [sortingDirection, sortingColumn, dispatch, filters, filteringDebounceTime]);
        
    return (Boolean(headerHeight) &&
        <thead className={classes.Thead}>
            <Tr>
                <LeftMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderLeft}`} opts={{isHeader:true}}/>
                {columns.map((column, columnIndex) => {
                    
                    const content = getColumnContent({column, columnIndex});
                    return <Th
                        style={{width: `${column.width}px`}}
                        key={`head${columnIndex}`}
                        cls={`TableHeader ${classes.TheadTh} ${activeColumn === column.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                        content={content}
                        column={column}
                        columnIndex={columnIndex}
                        pos="header"
                    />;
                })}
                <RightMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderRight}`} opts={{isHeader:true}}/>
            </Tr>
        </thead>
    );
};
export default Theader;