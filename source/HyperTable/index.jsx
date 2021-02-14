import React, {useState, useReducer} from 'react'

import './style.less'

const HyperTable = ({
    columns,
    data,
    caption,
    height, width,
    rowVerticalalign,
    columnClick = () => {},
    columnEnter = () => {},
    columnLeave = () => {},
    rowClick = () => {},
    rowEnter = () => {},
    rowLeave = () => {},
    cellClick = () => {},
    cellEnter = () => {},
    cellLeave = () => {},
}) => {
    const reducer = (oldState, action) =>{
        const { payload, type } = action
        switch (type) {
          case 'sortBy':
            const r = [...oldState].sort(payload.sort)
            return r
          default:
            return oldState
        }
      }
    const [state, dispatch] = useReducer(reducer, data)

    return <div className="TableWrapper">
        <table style={{width: width}} className="Table" border="0" cellSpacing="0" >
            {
            caption && <caption
                style={{'captionSide': caption.side || 'top', 'textAlign': caption.align || 'center'}}
                className="TableCaption"
            >{caption.text}</caption>
            }
            <thead className="TableHeader ">
                <tr>{
                    columns.map((col, k) => (
                        <th key={`h${k}`}
                            className="TableHeaderCell tableheadercell"
                        >{
                            'headerComponent' in col
                            ? col.headerComponent(col, 'key')
                            : col.headerLabel || col.key
                        }{
                            col.sorting && (
                                <div className="tableheadercellfilter">
                                    <div  onClick={() => 
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
                        }</th>
                    ))
                }</tr>
            </thead>
            
            <tbody className="TableBody" style={{maxHeight: height}}>
                {state.map((row, i) => (
                    <tr key={`r${i}`}
                        className="TableRow"
                        style={{verticalAlign: rowVerticalalign || 'top'}}
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