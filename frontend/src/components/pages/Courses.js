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
        keyword: ''
    }

    componentDidMount() {
        this.getData();
        this.setState({
            keyword: this.getKeyword()
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
                this.setState({courses: res.data.results})
            })
    }

    search = (keyword) => {
        // console.log(keyword)
        let values = queryString.parse(this.props.location.search)
        values.search = keyword
        if(!keyword) {
            delete values.search
        }
        delete values.page

        this.setState({
            keyword: keyword
        })

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

    getParams = (link) => {
        if(link) {
            link = link.split('?')[1]
        }
        return link
    }

    getKeyword = () => {
        const values = queryString.parse(this.props.location.search)
        if("search" in values) {
            return values.search
        }
        return ''
    }

    render() {
        return (
            <div className="row" style={{marginTop: '20px'}}>
                <div className="col-3 d-none d-md-block">
                    <Filters />
                </div>
                <div className="col">
                    <SearchCourse search={this.search} keyword={this.state.keyword} />
                    <br />
                    <p>{this.state.data.count} results found</p>
                    <CourseList courses={this.state.courses} keyword={this.state.keyword} />
                    <Pagination hasNext={this.state.data.next !== null} hasPrevious={this.state.data.previous !== null} goToPrevious={this.goToPrevious} goToNext={this.goToNext} />
                </div>
            </div> 
        )
    }
}

export default Courses;