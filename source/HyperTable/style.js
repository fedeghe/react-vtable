import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    PreTable: ({preTableHeight}) => ({
        height: preTableHeight
    }),
    PostTable : ({postTableHeight}) => ({
        height: postTableHeight
    }),
    Wrapper : ({width}) => ({
        maxWidth: width,
        width,
        backgroundColor: 'white'
    }),
    TableContainer: ({ height, width, postTableHeight, preTableHeight}) =>({
        maxWidth: width,
        width: width,
        maxHeight: `calc(${height} - ${postTableHeight} - ${preTableHeight})`,
        overflow: 'scroll',
        position: 'relative',
        padding: 0
    }),
    Table: {
        position: 'relative',
        borderCollapse: 'collapse'
    },
    Td: {verticalAlign: 'top'},
    Th: {verticalAlign: 'top'},
    Thead: ({headerHeight}) => ({
        height: headerHeight
    }),
    Tfoot: ({headerHeight}) => ({
        height: headerHeight
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
        textAlign:'center !important'
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
        verticalAlign: 'middle',
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
    }
}))