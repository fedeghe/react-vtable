import React from 'react'
import HyperTable from './HyperTable'


import configBig from './configBig'

import './user.less'

const Pg = () => (
    <div className="Wrapper">
        <HyperTable {...configBig} />
    </div>
)
export default Pg