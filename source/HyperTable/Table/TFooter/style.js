import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Tfoot: ({footerHeight}) => ({
        height: `${footerHeight}px`
    }),
    TorigFooterLeft: {
        left:0,
        bottom:0,
        zIndex:1000,
        textAlign:'center !important',
    },
    TorigFooterRight: {
        right:0,
        bottom:0,
        zIndex:1000,
        textAlign:'center !important'
    },
    TfootTh: {
        position: '-webkit-sticky',
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
}))