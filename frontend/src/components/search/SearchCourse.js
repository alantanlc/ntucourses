import React, { Component } from 'react'

export class SearchCourse extends Component { 
    constructor(props) {
        super(props);
        this.timeout = 0;
    }

    onChange = (e) => {
        const searchText = this.input.value

        if(this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.props.search(searchText)
            // console.log(searchText)
        }, 300);
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <input
                    style={{flex: '10', padding: '10px', border: 'none', borderBottom: '1px solid #eee'}}
                    type="text" name="keyword" 
                    placeholder="Search course by course code, title, or description"
                    defaultValue={this.props.keyword}
                    ref={(input) => this.input = input}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

export default SearchCourse