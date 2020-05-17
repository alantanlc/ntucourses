import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <ul class="menu nav">
            <li class="nav-item">
                <Link class="nav-link" to="/courses">Courses</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/timetable">Timetable</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/venues">Venues</Link>
            </li>
        </ul>
    )
}
