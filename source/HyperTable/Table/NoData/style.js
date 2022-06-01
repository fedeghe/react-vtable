import { createUseStyles } from "react-jss";

export default createUseStyles({
    NoData: {
        position: 'sticky',
        left: 0,
        top: 0,
        width: ({ width}) => `${width}px`,
        height: ({ height}) => `${height - 10}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});