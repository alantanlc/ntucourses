import React, { Component } from 'react';

import axios from 'axios';
import queryString from 'query-string';

import CourseList from '../CourseList';
import Filters from '../Filters';
import SearchCourse from '../SearchCourse';
import Pagination from '../Pagination';

export class Courses extends Component {
    state = {
        data: {
            results: []
        },
        keyword: '',
        semesters: [
            {id: 1, display: 'Semester 1', value: 1, isChecked: false},
            {id: 2, display: 'Semester 2', value: 2, isChecked: false},
            // {id: 3, display: 'Semester 3', value: 3, isChecked: false},
            {id: 4, display: 'Special Term 1', value: 4, isChecked: false},
            {id: 5, display: 'Special Term 2', value: 5, isChecked: false}
        ],
        no_exam: [
            {id: 1, display: 'No Exam', value: 'true', isChecked: false},
        ],
        pass_fail: [
            {id: 1, display: 'Pass / Fail', value: 'true', isChecked: false}
        ],
        academic_units: [
            {id: 1, display: '0', value: 0, isChecked: false},
            {id: 2, display: '1', value: 1, isChecked: false},
            {id: 3, display: '1.5', value: 1.5, isChecked: false},
            {id: 4, display: '2', value: 2, isChecked: false},
            {id: 5, display: '3', value: 3, isChecked: false},
            {id: 6, display: '4', value: 4, isChecked: false},
            {id: 7, display: '5', value: 5, isChecked: false},
            {id: 8, display: '6', value: 6, isChecked: false},
            {id: 9, display: '8', value: 8, isChecked: false},
            {id: 10, display: '12', value: 12, isChecked: false},
        ]
    }

