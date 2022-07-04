import { createUseStyles } from "react-jss";

export default createUseStyles({
    Container : {
        margin: '0 5px',
        display: 'inline-flex',
        flexDirection: "column",
        alignItems: 'center',
        fontSize: '.7em',
        lineHeight: '.7em',
        // height: 36
    },
    Item: {
        height: '1em',
        cursor: 'pointer',
        display: 'flex',
        '&:hover':{
            color:'black'
        }
    },
    Ascending: ({isSorting, direction}) =>({
        color: isSorting && direction === 'asc' ? 'black' : '#bbb'
    }),
    Descending: ({isSorting, direction}) =>({
        color: isSorting && direction === 'desc' ? 'black' : '#bbb'
    })
});