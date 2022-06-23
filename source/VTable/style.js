import { createUseStyles } from "react-jss";

export default createUseStyles({
    Wrapper : ({width, height}) => ({
        height,
        width,
        backgroundColor: 'white',
        overflow: 'hidden',
        position:'relative'
    }),
    LoaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }
});