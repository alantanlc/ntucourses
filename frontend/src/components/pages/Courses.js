import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import CourseList from '../course-list/CourseList';
import Filters from '../filter/Filters';
import SearchCourse from '../search/SearchCourse';
import Pagination from '../course-list/Pagination';
import moment from 'moment';

export class Courses extends Component {
    state = {
        is_loading: true,
        data: {
            count: 0,
            results: []
        },
        keyword: '',
        progKeyword: '',
        semesters: [
            { id: 1, display: 'Semester 1', acadSem: 'AY 20/21', value: 1, tooltip: 'Semester 1', isChecked: false },
            { id: 2, display: 'Semester 2', acadSem: 'AY 19/20', value: 2, tooltip: 'Semester 2', isChecked: false },
            // {id: 3, display: 'Semester 3', value: 3, tooltip: '', isChecked: false},
            { id: 4, display: 'Special Term I', acadSem: 'AY 19/20', value: 4, tooltip: 'Special Term I', isChecked: false },
            { id: 5, display: 'Special Term II', acadSem: 'AY 19/20', value: 5, tooltip: 'Special Term II', isChecked: false }
        ],
        no_exam: [
            { id: 1, display: 'No Exam', value: 'true', tooltip: 'No Exam', isChecked: false },
        ],
        online: [
            { id: 1, display: 'Online', value: 'true', tooltip: 'Online', isChecked: false },
        ],
        pass_fail: [
            { id: 1, display: 'Pass / Fail', value: 'true', tooltip: 'Pass / Fail', isChecked: false }
        ],
        academic_units: [
            { id: 1, display: '0', value: 0, tooltip: '0', isChecked: false },
            { id: 2, display: '1', value: 1, tooltip: '1', isChecked: false },
            // {id: 3, display: '1.5', value: 1.5, tooltip: '', isChecked: false},
            { id: 4, display: '2', value: 2, tooltip: '2', isChecked: false },
            { id: 5, display: '3', value: 3, tooltip: '3', isChecked: false },
            { id: 6, display: '4', value: 4, tooltip: '4', isChecked: false },
            { id: 7, display: '5', value: 5, tooltip: '5', isChecked: false },
            { id: 8, display: '6', value: 6, tooltip: '6', isChecked: false },
            { id: 9, display: '8', value: 8, tooltip: '8', isChecked: false },
            { id: 10, display: '12', value: 12, tooltip: '12', isChecked: false },
        ],
        programmes: [
            { id: 1, display: '', value: '', tooltip: '', type: '', isChecked: false },
        ],
        last_updated_datetime: moment(),
    }

