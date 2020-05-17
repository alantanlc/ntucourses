import React, { Component } from 'react'

export class SearchCourse extends Component { 
    constructor(props) {
        super(props);
        this.timeout = 0;
    }

    onChange = (e) => {
        const searchText = e.target.value

        if(this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.props.search(searchText)
            // console.log(searchText)
        }, 300);
    }

    clearInput = (e) => {
        this.input.value = ''
        this.props.clearInput(e);
    }

    renderClearButton = () => {
        if(this.input && this.input.value) {
            return <button type="button" style={btnStyle} onClick={this.clearInput}>clear</button>
        }
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <input
                    style={{flex: '10', padding: '10px', border: 'none', borderBottom: '1px solid #eee', color: '#4c5e7d'}}
                    type="text" name="keyword" 
                    placeholder="Search course by course code, title, or description"
                    defaultValue={this.props.keyword}
                    ref={(input) => this.input = input}
                    onChange={this.onChange}
                />
                { this.renderClearButton() }
            </div>
        )
    }
}

const btnStyle = {
    position: 'absolute',
    right: '15px',
    width: '50px',
    height: '40px',
    background: '0',
    border: '0',
    color: '#4c5e7d',
}

export default SearchCourse