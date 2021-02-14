import React, { useState, useReducer } from 'react'

import './style.less'

const HyperTable = ({
    columns,
    data,
    captionTop,
    captionBottom,
    height, width,
    rowVerticalalign,
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
    const reducer = (oldState, action) => {
        const { payload, type } = action
        switch (type) {
            case 'sortBy':
                return [...oldState].sort(payload.sort);
            case 'filter': 
                return [...data].filter(
                    row => `${row[payload.field]}`.includes(`${payload.value}`)
                );
            default:
                return oldState
        }
    }
    const [state, dispatch] = useReducer(reducer, data)

    return <div className="TableWrapper">
        <table style={{ width: width }} className="Table" border="0" cellSpacing="0" >
            {captionTop && (
                <caption
                    style={{ 'captionSide': 'top', 'textAlign': captionTop.align || 'center' }}
                    className={`TableCaption ${captionTop.className}`}
                >{'component' in captionTop ? captionTop.component() : captionTop.text}</caption>
            )}
            {captionBottom && (
                <caption
                    style={{ 'captionSide': 'bottom', 'textAlign': captionBottom.align || 'center' }}
                    className={`TableCaption ${captionBottom.className}`}
                >{'component' in captionBottom ? captionBottom.component() : captionBottom.text}</caption>
            )}
            <thead className="TableHeader ">
                <tr>{
                    columns.map((col, k) => (
                        <th key={`h${k}`}
                            className="TableHeaderCell tableheadercell"
                            style={col.width && { width: col.width }}
                        >
                            <div className="tableheaderwrapper">
                                <div>{
                                    'headerComponent' in col
                                        ? col.headerComponent(col, 'key')
                                        : col.headerLabel || col.key
                                }</div>{
                                    col.filter && col.filter(col, value => dispatch({
                                        type: 'filter',
                                        payload: {
                                            field: col.key,
                                            value
                                        }
                                    }))
                                }
                                {
                                    col.sorting && (
                                        <div className="tableheadercellfilter">
                                            <div onClick={() =>
                                                dispatch({
                                                    type: 'sortBy',
                                                    payload: {
                                                        sort: col.sorting.sort(1),
                                                    }
                                                })
                                            }>▲</div>
                                            <div onClick={() =>
                                                dispatch({
                                                    type: 'sortBy',
                                                    payload: {
                                                        sort: col.sorting.sort(-1),
                                                    }
                                                })
                                            }>▼</div>
                                        </div>
                                    )
                                }
                            </div>
                            
                        </th>
                    ))
                }</tr>
            </thead>

            <tbody className="TableBody" style={{ maxHeight: height }}>
                {state.map((row, i) => (
                    <tr key={`r${i}`}
                        className="TableRow"
                        style={{ verticalAlign: rowVerticalalign || 'top' }}
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
                                    className="TableCell"
                                    style={col.width && { width: col.width }}
                                    onClick={e => {
                                        col.onClick && col.onClick.call(e, e, col, row)
                                        cellClick.call(e, e, col, row)
                                        columnClick.call(e, e, col, row)
                                    }}
                                    onMouseEnter={e => {
                                        cellEnter.call(e, e, row)
                                        columnEnter.call(e, e, col)
                                    }}
                                    onMouseLeave={e => {
                                        cellLeave.call(e, e, row)
                                        columnLeave.call(e, e, col)
                                    }}
                                >{
                                        'component' in col
                                            // ? col.component(row, col.key)
                                            ? col.component(row, col.key)
                                            : row[col.key] || 'none'
                                    }</td>
                            ))
                        }</tr>
                ))}
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