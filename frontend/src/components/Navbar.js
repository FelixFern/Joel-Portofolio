import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// function Hamburger(props) {
//     if (props.hamburgerState == false) {
//         return(
//             <MdSegment></MdSegment>
//         )
//     }
// }


function Navbar(props) {
    const [hamburger, setHamburger] = useState(false)
    const location = useLocation()
    return (
        <div className='navbar-parent'>
            <nav className='navbar'>
                <ul>
                    <li>
                        <Link to="/" id={(!location.pathname.includes('about') && !location.pathname.includes('journal')  && !location.pathname.includes("works")) ? "current" : ""}>
                            <p style={{"color" : props.color}}>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/works" id={location.pathname.includes('works') ? "current" : ""}> 
                            <p style={{"color" : props.color}}>Works</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" id={location.pathname.includes('about') ? "current" : ""}>
                            <p style={{"color" : props.color}}>About</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/journals" id={location.pathname.includes('journals') ? "current" : ""}> 
                            <p style={{"color" : props.color}}>Journal</p>
                        </Link>
                    </li>

                </ul>

            </nav>


        </div>
    )
}

export default Navbar
