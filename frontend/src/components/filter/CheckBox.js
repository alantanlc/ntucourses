import React from 'react'

function CheckBox(props) {
    return (
        <div className="form-check">
            <input type="checkbox" className="form-check-input" value={props.value} id={props.display} checked={props.isChecked} onChange={props.filter} />
            <label htmlFor={props.display} className="form-check-label">{props.display}</label>
        </div>
    )
}

export default CheckBox