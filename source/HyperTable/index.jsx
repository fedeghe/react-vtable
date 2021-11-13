import React, { useReducer, useEffect, useRef} from 'react'

import reducerFactory from './reducer'
import { replaceall } from './utils'

import './style.less'

const HyperTable = ({
    columns,
    data,
    captionTop,
    captionBottom,
    height, width,
    rowVerticalAlign,
    crossHighlight,
    columnHighlight,
    rowHighlight,
    cellHightlight,
    noFilterData,
    columnClick = () => { },
    columnEnter = () => { },
    columnLeave = () => { },
    rowClick = () => { },
    rowEnter = () => { },
    rowLeave = () => { },
    cellClick = () => { },
    cellEnter = () => { },
    cellLeave = () => { },
}) => {
    const { reducer, init } = reducerFactory()
    const [state, dispatch] = useReducer(reducer, init(data))
    const {total, rows, activeRow, activeCol, filters, sorting : {
        field: sortingField,
        versus: sortingVersus
    } = {}} = state
    const table = useRef(null);

    

    useEffect(() => {
        table.current.style.display = 'table';
        return () => {
            table.current.style.display = 'none'
        }
    }, [])

    return <div className="TableWrapper">
        <table ref={table} style={{ width: width }} className="Table" border="0" cellSpacing="0" >
            {captionTop && (
                <caption
                    style={{ 'captionSide': 'top'}}
                    className={`TableCaption ${captionTop.className}`}
                >{
                    'component' in captionTop
                    ? captionTop.component({
                        count: rows.length,
                        total, filters,sorting
                    })
                    : replaceall(captionTop.text, {COUNT: rows.length, TOTAL: total})
                }</caption>
            )}
            {captionBottom && (
                <caption
                    style={{ 'captionSide': 'bottom' }}
                    className={`TableCaption ${captionBottom.className}`}
                >{
                    'component' in captionBottom
                    ? captionBottom.component({
                        count: rows.length,
                        total, filters, sorting
                    })
                    : replaceall(captionBottom.text, {COUNT: rows.length, TOTAL: total})
                }</caption>
            )}
            <thead className="TableHeader ">
                <tr>{
                    columns.map((col, k) => (
                        <th key={`h${k}`}
                            className={`TableHeaderCell tablecell`}
                            style={col.width && { width: col.width }}
                        >
                            <div className="tableheaderwrapper">
                                <div>{
                                    'headerComponent' in col
                                        ? col.headerComponent(col, 'key')
                                        : col.headerLabel || col.key
                                }</div>
                                <div className="tableheaderoptions">{
                                    col.filter && col.filter(value => dispatch({
                                        type: 'filter',
                                        payload: {
                                            field: col.key,
                                            value
                                        }
                                    }))
                                }
                                {
                                    col.sorting && (
                                        <div className="tableheadercellsort">
                                            <div className={(sortingField === col.key && sortingVersus === 1) ? 'sortActive' : 'sortInactive'} onClick={() =>
                                                dispatch({
                                                    type: 'sortBy',
                                                    payload: {
                                                        sort: col.sorting.sort(1),
                                                        field: col.key,
                                                        versus: 1
                                                    }
                                                })
                                            }>▲</div>
                                            <div className={(sortingField === null) ? 'sortActive' : 'sortInactive'} onClick={() =>
                                                dispatch({
                                                    type: 'unsortBy',
                                                })
                                            }>&bull;</div>
                                            <div className={(sortingField === col.key && sortingVersus === -1) ? 'sortActive' : 'sortInactive'} onClick={() =>
                                                dispatch({
                                                    type: 'sortBy',
                                                    payload: {
                                                        sort: col.sorting.sort(-1),
                                                        field: col.key,
                                                        versus: -1
                                                    }
                                                })
                                            }>▼</div>
                                        </div>
                                    )
                                }</div>
                            </div>
                        </th>
                    ))
                }</tr>
            </thead>

            <tbody className="TableBody tablebody" style={{ maxHeight: height }}>  
                {rows.length ? rows.map((row, i) => (
                    <tr key={`r${i}`}
                        className={`TableRow ${activeRow === row._ID ? (crossHighlight || rowHighlight) : ''}`}
                        style={{ verticalAlign: rowVerticalAlign || 'top' }}
                        onClick={e => {
                            rowClick.call(e, e, row)
                        }}
                        onMouseEnter={e => {
                            rowEnter.call(e, e, row)
                        }}
                        onMouseLeave={e => {
                            rowLeave.call(e, e, row)
                        }}
                    >{
                            columns.map((col, j) => (
                                <td key={`r${i}c${j}`}
                                    align={col.align || 'left'}
                                    className={`tablecell TableCell ${activeCol === col.key ? (crossHighlight || columnHighlight) : ''} ${(cellHightlight && activeRow === row._ID && activeCol === col.key) ? cellHightlight : ''}`}
                                    style={col.width && { width: col.width }}
                                    onClick={e => {
                                        col.onClick && col.onClick.call(e, e, col, row);
                                        cellClick.call(e, e, col, row);
                                        columnClick.call(e, e, col, row);
                                    }}
                                    onMouseEnter={e => {
                                        dispatch({
                                            type: 'cellHover',
                                            payload: {
                                                row,
                                                col
                                            }
                                        });
                                        cellEnter.call(e, e, row);
                                        columnEnter.call(e, e, col);
                                    }}
                                    onMouseLeave={e => {
                                        dispatch({
                                            type: 'cellOut',
                                            payload: {
                                                row,
                                                col
                                            }
                                        });
                                        cellLeave.call(e, e, row);
                                        columnLeave.call(e, e, col);
                                    }}
                                >{
                                        'component' in col
                                            ? col.component(row, col.key)
                                            : row[col.key] || 'none'
                                }</td>
                            ))
                        }</tr>
                )) : <tr
                    className='TableRow'
                    style={{ verticalAlign: 'middle', textAlign:'center' }}
                ><td className='tablecell TableCell' span={columns.length}>{noFilterData}</td></tr>}
                
            </tbody>



            {columns.some(column => 'footerComponent' in column || 'footerLabel' in column) &&
                <tfoot className="TableFooter">
                    <tr>{
                        columns.map((col, k) => (
                            <th key={`h${k}`}
                                className="TableFooterCell"
                                style={col.width && { width: col.width }}
                            >{
                                    'footerComponent' in col
                                        ? col.footerComponent(col, 'key')
                                        : col.footerLabel
                                }</th>
                        ))
                    }</tr>
                </tfoot>
            }
        </table>
        { /* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>

}

export default HyperTable