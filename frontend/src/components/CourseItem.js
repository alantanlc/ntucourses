import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class CourseItem extends Component {
    render() {
        // Destructing
        const { course_code, title, description, academic_units, grade_type } = this.props.course;

        return (
            <div style={courseItemStyle}>
                <h6>{course_code} {title}</h6>
                <p>{description}</p>
                <ul style={ulStyle}>
                    <li>{academic_units} AUs</li>
                    <li>Pass/Fail: {grade_type}</li>
                </ul>
            </div>
        )
    }
}

CourseItem.propTypes = {
    course: PropTypes.object.isRequired
}

const courseItemStyle = {
    // display: 'block',
    // display: 'flex',
    backgroundColor: '#fff',
    color: '#4c5e7d',
    borderBottom: '1px solid #e7e7e7',
    padding: '20px 15px',
    justifyContent: 'center',
    minHeight: '120px',
    textTransform: 'capitalize',
}

const ulStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    fontSize: '.9rem',
}

export default CourseItem;
