import React from 'react'

const Filter =  ({filter}) => {
    
    const {value, setValue, visibility, setVisibility} = filter;

    return visibility
        ? <div>
            <input type="text" onChange={e => setValue(e.target.value)} value={value}/>
            <span className="pointer" onClick={() => {
                setValue('')
                setVisibility(false)
            }}>x</span>
        </div>
        : <span className="pointer" onClick={() => setVisibility(true)}>Y</span>
}
export default Filter
