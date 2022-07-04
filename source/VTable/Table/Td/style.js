import { createUseStyles } from "react-jss";

export default createUseStyles({
    Cell: {
        height: ({rowHeight}) => `${rowHeight}px`,
        overflow:'scroll',
    },
    Td: {
        borderCollapse: 'collapse',
        padding:'0px'
    }
});