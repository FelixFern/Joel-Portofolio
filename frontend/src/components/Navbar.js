import React from 'react'
import { Link, useLocation } from 'react-router-dom'


function Navbar() {
    const location = useLocation()
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to="/" id={(!location.pathname.includes('about') && !location.pathname.includes('journal')) ? "current" : ""}>
                        <p>Home</p>
                    </Link>
                </li>
                <li>
                    <Link to="/about" id={location.pathname.includes('about') ? "current" : ""}>
                        <p>About</p>
                    </Link>
                </li>
                <li>
                    <Link to="/journal" id={location.pathname.includes('journal') ? "current" : ""}> 
                        <p>Journal</p>
                    </Link>
                </li>

            </ul>

        </nav>
    )
}

export default Navbar
