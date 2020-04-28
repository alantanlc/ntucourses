import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class CourseDetail extends Component {
    state = {
        course: Object
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/courses/${this.props.match.params.course_code}`)
            .then(res => {
                // console.log(res.data);
                this.setState({course: res.data})
            })
    }

    render() {
        return (
            <div>
                <div style={{textDecoration: 'none', textAlign: 'center', marginTop: '10px', marginBottom: '10px'}}>
                    <button type="button" className="btn btn-sm btn-link" onClick={this.props.history.goBack}>« Back to All Courses</button>
                </div>
                <div style={courseDetailStyle}>
                    <h4 style={{fontWeight: '600'}}>{this.state.course.course_code} {this.state.course.title}</h4>
                    <ul className="courseDetailList" style={ulStyle}>
                        <li data-toggle="tooltip" title="Academic Units">
                            <span aria-hidden="true" className="fa fa-book icon-fact"></span>
                            {this.state.course.academic_units} AU
                        </li>
                        <li data-toggle="tooltip" title="Grade Type">
                            <span aria-hidden="true" className="fa fa-child icon-fact"></span>
                            Pass / Fail
                        </li>
                        <li data-toggle="tooltip" title="Prerequisite">
                            <span aria-hidden="true" className="fa fa-exclamation-circle icon-fact"></span>
                            <Link to={`courses`}>CZ1011</Link> and <Link to={`courses`}>CZ1012</Link>
                        </li>
                        <li data-toggle="tooltip" title="Mutually Exclusive">
                            <span aria-hidden="true" className="fa fa-times-circle icon-fact"></span>
                            <Link to={`courses`}>CE1005</Link>
                        </li>
                        <li data-toggle="tooltip" title="Exam Schedule">
                            <span aria-hidden="true" className="fa fa-calendar icon-fact"></span>
                            5-May-2020 (Thu), 9.30 am
                        </li>
                        <li data-toggle="tooltip" title="Rating">
                            <span aria-hidden="true" className="fa fa-user icon-fact"></span>
                            <span aria-hidden="true" className="fa fa-star"></span>&nbsp;
                            <span aria-hidden="true" className="fa fa-star"></span>&nbsp;
                            <span aria-hidden="true" className="fa fa-star"></span>&nbsp;
                            <span aria-hidden="true" className="fa fa-star"></span>&nbsp;
                            4
                        </li>
                    </ul>

                    <div style={{textAlign: 'center'}}>
                        <button style={btnStyle} type="button" className="btn btn-primary">Add to Semester 1</button>
                    </div>

                    <h4 style={{fontWeight: '600', fontSize: '1rem', marginTop: '30px'}}>Course description</h4>
                    <p>
                        {this.state.course.description}
                    </p>

                    <h4 style={{fontWeight: '600', fontSize: '1rem', marginTop: '30px'}}>Timetable</h4>
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
                    <div style={{backgroundColor: '#f5f5f5', height: '300px'}}></div>

                    <div id="disqus_thread" style={{maxWidth: '800px', margin: '30px auto 0'}}></div>
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
}

const ratingStyle = {
    textAlign: 'center',
    margin: '10px auto 0',
    color:'#777',
    backgroundColor: '#f0f3f5',
    borderRadius: '5px',
    padding: '10px',
    width: '100%',
    maxWidth:'500px',
}

export default CourseDetail;
