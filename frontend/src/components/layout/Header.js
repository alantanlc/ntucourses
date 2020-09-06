import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <div className="container-lg d-flex">
                <Link to="/" className="mx-auto" data-toggle="tooltip" title="Welcome to NTU Courses!">
                    <img src="../../../ntumods_logo.svg" width="30px" alt="logo" />
                </Link>
            </div>
        </header>
    )
}

const headerStyle = {
    backgroundColor: '#243a81',
    borderBottom: '1px solid #e7e7e7',
    padding: '10px 0',
}

export default Header;