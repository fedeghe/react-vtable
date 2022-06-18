import { createUseStyles } from "react-jss";

export default createUseStyles({
    Thead: ({headerHeight}) => ({
        height: `${headerHeight}px`
    }),    
    TorigHeader: {
        top:'0px',
        zIndex: 100,
        textAlign:'center !important'
    },
    TorigHeaderLeft: {left:'0px',},
    TorigHeaderRight: {right:'0px',},
    TheadTh: {
        position: 'sticky',
        textAlign: 'left',
        verticalAlign: 'middle',
        top: 0,
        '&:firstChild': {
            left: '0px',
            zIndex: 1
        },
        backgroundColor: 'white'
    },
});