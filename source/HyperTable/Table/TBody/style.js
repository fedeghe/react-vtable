import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Td: {
        verticalAlign: 'top',
    },
    Cell: {
        height: ({rowHeight}) => `${rowHeight}px`,
        overflow:'scroll'
    },
    Th: {verticalAlign: 'top'},

    
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
}))