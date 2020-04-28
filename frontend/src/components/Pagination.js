import React from 'react'

function Pagination(props) {
    let next;
    let previous;

    if(props.hasPrevious) {
        previous = <li className="page-item"><button onClick={props.goToPrevious} type="button" className="page-link">Previous</button></li>
    }

    if(props.hasNext) {
        next = <li className="page-item"><button onClick={props.goToNext} type="button" className="page-link">Next</button></li>
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

export default Pagination;