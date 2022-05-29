import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({

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

    
    TbodyThLeftMost: {
        // position: '-webkit-sticky',
        position: 'sticky',
        left: 0,
        backgroundColor: 'white'
    },
    TbodyThRightMost: {
        // position: '-webkit-sticky',
        position: 'sticky',
        right: 0,
        backgroundColor: 'white'
    },
}));