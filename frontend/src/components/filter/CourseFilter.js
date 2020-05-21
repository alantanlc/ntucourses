import React from 'react'
import CheckBox from './CheckBox'

export default function CourseFilter(props) {
    return (
        <div className="course-filter">
            <h4>{props.filter.heading}</h4>
            {
                props.filter.options.map((option) => {
                    return <CheckBox key={option.id} name={props.filter.name} value={option.value} id={option.id} checked={option.isChecked} />
                })
            }
        </div>
    )
}
