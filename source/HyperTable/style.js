import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({

    Wrapper : ({width, height}) => ({
        height,
        width,
        backgroundColor: 'white',
        overflow: 'hidden'
    }),
    TableContainer: ({ height, width, postFooterHeight, preHeaderHeight}) => ({
        maxWidth: `${width}px`,
        width: `${width}px`,
        height: `${height - postFooterHeight - preHeaderHeight}px`,
        overflow: 'scroll',
        scrollBehavior: 'smooth',
        position: 'relative',
        padding: 0
    }),
    Table: {
        position: 'relative',
        borderCollapse: 'collapse'
    },
    Td: {
        verticalAlign: 'top',
    },
    Cell: {
        height: ({rowHeight}) => `${rowHeight}px`,
        overflow:'scroll'
    },
    Th: {verticalAlign: 'top'},
    Thead: ({headerHeight}) => ({
        height: `${headerHeight}px`
    }),
    Tfoot: ({footerHeight}) => ({
        height: `${footerHeight}px`
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
    PostFooter: ({postFooterHeight}) =>({
        maxHeight: `${postFooterHeight}px`,
        height: `${postFooterHeight}px`,
        overflow: 'hidden'
    }),
    PreHeader: ({preHeaderHeight}) =>({
        maxHeight: `${preHeaderHeight}px`,
        height: `${preHeaderHeight}px`,
        overflow: 'hidden'
    }),

    
    TbodyThLeftMost: {
        position: '-webkit-sticky',
        position: 'sticky',
        left: 0,
        backgroundColor: 'white'
    },
    TbodyThRightMost: {
        position: '-webkit-sticky',
        position: 'sticky',
        right: 0,
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
    NoData: {
        display: 'flex',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
}

))