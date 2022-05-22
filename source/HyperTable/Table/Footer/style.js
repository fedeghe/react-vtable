import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Tfoot: ({footerHeight}) => ({
        height: `${footerHeight}px`
    }),
    TorigBL: {
        left:0,
        bottom:0,
        zIndex:1000,
        textAlign:'center !important',
    },
    TorigBR: {
        right:0,
        bottom:0,
        zIndex:1000,
        textAlign:'center !important'
    },
    TfootTh: {
        position: '-webkit-sticky',
        position: 'sticky',
        textAlign: 'left',
        verticalAlign: 'middle',
        bottom: 0,
        '&:lastChild': {
            right: 0,
            zIndex: 1
        },
        backgroundColor: 'white'
    },



   
    TableCrossHighlight: {
        backgroundColor: '#f5f5f5'
    },
    TableRowHighlight: {
        backgroundColor: '#ddd'
    },
    TableColumnHighlight: {
        backgroundColor: '#dd6'
    },
    TableCellHighlight: {
        backgroundColor: '#f66'
    },
}))