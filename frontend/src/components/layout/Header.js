import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h4 style={{fontSize: '1.3rem'}}><Link to='/' className='logo'>NTU Courses</Link></h4>
        </header>
    )
}

const headerStyle = {
    backgroundColor: '#243a81',
    color: '#fff',
    width: '100%',
    height: '63px',
    padding: '20px 20px',
    textAlign: 'center',
    borderBottom: '1px solid #e7e7e7'
}

export default Header;