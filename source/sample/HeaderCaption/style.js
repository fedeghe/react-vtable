import { createUseStyles } from "react-jss";

export default createUseStyles({
    Container : {
        color: 'white',
        backgroundColor: 'rgb(20, 93, 130)',
        height: 'inherit',
        display:'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '0 10px'
    },
    Butts: {
        '&>*': {
            marginLeft: '10px'
        }
    },
    Filter: {
        width:100,
        outline: 'none'
    }
});