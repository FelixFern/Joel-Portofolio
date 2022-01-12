import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdSegment } from "react-icons/md";

function Hamburger(props) {
    if (props.hamburgerState == false) {
        return(
            <MdSegment></MdSegment>
        )
    }
}


function Navbar() {
    const [hamburger, setHamburger] = useState(false)
    const location = useLocation()
    return (
        <div className='navbar-parent'>
            <nav className='navbar'>
                <ul>
                    <li>
                        <Link to="/" id={(!location.pathname.includes('about') && !location.pathname.includes('journal')  && !location.pathname.includes("works")) ? "current" : ""}>
                            <p>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/works" id={location.pathname.includes('works') ? "current" : ""}> 
                            <p>Works</p>
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


        </div>
    )
}

export default Navbar
