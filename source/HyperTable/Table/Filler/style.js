import { createUseStyles } from "react-jss";

export default createUseStyles({
    Tr: ({height}) => ({display: height > 0 ? 'table-row' : 'none', padding: '0px'}),
    Td: ({height}) => ({height, padding: '0px'}),
});