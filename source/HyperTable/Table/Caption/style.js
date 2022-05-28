import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    FooterCaption: ({postFooterHeight}) =>({
        maxHeight: `${postFooterHeight}px`,
        height: `${postFooterHeight}px`,
        overflow: 'hidden'
    }),
    HeaderCaption: ({preHeaderHeight}) =>({
        maxHeight: `${preHeaderHeight}px`,
        height: `${preHeaderHeight}px`,
        overflow: 'hidden'
    })
}));