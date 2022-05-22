import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    PreHeader: ({preHeaderHeight}) =>({
        maxHeight: `${preHeaderHeight}px`,
        height: `${preHeaderHeight}px`,
        overflow: 'hidden'
    })
}))