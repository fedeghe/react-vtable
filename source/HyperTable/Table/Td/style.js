import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Cell: {
        height: ({rowHeight}) => `${rowHeight}px`,
        overflow:'scroll'
    },
}))