import { createUseStyles } from "react-jss";

export default createUseStyles({
    Cell: {
        height: ({rowHeight}) => `${rowHeight}px`,
        overflow:'scroll',
    },
    Td: {
        border: '1px solid black',
        borderCollapse: 'collapse'
    }
});