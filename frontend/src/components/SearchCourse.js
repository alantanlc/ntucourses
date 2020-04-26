import React, { Component } from 'react'

export class SearchCourse extends Component {
    state = {
        keyword: '',
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

    render() {
        return (
            <form style={{display: 'flex'}}>
                <input
                    style={{flex: '10', padding: '10px', border: 'none', borderBottom: '1px solid #eee'}}
                    type="text" name="keyword" 
                    placeholder="Search course by course code, title, or description"
                    value={this.state.title}
                    onChange={this.onChange}
                />
            </form>
        )
    }
}

SearchCourse.propTypes = {
    
}

export default SearchCourse