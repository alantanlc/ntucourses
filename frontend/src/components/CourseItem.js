import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class CourseItem extends Component {

    getHighlightedText(text, highlight) {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> { parts.map((part, i) => 
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', textDecoration: 'underline', backgroundColor: '#e7e7e7' } : {} }>
                { part }
            </span>)
        } </span>;
    }

    render() {
        // Destructing
        const { course_code, title, description, academic_units, grade_type } = this.props.course;

        return (
            <div style={courseItemStyle}>
                {/* <h6><Link to={`courses/${course_code}`}>{course_code} {title}</Link></h6> */}
                <h6><Link to={`courses/${course_code}`}>{this.getHighlightedText(course_code, this.props.keyword)} {this.getHighlightedText(title, this.props.keyword)}</Link></h6>
                {/* <p>{description}</p> */}
                <p>{this.getHighlightedText(description, this.props.keyword)}</p>
                <ul style={ulStyle}>
                    <li data-toggle="tooltip" title="Academic Units">
                        <span aria-hidden="true" className="fa fa-book icon-fact"></span>
                        {academic_units.toFixed(1)} AU
                    </li>
                    {/* <li data-toggle="tooltip" title="Grade Type">
                        <span aria-hidden="true" className="fa fa-child icon-fact"></span>
                        Pass / Fail {grade_type}
                    </li> */}
                    <li data-toggle="tooltip" title="Prerequisite">
                        <span aria-hidden="true" className="fa fa-exclamation-circle icon-fact"></span>
                        <Link to={`courses/${course_code}`}>CZ1011</Link> and <Link to={`courses/${course_code}`}>CZ1012</Link>
                    </li>
                    <li data-toggle="tooltip" title="Mutually Exclusive">
                        <span aria-hidden="true" className="fa fa-times-circle icon-fact"></span>
                        <Link to={`courses/${course_code}`}>CE1005</Link>
                    </li>
                    {/* <li data-toggle="tooltip" title="Exam Schedule">
                        <span aria-hidden="true" className="fa fa-calendar icon-fact"></span>
                        5-May-2020 (Thu), 9.30 am
                    </li> */}
                    <li data-toggle="tooltip" title="Rating">
                        <span aria-hidden="true" className="fa fa-user icon-fact"></span>
                        <span aria-hidden="true" className="fa fa-star"></span>
                        <span aria-hidden="true" className="fa fa-star"></span>
                        <span aria-hidden="true" className="fa fa-star"></span>
                        <span aria-hidden="true" className="fa fa-star"></span>
                        &nbsp;4
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
    margin: '0',
}

export default CourseItem;
