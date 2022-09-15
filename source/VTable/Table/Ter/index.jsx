import React, {useContext, useCallback} from 'react';
import TableContext from '../../Context';
import { ACTION_TYPES } from '../../reducer';
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

        classes = useStyles({type: typehf, height : isHeader ? headerHeight : footerHeight}),

        getColumnContent = useCallback(({header, headerIndex}) => {
            let content;
            if (typehf in header) {
                
                if (isFunction(header[typehf])) {
                    const props = {
                        header,
                        headerIndex,
                    };
                    if (isFunction(header.sort)) {
                        props.sort = {
                            sortAsc: () => dispatch({
                                type:ACTION_TYPES.SORT,
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

                        props.filter = {
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
                        props.visibility = {
                            setVisibility:  visibility => dispatch({
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
                    content = header[typehf](props);

                } else {
                    content = header.isVisible ? header[typehf] : '';
                }
                
            } else {
                content = header.isVisible ? header.key : '';
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
                {headers.map((header, headerIndex) => (
                    <Th
                        wrapperStyle={header.isVisible ? {width: `${header.width}px`} : {}}
                        key={`${typehf}${headerIndex}`}
                        cls={`${thTableClass} ${classes.T_Th} ${activeColumn === header.key ? (crossHighlightClass || columnHighlightClass) : ''}`}
                        header={header}
                        headerIndex={headerIndex}
                        pos={typehf}
                    >{getColumnContent({header, headerIndex})}</Th>
                ))}
                <RightMost cls={`${classes.T_Th} ${classes.Torig_} ${classes.Torig_Right}`} opts={{type: typehf}}/>
            </Tr>
        </TerTag>
    );
};
