import React from 'react'

function getAcadSem(acadSem) {
    if (acadSem) {
        if (acadSem === 'AY 20/21') {
            return <small style={{backgroundColor: 'lightgreen', padding: '3px'}}>{acadSem}</small>
        } else {
            return <small>{acadSem}</small>
        }
    }
    return ''
}

function CheckBox(props) {
    return (
        <div className="form-check" data-toggle="tooltip" title={props.tooltip}>
            <input type="checkbox" className="form-check-input" value={props.value} id={props.display} checked={props.isChecked} onChange={props.filter} />
            <label htmlFor={props.display} className="form-check-label">{props.display} {getAcadSem(props.acadSem)}</label>
        </div>
    )
}

export default CheckBox