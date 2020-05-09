import React, { Component } from 'react'

export class Timetable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: ['0800','0900','1000','1100','1200','1300','1400','1500','1600','1700','1800','1900','2000','2100','2200'],
            day: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
            semester: 2
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

    renderClasses = (day, time, semester) => {
        let result;
        if(this.props.classes) {
            result = this.props.classes
                .filter(cls => cls.start_time && cls.end_time && cls.day)
                .filter(cls => cls.start_time.slice(0, 2) === time.slice(0, 2) && cls.day === day && cls.semester === semester)
                .map(cls => {
                    const start = new Date('1970-01-01 ' + cls.start_time)
                    const end = new Date('1970-01-01 ' + cls.end_time)
                    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
                    const marginLeft = (cls.start_time.split(':')[1] === "30") ? "50%" : "0";
                    const marginTop = this.getMarginTop(day, start, cls.semester)
                    const width = (100 * duration).toString() + '%';
                    const btnStyle = {marginLeft: marginLeft, marginTop: marginTop, width: width}
                    return <button key={day+time+cls.class_type+cls.group+cls.venue} type="button" className="btn btn-dark btn-block btn-sm" style={btnStyle}>{cls.class_type} [{cls.group}]<br/>{cls.venue}<br/>{cls.remark}</button>
                });
        }
        return result;
    }

    render() {
        return (
            <div style={{overflowX: 'auto'}}>
                <table border="1">
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
                        {
                            this.state.day.map(day => {
                                return (
                                    <tr key={day}>
                                        <th className="day">{day}</th>
                                        {
                                            this.state.time.map(time => {
                                                return <td key={time}>
                                                    {this.renderClasses(day, time, this.state.semester)}
                                                </td>
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Timetable
