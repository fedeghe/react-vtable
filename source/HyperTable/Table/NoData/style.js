import { createUseStyles } from "react-jss";

export default createUseStyles({
    NoData: {
        position: 'sticky',
        left: 0,
        top: 0,
        width: ({ width}) => `${width}px`,
        height: ({ height}) => `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Td: {padding: '0px'},
});