import { createUseStyles } from "react-jss";

export default createUseStyles(() => ({
    Tr: ({height}) => ({display: height > 0 ? 'table-row' : 'none'}),
    Td: ({height}) => ({height}),
}));