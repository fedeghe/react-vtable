import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Thead: ({headerHeight}) => ({
        height: `${headerHeight}px`
    }),    
    TorigHeaderLeft: {
        left:0,
        top:0,
        zIndex:1000,
        textAlign:'center !important'
    },
    TorigHeaderRight: {
        right:0,
        top:0,
        zIndex:1000,
        textAlign:'center !important'
    },
    TheadTh: {
        position: '-webkit-sticky',
        position: 'sticky',
        textAlign: 'left',
        verticalAlign: 'middle',
        top: 0,
        '&:firstChild': {
            left: 0,
            zIndex: 1
        },
        backgroundColor: 'white'
    },
}));