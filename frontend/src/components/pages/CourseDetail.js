import React, { Component } from 'react';
import axios from 'axios';
import { DiscussionEmbed } from 'disqus-react';

import AcademicUnitsLi from '../course-detail-li/AcademicUnitsLi';
import GradeTypeLi from '../course-detail-li/GradeTypeLi';
import PrerequisiteLi from '../course-detail-li/PrerequisiteLi';
import MutuallyExclusiveLi from '../course-detail-li/MutuallyExclusiveLi';
import ExamLi from '../course-detail-li/ExamLi';
import NotAvailable from '../course-detail-li/NotAvailableLi';
import Timetable from '../timetable/Timetable';

export class CourseDetail extends Component {
    state = {
        is_loading: true,
        course: Object
    }

    componentDidMount() {
        axios.get(`https://api.ntucourses.com/courses/${this.props.match.params.course_code}/`) // need to include a forward slash at the end to avoid double api call
            .then(res => {
                // console.log(res.data);
                this.setState({
                    is_loading: false,
                    course: res.data
                })
            })
    }

    renderSection(title, description) {
        let result = null;
        if(title && description) {
            result = (
                <div><h4 style={{fontWeight: '600', fontSize: '1rem', marginTop: '30px'}}>{title}</h4>
                <p>{description}</p></div>
            )
        }
        return result;
    }

    renderLoading = () => {
        let result;
        if(this.state.is_loading) {
            result = (
                <div className="d-flex align-items-center">
                    <strong>Wait ah...</strong>
                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>
            )
        }
        return result;
    }

    renderTimetable = () => {
        let result;
        if(!this.state.is_loading) {
            result = <Timetable classes={this.state.course.classes} type="timetable" />
        }
        return result;
    }

    renderDisqus = () => {
        let result;
        if(!this.state.is_loading) {
            result = <DiscussionEmbed style={{marginTop: '30px'}} shortname='ntucourses-com' config={{identifier: this.props.match.params.course_code}} />
        }
        return result;
    }

    render() {
        // Destructuring
        const { course_code, title, description, academic_units, grade_type, prerequisite, mutually_exclusive_with, exams, not_available_to_programme, not_available_to_all_programme_with, not_available_as_core_to_programme, not_available_as_pe_to_programme, not_available_as_ue_to_programme } = this.state.course;

        return (
            <div className="container-lg">
                <div style={{textDecoration: 'none', textAlign: 'center', marginTop: '10px', marginBottom: '10px'}}>
                    <button type="button" style={backBtnStyle} className="btn btn-sm btn-link" onClick={this.props.history.goBack}>« Back to All Courses</button>
                </div>
                { this.renderLoading() }
                <div style={courseDetailStyle}>
                    <h4 style={{fontWeight: '600'}}>{course_code} {title}</h4>
                    <ul className="courseDetailList" style={ulStyle}>
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

                    {/* <div style={{textAlign: 'center'}}>
                        <button style={btnStyle} type="button" className="btn btn-primary">Add to Semester 1</button>
                    </div> */}
                    
                    <h4 style={{fontWeight: '600', fontSize: '1rem', marginTop: '30px'}}>Course description</h4>
                    <p>{description}</p>

                    <h4 style={{fontWeight: '600', fontSize: '1rem', marginTop: '30px'}}>Class Schedule</h4>
                    {this.renderTimetable()}

                    {this.renderDisqus()}
                </div>
            </div>
        )
    }
}

const courseDetailStyle = {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e7e7e7',
    marginBottom: '10px',
    padding: '20px 15px',
}

const ulStyle = {
    listStyleType: 'none',
}

// const btnStyle = {
//     backgroundColor: '#4d83f3',
//     color: '#fff',
//     border: '0',
//     fontWeight: '600',
//     padding: '10px',
//     width: '100%',
//     maxWidth: '300px',
//     borderRadius: '5px',
//     fontSize: '0.9rem',
//     marginTop: '10px'
// }

const backBtnStyle = {
    color: '#243a81',
}

export default CourseDetail;
