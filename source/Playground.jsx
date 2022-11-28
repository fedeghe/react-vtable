import React from 'react';
import VTable from './VTable';

import config from './sample/configFullSized';
// import config from './sample/configBasicSized';

import './sample/user.css';

const Pg = () => <VTable config={config(1e5)} />;
export default Pg;