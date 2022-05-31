import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Wrapper : ({width, height}) => ({
        height,
        width,
        backgroundColor: 'white',
        overflow: 'hidden',
        position:'relative'
    }),
}));