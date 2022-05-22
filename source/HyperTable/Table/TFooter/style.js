import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Tfoot: ({footerHeight}) => ({
        height: `${footerHeight}px`
    }),
    TorigFooter: {
        bottom:0,
        zIndex:1000,
        textAlign:'center !important',
    },
    TorigFooterLeft: {
        left:0,
    },
    TorigFooterRight: {
        right:0,
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