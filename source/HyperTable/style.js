import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Wrapper : ({width, height}) => ({
        height,
        width,
        backgroundColor: 'white',
        overflow: 'hidden',
        position:'relative'
    }),
    Loading: ({width, height}) =>  ({
        position:'absolute',
        top: 0,
        left: 0,
        width: `${width}px`,
        height: `${height}px`,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity:0.7,
        backgroundColor: 'white',
        letterSpacing: 2,
        pointerEvents: 'none',
        zIndex:1000,
        textTransform:'uppercase'
    })
}));