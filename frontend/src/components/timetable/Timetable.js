import React, { Component } from 'react'
import * as uuid from 'uuid'
import _ from 'lodash';

export class Timetable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_time: ['0800','0900','1000','1100','1200','1300','1400','1500','1600','1700','1800','1900','2000','2100','2200'],
            time: ['0800','0900','1000','1100','1200','1300','1400','1500','1600','1700','1800','1900','2000','2100','2200'],
            day: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
            semester: "",
            index: "",
        }
    }

    componentDidMount() {
        // console.log(this.props.classes)
        this.setState({
            semester: Math.min(...this.props.classes.map(cls => cls.semester))
        })

        this.resizeTimetable(Math.min(...this.props.classes.map(cls => cls.semester)))
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
        // console.log(min_start_time, max_end_time)
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

    renderClasses = (day, time, semester, index) => {
        let result;

        if(this.props.classes) {
            if(index) {
                result = this.props.classes
                .filter(cls => cls.start_time && cls.end_time && cls.day)
                .filter(cls => { if(index) { return cls.index === index} else { return cls }})
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
            } else {
                result = _.uniqBy(this.props.classes, cls => [cls.group, cls.venue, cls.remark, cls.day, cls.start_time, cls.end_time].join())
                .filter(cls => cls.start_time && cls.end_time && cls.day)
                .filter(cls => { if(index) { return cls.index === index} else { return cls }})
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
        }

        return result;
    }

    renderTimetable = (semester, index) => {
        let result;
        result = this.state.day.map(day => {
            return (
                <tr key={day}>
                    <th className="day">{day}</th>
                    {
                        this.state.time.map(time => {
                            return <td key={time}>
                                {this.renderClasses(day, time, semester, index)}
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
            index: ''
        })

        this.resizeTimetable(parseInt(e.target.value))
    }

    indexOnChange = (e) => {
        this.setState({
            index: e.target.value
        })
    }

    getSemesterDisplay = (sem) => {
        if (sem <= 3) {
            return 'Semester ' + sem
        } else if(sem === 4) {
            return 'Special Term I'
        } else if(sem === 5) {
            return 'Special Term II'
        } else {
            return ''
        }
    }

    renderDropdowns = () => {
        let result;
        if (this.props.type === "timetable") {
            result = (
                <div className="form-group">
                    <select onChange={this.semesterOnChange} className="form-control form-control-sm select" style={{fontSize: '0.8rem', maxWidth: '130px', display: 'inline', marginRight: '5px', border: '0', backgroundColor: '#f5f5f5', borderRadius: '0', borderBottom: '1px solid #ccc'}}>
                        {
                            this.props.classes
                            .map(cls => cls.semester)
                            .sort()
                            .filter((v, i, a) => a.indexOf(v) === i)
                            .map(sem => <option key={sem} value={sem}>{this.getSemesterDisplay(sem)}</option>)
                        }
                    </select>
                    <select value={this.state.index} onChange={this.indexOnChange} className="form-control form-control-sm select" style={{fontSize: '0.8rem', maxWidth: '120px', display: 'inline', marginRight: '5px', border: '0', backgroundColor: '#f5f5f5', borderRadius: '0', borderBottom: '1px solid #ccc'}}>
                        <option value="">All indexes</option>
                        {
                            _.orderBy(
                                _.uniqBy(
                                    _.orderBy(
                                        _.uniqBy(
                                            this.props.classes.filter(cls => cls.semester === this.state.semester),
                                            'group'),
                                    ['group'], ['desc']),
                                'index'),
                            ['index'], ['asc'])
                            .map(cls => <option key={cls.index} value={cls.index}>{cls.index} - {cls.group}</option>)
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
                            { this.renderTimetable(this.state.semester, this.state.index) }
                        </tbody>
                    </table>
                </div>

                         
            </div>
        )
    }
}

export default Timetable
