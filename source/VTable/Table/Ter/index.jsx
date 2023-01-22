import React, {useContext, useCallback} from 'react';
import TableContext from '../../Context';
import ACTION_TYPES from '../../reducer/actions';
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

        headerSortDir = useCallback(({header, direction}) => 
            () => dispatch({
                type: ACTION_TYPES.SORT,
                payload: {
                    header: header.key,
                    direction,
                    sorter: header.sort
                }
            }),
            [dispatch]
        ),
        unSort = useCallback(() => dispatch({type: ACTION_TYPES.UNSORT}), [dispatch]),
        setFilterValue = useCallback(({header }) => debounce(value => dispatch({
            type: ACTION_TYPES.FILTER,
            payload: {
                header: header.key,
                value
            }
        }), filteringDebounceTime), [dispatch, filteringDebounceTime]),
        setFilterVisibility = useCallback(({header}) => visibility => 
            dispatch({
                type: ACTION_TYPES.FILTER,
                payload: {
                    header: header.key,
                    visibility
                }
            }), [dispatch]),
        unFilter = useCallback(() => debounce(() => dispatch({type: ACTION_TYPES.UNFILTER}), filteringDebounceTime), [dispatch, filteringDebounceTime]),
        setVisibilistVisibility = useCallback(({header}) => visibility => dispatch({
            type: ACTION_TYPES.TOGGLE_COLUMN_VISIBILITY,
            payload: {
                key: header.key,
                isVisible: visibility
            }
        }), [dispatch]),

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
                            sortAsc: headerSortDir({header, direction: 'asc'}),
                            sortDesc: headerSortDir({header, direction: 'desc'}),
                            unSort,
                            direction: sortingDirection,
                            isSorting: header.key === sortingColumn,
                        };
                    }
                    if (isFunction(header.filter)) {
                        const theFilter = filters?.[header.key];

                        props.filter = {
                            value: theFilter?.value,
                            setValue: setFilterValue({header}),
                            visibility: theFilter?.visibility,
                            setVisibility: setFilterVisibility({header}),
                            unFilter: unFilter(),
                            activeFiltersCount,
                            isFiltering
                        };
                    }
                    if (isFunction(header.visibilist)){
                        props.visibility = {
                            setVisibility: setVisibilistVisibility({header}),
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
            typehf,
            headerSortDir, unSort, sortingDirection, sortingColumn,
            filters, setFilterValue, setFilterVisibility, unFilter,
            activeFiltersCount, isFiltering, setVisibilistVisibility
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
