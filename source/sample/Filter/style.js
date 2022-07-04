import { createUseStyles } from "react-jss";

export default createUseStyles({
    Container: {
        display: 'inline-flex',
        flexDirection: "column",
        alignItems: 'center',
        marginLeft: 5
    },
    Pointer: {
        cursor: 'pointer',
        color: ({visibility}) => visibility ? 'black' : '#bbb',
        '&:hover':{
            color:'black'
        }
    },
    Close : {
        position:'relative',
        right:20
    }
});