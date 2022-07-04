import { createUseStyles } from "react-jss";

export default createUseStyles({

    TableContainer: ({ height, width, postFooterHeight, preHeaderHeight}) => ({
        maxWidth: `${width}px`,
        minHeight: `${height - postFooterHeight - preHeaderHeight}px`,
        width: `${width}px`,
        height: `${height - postFooterHeight - preHeaderHeight}px`,
        overflow: 'scroll',
        scrollBehavior: 'smooth',
        position: 'relative',
        padding: 0
    }),
    Table: ({ height, postFooterHeight, preHeaderHeight}) => ({
        borderCollapse: 'collapse',  
        borderSpacing: 0,
        minHeight: `${height - postFooterHeight - preHeaderHeight}px`,
    }),
});