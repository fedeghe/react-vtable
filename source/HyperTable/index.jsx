import React from 'react'

import './style.less'

const HyperTable = ({columns, data, caption, height, width, rowVerticalalign, footers}) => {
    return <div className="TableWrapper">
        <table style={{width: width}} className="Table" border="0" cellSpacing="0">
        {caption && <caption style={{'captionSide': caption.side || 'top', 'textAlign': caption.align || 'center'}}>{caption.text}</caption>}
            <thead className="TableHeader">
                <tr>{
                    columns.map((col, k) => (<th key={`h${k}`} className="TableHeaderCell">{col.key}</th>))
                }</tr>
            </thead>
            
            <tbody style={{maxHeight: height}}>
                {data.map((row, i) => (<tr key={`r${i}`} className="TableRow" style={{verticalAlign: rowVerticalalign || 'top'}}>{
                    columns.map((col, j) =>(
                        <td key={`r${i}c${j}`} className="TableCell">{row[col.key] || 'none'}</td>
                    ))
                }</tr>))}
                
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