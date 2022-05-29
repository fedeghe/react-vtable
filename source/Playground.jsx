import React from 'react';
import HyperTable from './HyperTable';


// import config from './configBig'
import config from './configSmall';

import './user.less';

const Pg = () => (
    <div className="Wrapper">
        <HyperTable config={config} />
    </div>
);
export default Pg;