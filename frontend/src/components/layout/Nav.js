import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <ul className="menu nav ml-auto" style={{alignItems: 'center'}}>
            <li className="nav-item">
                <Link className="nav-link active" to="/courses">Courses</Link>
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link" to="/timetable">Timetable</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/venues">Venues</Link>
            </li> */}
        </ul>
    )
}
