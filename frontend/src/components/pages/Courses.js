import React, { Component } from 'react';

import axios from 'axios';
import queryString from 'query-string';

import CourseList from '../CourseList';
import Filters from '../Filters';
import SearchCourse from '../SearchCourse';
import Pagination from '../Pagination';

export class Courses extends Component {
    state = {
        courses: [],
        data: {},
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params !== this.props.match.params) {
            this.getData();
        }
    }

    getData() {
        axios.get(`http://localhost:8000/courses/${this.props.location.search}`)
            .then(res => {
                // console.log(res.data)
                this.setState({data: res.data})
                this.setState({courses: res.data.results})
            })
    }

    search = (keyword) => {
        let values = queryString.parse(this.props.location.search)
        values.search = keyword
        delete values.page
        this.props.history.replace({
            search: queryString.stringify(values)
        });
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

    getParams(link) {
        if(link) {
            link = link.split('?')[1]
        }
        return link
    }

    render() {
        return (
            <div className="row" style={{marginTop: '20px'}}>
                <div className="col-3 d-none d-md-block">
                    <Filters />
                </div>
                <div className="col">
                    <SearchCourse search={this.search} />
                    <br />
                    <p>{this.state.data.count} results found</p>
                    <CourseList courses={this.state.courses} />
                    <Pagination hasNext={this.state.data.next !== null} hasPrevious={this.state.data.previous !== null} goToPrevious={this.goToPrevious} goToNext={this.goToNext} />
                </div>
            </div> 
        )
    }
}

export default Courses;