import React from 'react'

function Header() {
    return (
        <header style={headerStyle}>
            <h4>NTUMods</h4>
        </header>
    )
}

const headerStyle = {
    backgroundColor: '#4d83f3',
    color: '#fff',
    width: '100%',
    height: '63px',
    padding: '20px 20px',
    textAlign: 'center',
    marginBottom: '20px',
}

export default Header;