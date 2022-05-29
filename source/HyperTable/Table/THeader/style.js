import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Thead: ({headerHeight}) => ({
        height: `${headerHeight}px`
    }),    
    TorigHeader: {
        top:0,
        zIndex:1000,
        textAlign:'center !important'
    },
    TorigHeaderLeft: {
        left:0,
    },
    TorigHeaderRight: {
        right:0,
    },
    TheadTh: {
        // position: '-webkit-sticky',
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