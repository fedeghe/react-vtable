import React from 'react'

export default ({cls, children}) => {
    return (<tr className={cls}>{children}</tr>);
}
