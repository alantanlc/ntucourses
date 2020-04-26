import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class CourseItem extends Component {
    render() {
        // Destructing
        const { course_code, title, description, academic_units, grade_type } = this.props.course;

        return (
            <div style={courseItemStyle}>
                <h6><a href="#" style={{textDecoration: 'underline'}}>{course_code} {title}</a></h6>
                <p>{description}</p>
                <ul style={ulStyle}>
                    <li>
                        <span aria-hidden="true" className="fa fa-book icon-fact"></span>
                        {academic_units.toFixed(1)} AU
                    </li>
                    <li>
                        <span aria-hidden="true" className="fa fa-check-circle icon-fact"></span>
                        Pass / Fail {grade_type}
                    </li>
                    <li>
                        <span aria-hidden="true" className="fa fa-exclamation-circle icon-fact"></span>
                        <a href="#">CZ1011</a> and <a href="#">CZ1012</a>
                    </li>
                    <li>
                        <span aria-hidden="true" className="fa fa-calendar icon-fact"></span>
                        5-May-2020 (Thu), 9.30 am
                    </li>
                </ul>
            </div>
        )
    }
}

CourseItem.propTypes = {
    course: PropTypes.object.isRequired
}

const courseItemStyle = {
    backgroundColor: '#fff',
    color: '#4c5e7d',
    borderBottom: '1px solid #e7e7e7',
    marginBottom: '10px',
    padding: '20px 15px',
}

const ulStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    fontSize: '.9rem',
}

export default CourseItem;
