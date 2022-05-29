import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Cell: {
        height: ({rowHeight}) => `${rowHeight}px`,
        overflow:'scroll'
    },
    AlTop: {verticalAlign: 'top'},
    TbodyThMost: {
        // position: '-webkit-sticky',
        position: 'sticky',
        backgroundColor: 'white'
    },
    TbodyThLeftMost: {
        left: 0,
    },
    TbodyThRightMost: {
        right: 0,
    },
}));