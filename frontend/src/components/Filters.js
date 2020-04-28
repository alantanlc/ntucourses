import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Filters extends Component {
    render() {
        return (
            <div className="filter">

                <div className="course-filters__header">
                    <span>Filters</span>
                    <button>Clear all</button>
                </div>

                <div className="course-filters__content">
                    <div className="course-filter">
                        <h4>Semester</h4>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="semester1"/>
                            <label htmlFor="semester1" className="form-check-label">Semester 1</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="semester2" />
                            <label htmlFor="semester2" className="form-check-label">Semester 2</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="semester3" />
                            <label htmlFor="semester3" className="form-check-label">Semester 3</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="specialterm1" />
                            <label htmlFor="specialterm1" className="form-check-label">Special Term I</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="specialterm2" />
                            <label htmlFor="specialterm2" className="form-check-label">Special Term II</label>
                        </div>
                    </div>
                    <div className="course-filter">
                        <h4>Exams</h4>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="noexam" />
                            <label htmlFor="noexam" className="form-check-label">No Exam</label>
                        </div>
                    </div>
                    <div className="course-filter">
                        <h4>Grade Type</h4>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="passfail" />
                            <label htmlFor="passfail" className="form-check-label">Pass / Fail</label>
                        </div>
                    </div>
                    <div className="course-filter">
                        <h4>Academic Units</h4>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="0au" />
                            <label htmlFor="0au" className="form-check-label">0-2 AU</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="3au" />
                            <label htmlFor="3au" className="form-check-label">3 AU</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="4au" />
                            <label htmlFor="4au" className="form-check-label">4 AU</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="5au" />
                            <label htmlFor="5au" className="form-check-label">5-8 AU</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="9au" />
                            <label htmlFor="9au" className="form-check-label">More than 8 AU</label>
                        </div>
                    </div>
                    <div className="course-filter">
                        <h4>Programme</h4>
                        <select className="form-control form-control-sm">
                            <option></option>
                            <option>Accountancy</option>
                            <option>Business</option>
                            <option>Computer Science</option>
                        </select>
                    </div>
                </div>

                <div className="job-filters__footer">
                    <nav>
                        <ul>
                        <Link to="about" className="nav-link">
                                <li>About Us</li>
                            </Link>
                            <Link to="contact" className="nav-link">
                                <li>Contact Us</li>
                            </Link>
                            <Link to="Privacy" className="nav-link">
                                <li>Privacy</li>
                            </Link>
                            <Link to="terms" className="nav-link">
                                <li>Terms &amp; Conditions</li>
                            </Link>
                        </ul>
                    </nav>
                    <p>© NTUMods 2020</p>
                </div>

            </div>
        )
    }
}

export default Filters
