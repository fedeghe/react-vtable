import React from 'react';
import ReactDOM from 'react-dom'
// import { startFPSMonitor, startMemMonitor } from 'perf-monitor'
import Playground from './Playground'
import 'web-page-monitor'

if(location.host.match(/^localhost/)) {
    WebPageMonitor
        .showNET()
        .showFPS()
        .showMEM({
            height: 30,
        })
        .showTAGS({
            frequency: 10,
        })
        .showEVENTS({
            frequency: 10,
            exclude: [
                'onmousemove',
            ]
        })
        .render();
}


ReactDOM.render(
    <Playground/>,
    document.getElementById('root')
);