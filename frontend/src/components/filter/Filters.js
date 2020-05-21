import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProgrammeFilter from './ProgrammeFilter';
import CheckBox from './CheckBox';

export class Filters extends Component {
    render() {
        return (
            <div className="filter">

                <div className="course-filters__header">
                    <span>Filters</span>
                    <span className="d-md-none">{this.props.results} results found</span>
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
                        <button onClick={this.props.clearAuFilter} style={clearBtnStyle}>Clear</button>
                        <h4>Academic Units</h4>
                        {
                            this.props.academic_units.map((academic_units) => {
                                return <div key={academic_units.id} style={{display: 'inline-flex', marginRight: '3rem'}}><CheckBox filter={this.props.filterAcademicUnits} {...academic_units} /></div>
                            })
                        }
                    </div>
                    <div className="course-filter">
                        <button onClick={this.props.clearProgrammeFilter} style={clearBtnStyle}>Clear</button>
                        <h4>Programme</h4>
                        <ProgrammeFilter programmes={this.props.programmes} filter={this.props.filterProgrammes} />
                    </div>
                </div>

                <div className="job-filters__footer">
                    <p>© NTUCourses 2020</p>
                    <nav>
                        <ul>
                            <a href="https://github.com/alanwuha/ntucourses" className="nav-link" target="blank">
                                <li>GitHub</li>
                            </a>
                            <a href="https://ntu-courses-cloudrun-l25eysxcaq-de.a.run.app/?format=json" className="nav-link" target="blank">
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
                    <small>Data last synced on 8-MAY-2020 FRI 09:00:00</small>
                </div>

            </div>
        )
    }
}

const clearBtnStyle = {
    color: '#4d83f3',
    fontWeight: 600,
    fontSize: '0.8rem',
    backgroundColor: 'transparent',
    border: 0,
    padding: 0,
    float: 'right',
}

export default Filters
