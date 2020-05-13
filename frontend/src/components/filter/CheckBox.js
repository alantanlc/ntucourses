import React from 'react'

function getAcadSem(acadSem) {
    if (acadSem) {
        return <small>{acadSem}</small>
    }
    return ''
}

function CheckBox(props) {
    return (
        <div className="form-check">
            <input type="checkbox" className="form-check-input" value={props.value} id={props.display} checked={props.isChecked} onChange={props.filter} />
            <label htmlFor={props.display} className="form-check-label">{props.display} {getAcadSem(props.acadSem)}</label>
        </div>
    )
}

export default CheckBox