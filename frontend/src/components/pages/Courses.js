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
            {id: 1, value: 'Semester 1', isChecked: false},
            {id: 2, value: 'Semester 2', isChecked: false},
            {id: 3, value: 'Semester 3', isChecked: false},
            {id: 4, value: 'Special Term 1', isChecked: false},
            {id: 5, value: 'Special Term 2', isChecked: false},
        ],
        exam: {value: 'No Exam', isChecked: false},
        grade_type: {value: 'Pass / Fail', isChecked: false},
        academic_units: [
            {id: 1, value: '0-2 AU', isChecked: false},
            {id: 2, value: '3 AU', isChecked: false},
            {id: 3, value: '4 AU', isChecked: false},
            {id: 4, value: '5-8 AU', isChecked: false},
            {id: 5, value: '9 AU', isChecked: false}
        ]
    }

    componentDidMount() {
        this.getData()

        let values = queryString.parse(this.props.location.search, {arrayFormat: 'comma', parseNumbers: true})
        let newSemesters = [...this.state.semesters]
        if(values.sem) {
            if(!Array.isArray(values.sem)){
                values.sem = [values.sem]
            }
            values.sem.forEach(semester => {
                const index = newSemesters.findIndex(sem => sem.id === semester)
                if(index >= 0) {
                    newSemesters[index] = {...newSemesters[index], isChecked: true}
                }
            })
        }

        let keyword = ''
        if(values.search) {
            keyword = values.search
        }

        this.setState({
            keyword: keyword,
            semesters: newSemesters,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params !== this.props.match.params) {
            this.getData();
        }
    }

    getData() {
        axios.get(`http://192.168.1.136:8000/courses/${this.props.location.search}`)
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

    filterSemesters = (e) => {
        const index = this.state.semesters.findIndex(semester => semester.id === parseInt(e.target.value))
        let newSemesters = [...this.state.semesters]
        newSemesters[index] = {...newSemesters[index], isChecked: !newSemesters[index].isChecked}

        this.setState({
            semesters: newSemesters,
        })

        let query = queryString.parse(this.props.location.search)
        query.sem = newSemesters.filter(sem => sem.isChecked).map(sem => sem.id)
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
                    <Filters filter={this.filterSemesters} semesters={this.state.semesters} />
                </div>
                <div className="col">
                    <SearchCourse search={this.search} keyword={this.state.keyword} />
                    <br />
                    <p>{this.state.data.count} results found</p>
                    <CourseList courses={this.state.data.results} keyword={this.state.keyword} />
                    <Pagination hasNext={this.state.data.next !== null} hasPrevious={this.state.data.previous !== null} goToPrevious={this.goToPrevious} goToNext={this.goToNext} />
                </div>
            </div> 
        )
    }
}

export default Courses;