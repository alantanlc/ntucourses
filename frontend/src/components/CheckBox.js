import React from 'react'

function CheckBox(props) {
    return (
        <div className="form-check">
            <input type="checkbox" className="form-check-input" name={props.name} value={props.id} id={props.value} checked={props.isChecked} onChange={props.filter} />
            <label htmlFor={props.value} className="form-check-label">{props.value}</label>
        </div>
    )
}

export default CheckBox