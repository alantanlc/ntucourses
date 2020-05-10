import React, { Component } from 'react'
import * as uuid from 'uuid'

export class Timetable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_time: ['0800','0900','1000','1100','1200','1300','1400','1500','1600','1700','1800','1900','2000','2100','2200'],
            time: ['0800','0900','1000','1100','1200','1300','1400','1500','1600','1700','1800','1900','2000','2100','2200'],
            day: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
            semester: "",
            group: "",
        }
    }

    componentDidMount() {
        console.log(this.props.classes)
        this.setState({
            semester: Math.max(...this.props.classes.map(cls => cls.semester))
        })

        this.resizeTimetable(Math.max(...this.props.classes.map(cls => cls.semester)))
    }

    resizeTimetable = (semester) => {
        // Reduce size of timetable if classes start after 1200 or end before 1800
        const start_times = this.props.classes
                                .filter(cls => cls.semester === semester)
                                .filter(cls => cls.start_time)
                                .map(cls => parseInt(cls.start_time.slice(0, 2)));
        const end_times = this.props.classes
                                .filter(cls => cls.semester === semester)
                                .filter(cls => cls.end_time)
                                .map(cls => parseInt(cls.end_time.slice(0, 2)));
        const min_start_time = Math.min(...start_times)
        const max_end_time = Math.max(...end_times)
        console.log(min_start_time, max_end_time)
        if (min_start_time > 12 && min_start_time !== Infinity) {
            this.setState({
                time: this.state.all_time.filter(t => parseInt(t.slice(0, 2)) > 12)
            })
        } else if (max_end_time < 18) {
            this.setState({
                time: this.state.all_time.filter(t => parseInt(t.slice(0, 2)) < 18)
            })
        } else {
            this.setState({
                time: this.state.all_time
            })
        }
    }

    getMarginTop = (day, start, semester) => {
        let result = '0px';
        let overlap = this.props.classes
            .filter(cls=> cls.day === day)
            .filter(cls => cls.semester === semester)
            .filter(cls => new Date('1970-01-01 ' + cls.end_time) > start && new Date('1970-01-01 ' + cls.start_time) < start)
        if(overlap.length) {
            result = (overlap.length * 56).toString() + 'px'
        }
        return result;
    }

    renderClasses = (day, time, semester, group) => {
        let result;
        if(this.props.classes) {
            result = this.props.classes
                .filter(cls => cls.start_time && cls.end_time && cls.day)
                .filter(cls => { if(group) { return cls.group === group} else { return cls }})
                .filter(cls => cls.semester === semester)
                .filter(cls => cls.day === day)
                .filter(cls => cls.start_time.slice(0, 2) === time.slice(0, 2))
                .map(cls => {
                    const start = new Date('1970-01-01 ' + cls.start_time)
                    const end = new Date('1970-01-01 ' + cls.end_time)
                    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
                    const marginLeft = (cls.start_time.split(':')[1] === "30") ? "50%" : "0";
                    const marginTop = this.getMarginTop(day, start, cls.semester)
                    const width = (104.99 * duration).toString() + 'px';
                    const btnStyle = {marginLeft: marginLeft, marginTop: marginTop, width: width}
                    return <button key={uuid.v4()} type="button" className="btn btn-dark btn-block btn-sm" style={btnStyle}>{cls.class_type} [{cls.group}]<br/>{cls.venue}<br/>{cls.remark}</button>
                });
        }
        return result;
    }

    renderTimetable = (semester, group) => {
        let result;
        result = this.state.day.map(day => {
            return (
                <tr key={day}>
                    <th className="day">{day}</th>
                    {
                        this.state.time.map(time => {
                            return <td key={time}>
                                {this.renderClasses(day, time, semester, group)}
                            </td>
                        })
                    }
                </tr>
            )
        })
        return result;
    }

    semesterOnChange = (e) => {       
        this.setState({
            semester: parseInt(e.target.value),
            group: ''
        })

        this.resizeTimetable(parseInt(e.target.value))
    }

    groupOnChange = (e) => {
        this.setState({
            group: e.target.value
        })
    }

    getSemesterDisplay = (sem) => {
        if (sem <= 3) {
            return 'Sem ' + sem
        } else if(sem === 4) {
            return 'Special Term 1'
        } else if(sem === 5) {
            return 'Special Term 2'
        } else {
            return ''
        }
    }

    renderDropdowns = () => {
        let result;
        if (this.props.type === "timetable") {
            result = (
                <div className="form-group">
                    <select onChange={this.semesterOnChange} className="form-control form-control-sm select" style={{fontSize: '0.8rem', maxWidth: '130px', display: 'inline', marginRight: '5px'}}>
                        {
                            this.props.classes
                                .map(cls => cls.semester)
                                .filter((v, i, a) => a.indexOf(v) === i)
                                .map(sem => <option key={sem} value={sem}>{this.getSemesterDisplay(sem)}</option>)
                        }
                    </select>
                    <select value={this.state.group} onChange={this.groupOnChange} className="form-control form-control-sm select" style={{fontSize: '0.8rem', maxWidth: '120px', display: 'inline', marginRight: '5px'}}>
                        <option value="">All groups</option>
                        {
                            this.props.classes
                                .filter(cls => cls.semester === this.state.semester)
                                .map(cls => cls.group)
                                .filter((v, i, a) => a.indexOf(v) === i)
                                .map(group => <option key={group} value={group}>{group}</option>)
                        }
                    </select>
                </div>
            )
        }
        return result;
    }

    render() {
        return (
            <div>
                {this.renderDropdowns()}
                <div style={{overflowX: 'auto'}}>
                    <table>
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                {
                                    this.state.time.map(time => {
                                        return <th key={time}>{time}</th>
                                    })
                                }
                            </tr>
                            </thead>
                        <tbody>
                            { this.renderTimetable(this.state.semester, this.state.group) }
                        </tbody>
                    </table>
                </div>

                         
            </div>
        )
    }
}

export default Timetable
