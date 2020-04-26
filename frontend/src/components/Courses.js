import React, { Component } from 'react'
import CourseItem from './CourseItem';
import PropTypes from 'prop-types';

export class Courses extends Component {
    render() {
        return this.props.courses.map((course) => (
            <CourseItem key={course.course_code} course={course} />
        ));
    }
}

Courses.propTypes = {
    courses: PropTypes.array.isRequired,
}

export default Courses;