    componentDidMount() {
        Promise.all([
            this.getCourses(),
            this.getProgrammes(),
            this.getLastUpdatedDatetime(),
        ]).then(res => {
            this.setState({
                is_loading: false,
                data: res[0].data,
                programmes: res[1].data.map(p => {
                    let values = queryString.parse(this.props.location.search, { arrayFormat: 'comma', parseNumbers: true })
                    if (values.prog) {
                        if (!Array.isArray(values.prog)) {
                            values.prog = [values.prog]
                        }
                    } else {
                        values.prog = []
                    }
                    return {
                        id: p.programme_code,
                        display: p.description,
                        value: p.programme_code,
                        tooltip: p.programme_code,
                        type: p.programme_type,
                        isChecked: values.prog.findIndex(code => code === p.programme_code) >= 0
                    }
                }),
                last_updated_datetime: moment(res[2].data.last_updated_datetime),
            })
        })

        // Param values
        let values = queryString.parse(this.props.location.search, { arrayFormat: 'comma', parseNumbers: true })

        // Keyword
        let keyword = ''
        if (values.search) {
            keyword = values.search
        }

        // Semester
        let newSemesters = [...this.state.semesters]
        if (values.sem) {
            if (!Array.isArray(values.sem)) {
                values.sem = [values.sem]
            }
            values.sem.forEach((semester) => {
                const index = newSemesters.findIndex(sem => sem.value === semester)
                if (index >= 0) {
                    newSemesters[index] = { ...newSemesters[index], isChecked: true }
                }
            })
        }

        // No Exam
        let newNoExam = [...this.state.no_exam]
        if (values.no_exam) {
            if (!Array.isArray(values.no_exam)) {
                values.no_exam = [values.no_exam]
            }
            values.no_exam.forEach((no_exam) => {
                const index = newNoExam.findIndex(e => e.value === no_exam)
                if (index >= 0) {
                    newNoExam[index] = { ...newNoExam[index], isChecked: true }
                }
            })
        }

        // Online
        let newOnline = [...this.state.online]
        if (values.online) {
            if (!Array.isArray(values.online)) {
                values.online = [values.online]
            }
            values.online.forEach((online) => {
                const index = newOnline.findIndex(e => e.value === online)
                if (index >= 0) {
                    newOnline[index] = { ...newOnline[index], isChecked: true }
                }
            })
        }

        // Pass Fail
        let newPassFail = [...this.state.pass_fail]
        if (values.pass_fail) {
            if (!Array.isArray(values.pass_fail)) {
                values.pass_fail = [values.pass_fail]
            }
            values.pass_fail.forEach((pass_fail) => {
                const index = newPassFail.findIndex(e => e.value === pass_fail)
                if (index >= 0) {
                    newPassFail[index] = { ...newPassFail[index], isChecked: true }
                }
            })
        }

        // Academic units
        let newAcademicUnits = [...this.state.academic_units]
        if (values.au) {
            if (!Array.isArray(values.au)) {
                values.au = [values.au]
            }
            values.au.forEach((academic_unit) => {
                const index = newAcademicUnits.findIndex(au => au.value === academic_unit)
                if (index >= 0) {
                    newAcademicUnits[index] = { ...newAcademicUnits[index], isChecked: true }
                }
            })
        }

        // Programmes
        let newProgrammes = [...this.state.programmes]
        if (values.prog) {
            if (!Array.isArray(values.prog)) {
                values.prog = [values.prog]
            }
            values.prog.forEach((programme) => {
                const index = newProgrammes.findIndex(p => p.value === programme)
                if (index >= 0) {
                    newProgrammes[index] = { ...newProgrammes[index], isChecked: true }
                }
            })
        }

        // Update state
        this.setState({
            keyword: keyword,
            semesters: newSemesters,
            no_exam: newNoExam,
            online: newOnline,
            pass_fail: newPassFail,
            academic_units: newAcademicUnits,
            programmes: newProgrammes,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params !== this.props.match.params) {
            Promise.all([this.getCourses()])
                .then(res => {
                    this.setState({
                        is_loading: false,
                        data: res[0].data
                    })
                })
        }
    }

    getCourses() {
        this.setState({
            is_loading: true
        })
        return axios.get(`https://api.ntucourses.com/courses/${this.props.location.search}`)
    }

    getProgrammes() {
        return axios.get(`https://api.ntucourses.com/programmes/`)
    }

    getLastUpdatedDatetime() {
        return axios.get(`https://api.ntucourses.com/sync/`)
    }

    search = (keyword) => {
        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        query.search = keyword ? keyword : null
        delete query.page

        this.setState({
            keyword: keyword
        })

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
        });
    }

    searchProgramme = (keyword) => {
        this.setState({
            progKeyword: keyword
        })
    }

    clearFilters = (e) => {
        // Semesters
        let newSemesters = [...this.state.semesters]
        newSemesters.forEach(sem => sem.isChecked = false)

        // No Exam
        let newNoExam = [...this.state.no_exam]
        newNoExam.forEach(no_exam => no_exam.isChecked = false)

        // Online
        let newOnline = [...this.state.online]
        newOnline.forEach(online => online.isChecked = false)

        // Pass Fail
        let newPassFail = [...this.state.pass_fail]
        newPassFail.forEach(pass_fail => pass_fail.isChecked = false)

        // Academic Units
        let newAcademicUnits = [...this.state.academic_units]
        newAcademicUnits.forEach(academic_unit => academic_unit.isChecked = false)

        // Academic Units
        let newProgrammes = [...this.state.programmes]
        newProgrammes.forEach(programme => programme.isChecked = false)

        // Update state
        this.setState({
            semesters: newSemesters,
            no_exam: newNoExam,
            online: newOnline,
            pass_fail: newPassFail,
            academic_units: newAcademicUnits,
            programmes: newProgrammes,
        })

        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        delete query.sem
        delete query.no_exam
        delete query.online
        delete query.pass_fail
        delete query.au
        delete query.prog
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
        })
    }

    clearProgrammeFilter = (e) => {
        let newProgrammes = [...this.state.programmes]
        newProgrammes.forEach(p => p.isChecked = false)

        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        delete query.prog

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
        })
    }

    clearAuFilter = (e) => {
        let newAu = [...this.state.academic_units]
        newAu.forEach(au => au.isChecked = false)

        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        delete query.au

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
        })
    }

    filterSemesters = (e) => {
        const index = this.state.semesters.findIndex(semester => semester.value === parseInt(e.target.value))
        let newSemesters = [...this.state.semesters]
        newSemesters[index] = { ...newSemesters[index], isChecked: !newSemesters[index].isChecked }

        this.setState({
            semesters: newSemesters,
        })

        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        query.sem = newSemesters.filter(sem => sem.isChecked).map(sem => sem.value)
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
        })
    }

    filterNoExam = (e) => {
        const index = this.state.no_exam.findIndex(no_exam => no_exam.value === e.target.value)
        let newNoExam = [...this.state.no_exam]
        newNoExam[index] = { ...newNoExam[index], isChecked: !newNoExam[index].isChecked }

        this.setState({
            no_exam: newNoExam,
        })

        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        query.no_exam = newNoExam.filter(no_exam => no_exam.isChecked).map(no_exam => no_exam.value)
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
        })
    }

    filterOnline = (e) => {
        const index = this.state.online.findIndex(online => online.value === e.target.value)
        let newOnline = [...this.state.online]
        newOnline[index] = { ...newOnline[index], isChecked: !newOnline[index].isChecked }

        this.setState({
            online: newOnline,
        })

        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        query.online = newOnline.filter(online => online.isChecked).map(online => online.value)
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
        })
    }

    filterPassFail = (e) => {
        const index = this.state.pass_fail.findIndex(pass_fail => pass_fail.value === e.target.value)
        let newPassFail = [...this.state.pass_fail]
        newPassFail[index] = { ...newPassFail[index], isChecked: !newPassFail[index].isChecked }

        this.setState({
            pass_fail: newPassFail,
        })

        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        query.pass_fail = newPassFail.filter(pass_fail => pass_fail.isChecked).map(pass_fail => pass_fail.value)
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
        })
    }

    filterAcademicUnits = (e) => {
        const index = this.state.academic_units.findIndex(academic_unit => academic_unit.value === parseFloat(e.target.value))
        let newAcademicUnits = [...this.state.academic_units]
        newAcademicUnits[index] = { ...newAcademicUnits[index], isChecked: !newAcademicUnits[index].isChecked }

        this.setState({
            academic_units: newAcademicUnits
        })

        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        query.au = newAcademicUnits.filter(au => au.isChecked).map(au => au.value)
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
        })
    }

    filterProgrammes = (e) => {
        const index = this.state.programmes.findIndex(p => p.value === e.target.value)
        let newProgrammes = [...this.state.programmes]
        newProgrammes[index] = { ...newProgrammes[index], isChecked: !newProgrammes[index].isChecked }

        this.setState({
            programmes: newProgrammes
        })

        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        query.prog = newProgrammes.filter(prog => prog.isChecked).map(prog => prog.value)
        delete query.page

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
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
        if (link) {
            let linkSplit = link.split('?')

            if (linkSplit.length > 1) {
                link = linkSplit[1].replace(/%2C/g, ',')
            } else {
                link = null
            }
        }
        return link
    }

    renderLoading = () => {
        let result;
        if (this.state.is_loading) {
            result = (
                <div className="d-flex align-items-center">
                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>
            )
        }
        return result;
    }

    goToTop = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0)
    }

    clearInput = (e) => {
        e.preventDefault();

        let query = queryString.parse(this.props.location.search, { arrayFormat: 'comma' })
        delete query.search

        this.setState({
            keyword: ''
        })

        this.props.history.replace({
            search: queryString.stringify(query, { arrayFormat: 'comma', skipNull: true })
        })
    }

    getFilterButton = () => {
        if (this.state.is_loading) {
            return (
                <button style={filterLoadingBtnStyle} className="btn btn-sm btn-primary d-md-none" type="button" data-toggle="collapse" data-target="#filters" aria-expanded="false" aria-controls="filters" onClick={this.goToTop}>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: '10px' }}></span>
                    Wait ah
                </button>
            )
        } else {
            return (
                <button style={filterBtnStyle} className="btn btn-sm btn-primary d-md-none" type="button" data-toggle="collapse" data-target="#filters" aria-expanded="false" aria-controls="filters" onClick={this.goToTop}>
                    Filters
                </button>
            )
        }
    }

    getFilteredProgrammes = () => {
        let keyword = this.state.progKeyword.toLowerCase()
        let programmes = [...this.state.programmes]
            .filter(p => p.value.toLowerCase().includes(keyword)
                || p.display.toLowerCase().includes(keyword))
        return programmes
    }

    render() {
        return (
            <div className="container-lg">
                <div className="row" style={{ marginTop: '20px', marginBottom: '40px' }}>
                    <div className="col-md-3 collapse d-md-block hide stick-md-top" id="filters" style={{ backgroundColor: '#f5f6fa' }}>
                        <Filters
                            results={this.state.data.count}
                            clearFilters={this.clearFilters}
                            clearAuFilter={this.clearAuFilter}
                            clearProgrammeFilter={this.clearProgrammeFilter}
                            filterSemesters={this.filterSemesters}
                            filterNoExam={this.filterNoExam}
                            filterOnline={this.filterOnline}
                            filterPassFail={this.filterPassFail}
                            filterAcademicUnits={this.filterAcademicUnits}
                            filterProgrammes={this.filterProgrammes}
                            semesters={this.state.semesters}
                            no_exam={this.state.no_exam}
                            online={this.state.online}
                            pass_fail={this.state.pass_fail}
                            academic_units={this.state.academic_units}
                            programmes={this.getFilteredProgrammes()}
                            searchProgramme={this.searchProgramme}
                            last_updated_datetime={this.state.last_updated_datetime} />
                    </div>
                    <div className="col">
                        <SearchCourse search={this.search} clearInput={this.clearInput} keyword={this.state.keyword} />
                        <br />
                        {this.renderLoading()}
                        <p>{this.state.data.count} results found</p>
                        <CourseList courses={this.state.data.results} keyword={this.state.keyword} is_loading={this.state.is_loading} />
                        <div className="d-flex">
                            <div>
                                <Pagination hasNext={this.state.data.next} hasPrevious={this.state.data.previous} goToTop={this.goToT} goToPrevious={this.goToPrevious} goToNext={this.goToNext} />
                            </div>
                            <div className="ml-auto">
                                <button data-toggle="tooltip" title="Go to top" onClick={this.goToTop} type="button" className="page-link" style={topBtnStyle}>Back to top</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.getFilterButton()}
            </div>
        )
    }
}

const filterBtnStyle = {
    position: 'fixed',
    bottom: '15px',
    right: '15px',
    width: '80px',
    height: '35px',
    zIndex: '99999',
    fontWeight: '600',
    backgroundColor: '#243a81',
    color: '#eee',
    border: 0,
    borderBottom: '3px solid #007fff'
}

const filterLoadingBtnStyle = {
    position: 'fixed',
    bottom: '15px',
    right: '15px',
    width: '120px',
    height: '35px',
    zIndex: '99999',
    fontWeight: '600',
    backgroundColor: '#243a81',
    color: '#eee',
    border: 0,
    borderBottom: '3px solid #007fff'
}

const topBtnStyle = {
    backgroundColor: '#243a81',
    color: '#fff',
    fontWeight: '600',
    border: '0',
    borderBottom: '3px solid #007fff',
    borderRadius: '3px',
}

export default Courses;