import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Thead: ({headerHeight}) => ({
        height: `${headerHeight}px`
    }),    
    TorigTL: {
        left:0,
        top:0,
        zIndex:1000,
        textAlign:'center !important'
    },
    TorigTR: {
        right:0,
        top:0,
        zIndex:1000,
        textAlign:'center !important'
    },
    TheadTh: {
        position: '-webkit-sticky',
        position: 'sticky',
        textAlign: 'left',
        verticalAlign: 'top',
        top: 0,
        '&:firstChild': {
            left: 0,
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