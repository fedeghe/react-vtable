import React from 'react';
import ReactDOM from 'react-dom'
import { startFPSMonitor, startMemMonitor } from 'perf-monitor'
import Playground from './Playground'

if(location.host.match(/^localhost/)) {
    startFPSMonitor();
    startMemMonitor();
}


ReactDOM.render(
    <Playground/>,
    document.getElementById('root')
);