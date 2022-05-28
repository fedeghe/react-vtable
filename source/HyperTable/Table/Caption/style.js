import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    PostFooter: ({postFooterHeight}) =>({
        maxHeight: `${postFooterHeight}px`,
        height: `${postFooterHeight}px`,
        overflow: 'hidden'
    }),
    PreHeader: ({preHeaderHeight}) =>({
        maxHeight: `${preHeaderHeight}px`,
        height: `${preHeaderHeight}px`,
        overflow: 'hidden'
    })
}));