import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AcademicUnitsLi from './AcademicUnitsLi';
import GradeTypeLi from './GradeTypeLi';
import PrerequisiteLi from './PrerequisiteLi';
import MutuallyExclusiveLi from './MutuallyExclusiveLi';
import ExamLi from './ExamLi';
import NotAvailable from './NotAvailableLi';

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

    getCourseItemStyle = () => {
        let result = courseItemStyle
        if(this.props.is_loading) {
            result = courseItemStyleLoading
        }
        return result;
    }

    render() {
        // Destructuring
        const { course_code, title, description, academic_units, grade_type, prerequisite, mutually_exclusive_with, exams, not_available_to_programme, not_available_to_all_programme_with, not_available_as_core_to_programme, not_available_as_pe_to_programme, not_available_as_ue_to_programme } = this.props.course;

        return (
            <div style={this.getCourseItemStyle()}>
                <h6><Link to={`courses/${course_code}`}>{this.getHighlightedText(course_code, this.props.keyword)} {this.getHighlightedText(title, this.props.keyword)}</Link></h6>
                <p>{this.getHighlightedText(description, this.props.keyword)}</p>
                <ul style={ulStyle}>
                    <AcademicUnitsLi academic_units={academic_units}></AcademicUnitsLi>
                    <GradeTypeLi grade_type={grade_type} />
                    <PrerequisiteLi prerequisite={prerequisite} />
                    <MutuallyExclusiveLi mutually_exclusive_with={mutually_exclusive_with} />
                    <ExamLi exams={exams} />
                    <NotAvailable title="Not available to programme" text={not_available_to_programme} />
                    <NotAvailable title="Not available to all programme with" text={not_available_to_all_programme_with} />
                    <NotAvailable title="Not available as core programme" text={not_available_as_core_to_programme} />
                    <NotAvailable title="Not available as PE to programme" text={not_available_as_pe_to_programme} />
                    <NotAvailable title="Not available as UE to programme" text={not_available_as_ue_to_programme} />
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

const courseItemStyleLoading = {
    backgroundColor: '#fff',
    color: '#4c5e7d',
    borderBottom: '1px solid #e7e7e7',
    marginBottom: '10px',
    padding: '20px 15px',
    opacity: '0.5'
}

const ulStyle = {
    listStyleType: 'none',
    margin: '0',
}

export default CourseItem;
