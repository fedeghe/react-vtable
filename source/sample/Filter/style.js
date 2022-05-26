import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Container: {
        // height:36,
        display: 'inline-flex',
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 20
    },
    Pointer: {
        cursor: 'pointer'
    }
}));