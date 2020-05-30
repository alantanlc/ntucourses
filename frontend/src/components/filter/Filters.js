import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProgrammeFilter from './ProgrammeFilter';
import CheckBox from './CheckBox';

export class Filters extends Component {
    render() {
        return (
            <div className="filter">

                <div className="course-filters__header">
                    <span data-toggle="tooltip" title="Here to save your day!">Filters</span>
                    <span className="d-md-none">{this.props.results} results found</span>
                    <button data-toggle="tooltip" title="Show me all of the courses!" onClick={this.props.clearFilters}>Clear all</button>
                </div>

                <div className="course-filters__content">
                    <div className="course-filter">
                        <h4 data-toggle="tooltip" title="Here we go again">Semester</h4>
                        {
                            this.props.semesters.map((semester) => {
                                return <CheckBox key={semester.id} filter={this.props.filterSemesters} {...semester} /> 
                            })
                        }
                    </div>
                    <div className="course-filter">
                        <div className="d-flex">
                        <div className="flex mr-5">
                                <h4 data-toggle="tooltip" title="Sigh, the bane of our existence.">Exams</h4>
                                {
                                    this.props.no_exam.map((no_exam) => {
                                        return <CheckBox key={no_exam.id} filter={this.props.filterNoExam} {...no_exam} /> 
                                    })
                                }
                            </div>
                            <div className="flex">
                                <h4 data-toggle="tooltip" title="Yay technology~">Online</h4>
                                {
                                    this.props.online.map((online) => {
                                        return <CheckBox key={online.id} filter={this.props.filterOnline} {...online} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="course-filter">
                        <h4 data-toggle="tooltip" title="There's no such thing as a free lunch in the world">Grade Type</h4>
                        {
                            this.props.pass_fail.map((pass_fail) => {
                                return <CheckBox key={pass_fail.id} filter={this.props.filterPassFail} {...pass_fail} /> 
                            })
                        }
                    </div>
                    <div className="course-filter">
                        <button onClick={this.props.clearAuFilter} style={clearBtnStyle}>Clear</button>
                        <h4 data-toggle="tooltip" title="Eh, YOU.">Academic Units</h4>
                        {
                            this.props.academic_units.map((academic_units) => {
                                return <div key={academic_units.id} style={{display: 'inline-flex', marginRight: '3rem'}}><CheckBox filter={this.props.filterAcademicUnits} {...academic_units} /></div>
                            })
                        }
                    </div>
                    <div className="course-filter">
                        <button onClick={this.props.clearProgrammeFilter} style={clearBtnStyle}>Clear</button>
                        <h4 data-toggle="tooltip" title="Programming is fun!">Programme</h4>
                        <ProgrammeFilter searchProgramme={this.props.searchProgramme} keyword={this.props.progKeyword} programmes={this.props.programmes} filter={this.props.filterProgrammes} />
                    </div>
                </div>

                <div className="job-filters__footer">
                    <p data-toggle="tooltip" title="Thank you for your support!">© NTUCourses 2020</p>
                    <nav>
                        <ul>
                            <a data-toggle="tooltip" title="We're always looking out for contributors!" href="https://github.com/alanwuha/ntucourses" className="nav-link" target="_blank">
                                <li>GitHub</li>
                            </a>
                            <a data-toggle="tooltip" title="Take a look if you're interested!" href="https://ntucoursesprod.df.r.appspot.com/" className="nav-link" target="_blank">
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
                    <small data-toggle="tooltip" title="We sync our data on a daily basis to provide you with the most up-to-date information!">Data last synced on 21-MAY-2020 THU 09:00:00</small>
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
