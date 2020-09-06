import React, { Component } from 'react'
import Timetable from '../timetable/Timetable';

export class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [
                {class_type: 'LEC', day: 'MON', start_time: '08:30:00', group: '2', remark: 'Teaching Wk2-13', semester: 2, end_time: '11:30:00', venue: 'NIE LT9', year: 2019},
                {class_type: 'LEC', day: 'TUE', start_time: '08:30:00', group: '2', remark: 'Teaching Wk2-13', semester: 2, end_time: '11:30:00', venue: 'NIE LT9', year: 2019},
                {class_type: 'LEC', day: 'WED', start_time: '16:30:00', group: '2', remark: 'Teaching Wk2-13', semester: 2, end_time: '17:30:00', venue: 'NIE LT9', year: 2019},
                {class_type: 'LEC', day: 'THU', start_time: '08:30:00', group: '2', remark: '', semester: 2, end_time: '11:30:00', venue: 'NIE LT9', year: 2019},
                {class_type: 'LEC', day: 'FRI', start_time: '11:30:00', group: '2', remark: 'Teaching Wk2-13', semester: 2, end_time: '13:30:00', venue: 'NIE LT9', year: 2019},
            ]
        }
    }

    render() {
        return (
            <div className="container-lg" style={planStyle}>

                <h4 style={{fontWeight: '600', fontSize: '1.2rem', textAlign: 'center'}}>
                    Sem 1 <span style={{color: '#e7e7e7'}}>/ Sem 2 / ST 1 / ST 2</span>
                </h4>
                <hr/>
                <center><Timetable classes={this.state.classes} /></center>
                <br/>
                <input type="text" style={{border: '0', borderBottom: 'thin solid #e7e7e7'}} className="form-control form-control-sm mb-3" placeholder="Search course by course code or title" />
                <div className="row">
                    <div className="col-sm-6 col-md-4 mb-4">
                        {/* <a href="#">CZ3007 Compiler Techniques</a> */}
                        <br />
                        <small>Exam: 05-MAY-2020 FRI 9:00:00 2HRS</small>
                        <select className="form-control form-control-sm mt-2" style={{fontSize: '0.7rem', width: '110px', border: '0', backgroundColor: '#f5f5f5', borderRadius: '0', borderBottom: '1px solid #ccc'}}>
                            <option>10212 - TSP1</option>
                        </select>
                    </div>
                </div>

            </div>
        )
    }
}

const planStyle = {
    backgroundColor: '#fff',
    padding: '20px 15px',
}

export default Plan
