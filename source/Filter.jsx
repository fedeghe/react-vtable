import React, {useState} from 'react'


export default ({filter}) => {
    const [visible, setVisible] = useState(false)
    return visible
        ? <div>
            <input type="text" onChange={e => filter(e.target.value)}/>
            <span className="pointer" onClick={() => {
                filter('')
                setVisible(false)
            }}>x</span>
        </div>
        : <span className="pointer" onClick={() => setVisible(true)}>Y</span>
}