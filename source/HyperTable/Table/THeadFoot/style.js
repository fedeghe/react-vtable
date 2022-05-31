import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Thead: ({headerHeight}) => ({
        height: `${headerHeight}px`
    }),
    Tfoot: ({footerHeight}) => ({
        height: `${footerHeight}px`
    }),
    TorigHeader: {
        top:0,
        zIndex: 100,
        textAlign:'center !important'
    },
    TorigFooter: {
        bottom:0,
        zIndex:1000,
        textAlign:'center !important',
    },

    TorigLeft: {
        left:0,
        right:'initial'
    },
    TorigRight: {
        right:0,
        left:'initial'
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
    TfootTh: {
        // position: '-webkit-sticky',
        position: 'sticky',
        textAlign: 'left',
        verticalAlign: 'middle',
        bottom: 0,
        '&:lastChild': {
            right: 0,
            zIndex: 1
        },
        backgroundColor: 'white'
    },
}));