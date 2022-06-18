import { createUseStyles } from "react-jss";

export default createUseStyles({
    Container : {
        marginLeft: 5,
        display: 'inline-flex',
        flexDirection: "column",
        alignItems: 'center',
        fontSize: '0.8em',
        lineHeight: '0.8em',
        // height: 36
    },
    Item: {
        height: 12,
        cursor: 'pointer',
        display: 'flex',
    },
    Ascending: ({isSorting, direction}) =>({
        color: isSorting && direction === 'asc' ? 'green' : 'black'
    }),
    Descending: ({isSorting, direction}) =>({
        color: isSorting && direction === 'desc' ? 'green' : 'black'
    })
});