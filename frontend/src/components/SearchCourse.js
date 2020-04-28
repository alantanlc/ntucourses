import React, { Component } from 'react'

export class SearchCourse extends Component {
    state = {
        keyword: '',
    }

    onChange = (e) => {
        this.setState({keyword: e.target.value})
        this.props.search(e.target.value)
    }

    render() {
        return (
            <div>
                <button className="d-md-none" style={filterStyle}>
                    Filters
                </button>
                <div style={{display: 'flex'}}>
                    <input
                        style={{flex: '10', padding: '10px', border: 'none', borderBottom: '1px solid #eee'}}
                        type="text" name="keyword" 
                        placeholder="Search course by course code, title, or description"
                        value={this.state.keyword}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}

SearchCourse.propTypes = {
    
}

const filterStyle = {
    cursor: 'pointer',
    fontWeight: '600',
    color: '#4c5e7d',
    backgroundColor: '#fff',
    border: '1px solid #e7e7e7',
    borderRadius: '5px',
    padding: '5px 10px',
    display: 'flex',
    marginBottom: '15px',
}

export default SearchCourse