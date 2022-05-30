import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    NoData: {
        position: 'sticky',
        left: 0,
        width: ({ width}) => `${width}px`,
        textAlign: 'center',
        margin: '30px 0'
    }
}));