import React from 'react'

function Pagination(props) {
    let next;
    let previous;

    if(props.hasPrevious) {
        previous = <li className="page-item"><button data-toggle="tooltip" title="Previous page" onClick={props.goToPrevious} type="button" className="page-link" style={btnStyle}>If I could turn <span style={blueTextStyle}>back</span> time</button></li>
    }

    if(props.hasNext) {
        next = <li className="page-item"><button data-toggle="tooltip" title="Next page" onClick={props.goToNext} type="button" className="page-link" style={btnStyle}>Thank you, <span style={blueTextStyle}>next</span></button></li>
    }

    return (
        <nav>
            <ul className="pagination">
                {previous}
                {next}
            </ul>
        </nav>
    )
}

const btnStyle = {
    backgroundColor: '#fff',
    color: '#aaa',
    fontWeight: '600',
    borderBottom: '3px solid #007fff',
}

const blueTextStyle = {
    color: '#243a81'
}

export default Pagination;