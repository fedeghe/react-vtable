import React, {useContext, useCallback} from 'react';
import TableContext from './../../Context';
import RightMost from '../RightMost';
import LeftMost from '../LeftMost';
import Tr from '../Tr';
import Th from '../Th';
import {isFunction, debounce} from './../../utils';
import useStyles from './style.js';
const THeadFoot =  ({pos}) => {
    const {
            state: {
                header: {
                    height: headerHeight
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
                // eslint-disable-next-line no-unused-vars
                filters,
                // eslint-disable-next-line no-unused-vars
                sorting:{column: sortingColumn, direction: sortingDirection},
                debounceTimes: {
                    filtering : filteringDebounceTime,
                } ,
                activeFiltersCount,
                isSorting
            },
            dispatch
        } = useContext(TableContext),


        classes = useStyles({headerHeight, footerHeight}),


        getColumnContent = useCallback(({column, columnIndex}) => {
            let content = column.key;
            const hfProps = {
                column,
                columnIndex,
            };


            if ('header' in column || 'footer' in column) {
                
                if (isFunction(column.sort)) {
                    hfProps.sort = {
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
                        isSorting
                    };
                }
                if (isFunction(column.filter)) {
                    const theFilter = filters?.[column.key];

                    hfProps.filter = {
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
                        unFilter: dispatch({type: 'unFilter'}),
                        activeFiltersCount
                    };
                }
                switch(pos) {
                    case 'header': 
                        if (isFunction(column.header)) {       
                            content = column.header(hfProps);
                        } else {
                            content  = column.header;
                        }
                        break;
                    case 'footer': 
                        if (isFunction(column.footer)) {       
                            content = column.footer(hfProps);
                        } else {
                            content  = column.footer;
                        }
                        break;
                }
            }
            return content;
        }, [
            pos, sortingDirection, sortingColumn,
            dispatch, filters, filteringDebounceTime,
            activeFiltersCount, isSorting
        ]);

    return {
        header: (Boolean(headerHeight) &&
            <thead className={classes.Thead}>
                <Tr>
                    <LeftMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigLeft}`} opts={{isHeader:true}}/>
                    {columns.map((column, columnIndex) => {
                        
                        const content = getColumnContent({column, columnIndex});
                        return <Th
                            style={{width: `${column.width}px`}}
                            key={`${pos}${columnIndex}`}
                            cls={`TableHeader ${classes.TheadTh} ${activeColumn === column.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                            content={content}
                            column={column}
                            columnIndex={columnIndex}
                            pos={pos}
                        />;
                    })}
                    <RightMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigRight}`} opts={{isHeader:true}}/>
                </Tr>
            </thead>
        ),
        footer: (Boolean(footerHeight) &&
            <thead className={classes.Tfoot}>
                <Tr>
                    <LeftMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigLeft}`} opts={{isFooter:true}}/>
                    {columns.map((column, columnIndex) => {
                        
                        const content = getColumnContent({column, columnIndex});
                        return <Th
                            style={{width: `${column.width}px`}}
                            key={`${pos}${columnIndex}`}
                            cls={`TableFooter ${classes.TfootTh} ${activeColumn === column.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                            content={content}
                            column={column}
                            columnIndex={columnIndex}
                            pos={pos}
                        />;
                    })}
                    <RightMost cls={`${classes.TfootTh} ${classes.TorigFooter} ${classes.TorigRight}`} opts={{isFooter:true}}/>
                </Tr>
            </thead>
        )
    }[pos];
};
export default THeadFoot;