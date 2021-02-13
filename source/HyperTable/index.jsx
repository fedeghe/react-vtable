import React from 'react'

import './style.less'

const HyperTable = ({
    columns,
    data,
    caption,
    height, width,
    rowVerticalalign,
    footers,
    rowClick = () => {},
    rowEnter = () => {},
    rowLeave = () => {},
    cellClick = () => {},
    cellEnter = () => {},
    cellLeave = () => {},
}) => {
    return <div className="TableWrapper">
        <table style={{width: width}} className="Table" border="0" cellSpacing="0">
        {caption && <caption style={{'captionSide': caption.side || 'top', 'textAlign': caption.align || 'center'}}>{caption.text}</caption>}
            <thead className="TableHeader">
                <tr>{
                    columns.map((col, k) => (<th key={`h${k}`} className="TableHeaderCell">{col.key}</th>))
                }</tr>
            </thead>
            
            <tbody style={{maxHeight: height}}>
                {data.map((row, i) => (
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
                                }}
                                onMouseEnter={e => {
                                    cellEnter.call(e, e, row)
                                }}
                                onMouseLeave={e => {
                                    cellLeave.call(e, e, row)
                                }}
                            >{
                                'component' in col
                                ? col.component(row)
                                : row[col.key] || 'none'
                            }</td>
                        ))
                    }</tr>
                ))}
            </tbody>

            {footers && <tfoot className="TableFooter">
                <tr>{
                    footers.map((footer, k) => (<th key={`h${k}`} className="TableFooterCell">{footer.key}</th>))
                }</tr>
            </tfoot>}
        </table>
    </div>
        
}

export default HyperTable