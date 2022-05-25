import React, {useContext, useCallback} from 'react';
import TableContext from './../../Context';
import RightMost from '../RightMost';
import LeftMost from '../LeftMost';
import Tr from '../Tr';
import Th from '../Th';
import {isFunction} from './../../utils'
import useStyles from './style.js';
const Theader =  () => {
    const {
            state: {
                headerHeight,
                columns,
                activeColumn,
                crossHighlight,
                columnHighlight,
                filters,
                sorting:{column: sortingColumn, direction: sortingDirection}
            },
            dispatch
        } = useContext(TableContext),
        classes = useStyles({headerHeight});

    const getColumnContent = useCallback(({column, columnIndex}) => {
        let content = column.key;
        if ('header' in column) {

            content = isFunction(column.header)
                ? column.header({
                    column,
                    columnIndex,
                    sort : isFunction(column.sort) ? {
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
                        direction: sortingDirection
                    } : null,
                    filter: isFunction(column.filter) ? {
                        value: null,
                        setValue: () => {/* */},
                        visibility: false,
                        setVisibility: () => {/* */}
                    } : null
                })
                : column.header
        }
        return content
    }, [dispatch, sortingDirection])

    return (Boolean(headerHeight) &&
        <thead className={classes.Thead}>
            <Tr>
                <LeftMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderLeft}`} opts={{isHeader:true}}/>
                {columns.map((column, columnIndex) => {
                    
                    const content = getColumnContent({column, columnIndex})
                    return <Th
                        key={`head${columnIndex}`}
                        cls={`TableHeader ${classes.TheadTh} ${activeColumn === column.key ? (crossHighlight || columnHighlight) : ''}`}
                        content={content}
                        column={column}
                        columnIndex={columnIndex}
                        pos="header"
                    />
                })}
                <RightMost cls={`${classes.TheadTh} ${classes.TorigHeader} ${classes.TorigHeaderRight}`} opts={{isHeader:true}}/>
            </Tr>
        </thead>
    );
}
export default Theader