    componentDidMount() {
        this.getData()

        // Param values
        let values = queryString.parse(this.props.location.search, {arrayFormat: 'comma', parseNumbers: true})

        // Keyword
        let keyword = ''
        if(values.search) {
            keyword = values.search
        }

        // Semester
        let newSemesters = [...this.state.semesters]
        if(values.sem) {
            if(!Array.isArray(values.sem)) {
                values.sem = [values.sem]
            }
            values.sem.forEach((semester) => {
                const index = newSemesters.findIndex(sem => sem.value === semester)
                if(index >= 0) {
                    newSemesters[index] = {...newSemesters[index], isChecked: true}
                }
            })
        }

        // No Exam
        let newNoExam = [...this.state.no_exam]
        if(values.no_exam) {
            if(!Array.isArray(values.no_exam)) {
                values.no_exam = [values.no_exam]
            }
            values.no_exam.forEach((no_exam) => {
                const index = newNoExam.findIndex(e => e.value === no_exam)
                if(index >= 0) {
                    newNoExam[index] = {...newNoExam[index], isChecked: true}
                }
            })
        }

        // Pass Fail
        let newPassFail = [...this.state.pass_fail]
        if(values.pass_fail) {
            if(!Array.isArray(values.pass_fail)) {
                values.pass_fail = [values.pass_fail]
            }
            values.pass_fail.forEach((pass_fail) => {
                const index = newPassFail.findIndex(e => e.value === pass_fail)
                if(index >= 0) {
                    newPassFail[index] = {...newPassFail[index], isChecked: true}
                }
            })
        }

        // Academic units
        let newAcademicUnits = [...this.state.academic_units]
        if(values.au) {
            if(!Array.isArray(values.au)) {
                values.au = [values.au]
            }
            values.au.forEach((academic_unit) => {
                const index = newAcademicUnits.findIndex(au => au.value === academic_unit)
                if(index >= 0) {
                    newAcademicUnits[index] = {...newAcademicUnits[index], isChecked: true}
                }
            })
        }

        // Update state
        this.setState({
            keyword: keyword,
            semesters: newSemesters,
            no_exam: newNoExam,
            pass_fail: newPassFail,
            academic_units: newAcademicUnits,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params !== this.props.match.params) {
            this.getData();
        }
    }

    getData() {
        axios.get(`https://ntu-courses.df.r.appspot.com/courses/${this.props.location.search}`)
            .then(res => {
                // console.log(res.data)
                this.setState({data: res.data})
            })
    }

    search = (keyword) => {
        let query = queryString.parse(this.props.location.search, {arrayFormat: 'comma'})
        query.search = keyword ? keyword : null
        delete query.page

        this.setState({
            keyword: keyword
        })

        this.props.history.replace({
            search: queryString.stringify(query, {arrayFormat: 'comma', skipNull: true})
        });
    }

    clearFilters = (e) => {
        // Semesters
        let newSemesters = [...this.state.semesters]
        newSemesters.forEach(sem => sem.isChecked = false)

        // No Exam
        let newNoExam = [...this.state.no_exam]
        newNoExam.forEach(no_exam => no_exam.isChecked = false)

        // Pass Fail
        let newPassFail = [...this.state.pass_fail]
        newPassFail.forEach(pass_fail => pass_fail.isChecked = false)

        // Academic Units
        let newAcademicUnits = [...this.state.academic_units]
        newAcademicUnits.forEach(academic_unit => academic_unit.isChecked = false)

        // Update state
        this.setState({
            semesters: newSemesters,
            no_exam: newNoExam,
            pass_fail: newPassFail,
            academic_units: newAcademicUnits
        })
        
        let query = queryString.parse(this.props.location.search, {arrayFormat: 'comma'})
        delete query.sem
        delete query.no_exam
        delete query.pass_fail
        delete query.au
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, {arrayFormat: 'comma', skipNull: true})
        })
    }

    filterSemesters = (e) => {
        const index = this.state.semesters.findIndex(semester => semester.value === parseInt(e.target.value))
        let newSemesters = [...this.state.semesters]
        newSemesters[index] = {...newSemesters[index], isChecked: !newSemesters[index].isChecked}

        this.setState({
            semesters: newSemesters,
        })

        let query = queryString.parse(this.props.location.search, {arrayFormat: 'comma'})
        query.sem = newSemesters.filter(sem => sem.isChecked).map(sem => sem.value)
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, {arrayFormat: 'comma', skipNull: true})
        })
    }

    filterNoExam = (e) => {
        const index = this.state.no_exam.findIndex(no_exam => no_exam.value === e.target.value)
        let newNoExam = [...this.state.no_exam]
        newNoExam[index] = {...newNoExam[index], isChecked: !newNoExam[index].isChecked}

        this.setState({
            no_exam: newNoExam,
        })

        let query = queryString.parse(this.props.location.search, {arrayFormat: 'comma'})
        query.no_exam = newNoExam.filter(no_exam => no_exam.isChecked).map(no_exam => no_exam.value)
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, {arrayFormat: 'comma', skipNull: true})
        })
    }

    filterPassFail = (e) => {
        const index = this.state.pass_fail.findIndex(pass_fail => pass_fail.value === e.target.value)
        let newPassFail = [...this.state.pass_fail]
        newPassFail[index] = {...newPassFail[index], isChecked: !newPassFail[index].isChecked}

        this.setState({
            pass_fail: newPassFail,
        })

        let query = queryString.parse(this.props.location.search, {arrayFormat: 'comma'})
        query.pass_fail = newPassFail.filter(pass_fail => pass_fail.isChecked).map(pass_fail => pass_fail.value)
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, {arrayFormat: 'comma', skipNull: true})
        })
    }

    filterAcademicUnits = (e) => {
        const index = this.state.academic_units.findIndex(academic_unit => academic_unit.value === parseFloat(e.target.value))
        let newAcademicUnits = [...this.state.academic_units]
        newAcademicUnits[index] = {...newAcademicUnits[index], isChecked: !newAcademicUnits[index].isChecked}

        this.setState({
            academic_units: newAcademicUnits
        })

        let query = queryString.parse(this.props.location.search, {arrayFormat: 'comma'})
        query.au = newAcademicUnits.filter(au => au.isChecked).map(au => au.value)
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, {arrayFormat: 'comma', skipNull: true})
        })
    }

    goToPrevious = (e) => {
        e.preventDefault();
        this.props.history.replace({
            search: this.getParams(this.state.data.previous)
        });
        window.scrollTo(0, 0)
    }

    goToNext = (e) => {
        e.preventDefault();
        this.props.history.replace({
            search: this.getParams(this.state.data.next)
        });
        window.scrollTo(0, 0)
    }

    getParams = (link) => {
        if(link) {
            link = link.split('?')[1].replace(/%2C/g, ',')
        }
        return link
    }

    render() {
        return (
            <div className="row" style={{marginTop: '20px'}}>
                <div className="col-3 d-none d-md-block">
                    <Filters
                        clearFilters={this.clearFilters}
                        filterSemesters={this.filterSemesters}
                        filterNoExam={this.filterNoExam}
                        filterPassFail={this.filterPassFail}
                        filterAcademicUnits={this.filterAcademicUnits}
                        semesters={this.state.semesters}
                        no_exam={this.state.no_exam}
                        pass_fail={this.state.pass_fail}
                        academic_units={this.state.academic_units} />
                </div>
                <div className="col">
                    <SearchCourse search={this.search} keyword={this.state.keyword} />
                    <br />
                    <p>{this.state.data.count} results found</p>
                    <CourseList courses={this.state.data.results} keyword={this.state.keyword} />
                    <Pagination hasNext={this.state.data.next} hasPrevious={this.state.data.previous} goToPrevious={this.goToPrevious} goToNext={this.goToNext} />
                </div>
            </div> 
        )
    }
}

export default Courses;