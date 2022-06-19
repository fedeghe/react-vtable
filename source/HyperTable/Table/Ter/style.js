import { createUseStyles } from "react-jss";

export default createUseStyles({
    Ter: {
        height: ({height}) => `${height}px`
    },
    Torig_: {
        top: ({type}) => type === 'header' ? 0 : 'initial',
        bottom: ({type}) => type === 'footer' ? 0 : 'initial',
        zIndex:100,
        textAlign:'center !important',
    },
    Torig_Left: {left:0,},
    Torig_Right: {right:0,},
    T_Th: {
        position: 'sticky',
        textAlign: 'left',
        verticalAlign: 'middle',

        top: ({type}) => type === 'header' ? 0 : 'initial',
        bottom: ({type}) => type === 'footer' ? 0 : 'initial',
        '&:lastChild': {
            left: ({type}) => type === 'header' ? 0 : 'initial',
            right: ({type}) => type === 'footer' ? 0 : 'initial',
            zIndex: 1
        },
        backgroundColor: 'white'
    },
});