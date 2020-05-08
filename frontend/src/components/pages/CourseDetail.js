import React, { Component } from 'react';
import axios from 'axios';
import { DiscussionEmbed } from 'disqus-react';

import AcademicUnitsLi from '../AcademicUnitsLi';
import GradeTypeLi from '../GradeTypeLi';
import PrerequisiteLi from '../PrerequisiteLi';
import MutuallyExclusiveLi from '../MutuallyExclusiveLi';
import ExamLi from '../ExamLi';
import NotAvailable from '../NotAvailableLi';

export class CourseDetail extends Component {
    state = {
        course: Object
    }

    componentDidMount() {
        axios.get(`https://ntu-courses.df.r.appspot.com/courses/${this.props.match.params.course_code}`)
            .then(res => {
                // console.log(res.data);
                this.setState({course: res.data})
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

    render() {
        // Destructuring
        const { course_code, title, description, academic_units, grade_type, prerequisite, mutually_exclusive_with, exams, not_available_to_programme, not_available_to_all_programme_with, not_available_as_core_to_programme, not_available_as_pe_to_programme, not_available_as_ue_to_programme } = this.state.course;

        return (
            <div>
                <div style={{textDecoration: 'none', textAlign: 'center', marginTop: '10px', marginBottom: '10px'}}>
                    <button type="button" className="btn btn-sm btn-link" onClick={this.props.history.goBack}>« Back to All Courses</button>
                </div>
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
                    <p>
                        {description}
                    </p>

                    {/* <h4 style={{fontWeight: '600', fontSize: '1rem', marginTop: '30px'}}>Timetable</h4>
                    <div className="form-group">
                        <select className="form-control form-control-sm" style={{maxWidth: '150px', display: 'inline', marginRight: '5px'}}>
                            <option>Semester 1</option>
                            <option>Semester 2</option>
                        </select>
                        <select className="form-control form-control-sm" style={{maxWidth: '150px', display: 'inline'}}>
                            <option>10531 (TSP 1)</option>
                            <option>10532 (TSP 2)</option>
                            <option>10533 (TSP 3)</option>
                            <option>10534 (TSP 4)</option>
                            <option>10535 (TSP 5)</option>
                            <option>10536 (TSP 6)</option>
                        </select>
                    </div>
                    <div style={{backgroundColor: '#f5f5f5', height: '300px'}}></div> */}

                    <DiscussionEmbed shortname='ntucourses-com' config={{identifier: this.props.match.params.course_code}} />
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

const btnStyle = {
    backgroundColor: '#4d83f3',
    color: '#fff',
    border: '0',
    fontWeight: '600',
    padding: '10px',
    width: '100%',
    maxWidth: '300px',
    borderRadius: '5px',
    fontSize: '0.9rem',
    marginTop: '10px'
}

export default CourseDetail;
