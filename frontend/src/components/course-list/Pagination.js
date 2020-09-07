import React from 'react'

function Pagination(props) {
    let next;
    let previous;

    if(props.hasPrevious) {
        previous = <li className="page-item"><button data-toggle="tooltip" title="Previous page" onClick={props.goToPrevious} type="button" className="page-link" style={btnStyle}>Previous</button></li>
    }

    if(props.hasNext) {
        next = <li className="page-item"><button data-toggle="tooltip" title="Next page" onClick={props.goToNext} type="button" className="page-link" style={btnStyle}>Next</button></li>
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

// const btnStyle = {
//     backgroundColor: '#fff',
//     color: '#243a81',
//     fontWeight: '600',
//     borderBottom: '3px solid #007fff',
// }

const btnStyle = {
    backgroundColor: '#243a81',
    color: '#fff',
    fontWeight: '600',
    border: '0',
    borderBottom: '3px solid #007fff',
    borderRadius: '3px',
    marginRight: '3px',
}

export default Pagination;