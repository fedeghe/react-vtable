import React from 'react';

const Tr = ({cls, children}) => (<tr className={cls} style={{padding:0}}>{children}</tr>);

export default Tr;