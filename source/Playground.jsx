import React from 'react'
import HyperTable from './HyperTable'

import configSmall from './configSmall'
import configBig from './configBig'

import './user.less'

export default () => {
    return <div>
        <div className="Wrapper">
            <HyperTable {...configSmall} />
        </div>
        {/*
        <hr/>
        <div className="Wrapper">
            <HyperTable {...configBig} />
        </div>
        */}
    </div>
}