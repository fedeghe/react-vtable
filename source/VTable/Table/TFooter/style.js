import { createUseStyles } from "react-jss";

export default createUseStyles({
    Tfoot: ({footerHeight}) => ({
        height: `${footerHeight}px`
    }),
    TorigFooter: {
        bottom:'0px',
        zIndex:100,
        textAlign:'center !important',
    },
    TorigFooterLeft: {left:'0px',},
    TorigFooterRight: {right:'0px',},
    TfootTh: {
        position: 'sticky',
        textAlign: 'left',
        verticalAlign: 'middle',
        backgroundColor: 'white',
        bottom: 0,
        // '&:lastChild': {
        //     right: '0px',
        //     zIndex: 1
        // },
    },
});