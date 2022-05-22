import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    PostFooter: ({postFooterHeight}) =>({
        maxHeight: `${postFooterHeight}px`,
        height: `${postFooterHeight}px`,
        overflow: 'hidden'
    }),
}))