import React from 'react';
import HyperTable from './../dist';


import config from './configBig';
// import config from './configSmall';

import './user.css';

const Pg = () => (
    <div className="Wrapper">
        <HyperTable config={config} />
    </div>
);
export default Pg;