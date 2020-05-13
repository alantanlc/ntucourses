import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CheckBox from './CheckBox';

export class Filters extends Component {    
    render() {
        return (
            <div className="filter">

                <div className="course-filters__header">
                    <span>Filters</span>
                    <button onClick={this.props.clearFilters}>Clear all</button>
                </div>

                <div className="course-filters__content">
                    <div className="course-filter">
                        <h4>Semester</h4>
                        {
                            this.props.semesters.map((semester) => {
                                return <CheckBox key={semester.id} filter={this.props.filterSemesters} {...semester} /> 
                            })
                        }
                    </div>
                    <div className="course-filter">
                        <h4>Exams</h4>
                        {
                            this.props.no_exam.map((no_exam) => {
                                return <CheckBox key={no_exam.id} filter={this.props.filterNoExam} {...no_exam} /> 
                            })
                        }
                    </div>
                    <div className="course-filter">
                        <h4>Grade Type</h4>
                        {
                            this.props.pass_fail.map((pass_fail) => {
                                return <CheckBox key={pass_fail.id} filter={this.props.filterPassFail} {...pass_fail} /> 
                            })
                        }
                    </div>
                    <div className="course-filter">
                        <h4>Academic Units</h4>
                        {
                            this.props.academic_units.map((academic_units) => {
                                return <div key={academic_units.id} style={{display: 'inline-flex', marginRight: '3rem'}}><CheckBox filter={this.props.filterAcademicUnits} {...academic_units} /></div>
                            })
                        }
                    </div>

                    {/* <div className="course-filter">
                        <h4>Programme</h4>
                        <select className="form-control form-control-sm">
                            <option></option>
                            <option>Accountancy</option>
                            <option>Business</option>
                            <option>Computer Science</option>
                        </select>
                    </div> */}
                </div>

                <div className="job-filters__footer">
                    <nav>
                        <ul>
                            <a href="https://github.com/alanwuha/ntucourses" className="nav-link" target="blank">
                                <li>GitHub</li>
                            </a>
                            <a href="http://api.ntucourses.com/" className="nav-link" target="blank">
                                <li>API</li>
                            </a>
                            {/* <Link to="contact" className="nav-link">
                                <li>Contact Us</li>
                            </Link> */}
                            {/* <Link to="Privacy" className="nav-link">
                                <li>Privacy</li>
                            </Link>
                            <Link to="terms" className="nav-link">
                                <li>Terms &amp; Conditions</li>
                            </Link> */}
                        </ul>
                    </nav>
                    <p>© NTUCourses 2020</p>
                    <small>Data last synced on 8-MAY-2020 FRI 09:00:00</small>
                </div>

            </div>
        )
    }
}

const scrollCheckBoxStyle = {
    height: '135px',
    backgroundColor: '#fff',
    border: 'thin solid #ced4da',
    borderRadius: '.2rem',
    padding: '.25rem .5rem',
    overflow: 'auto'
}

export default Filters
