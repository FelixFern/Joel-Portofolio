import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar(props) {
    const [hamburger, setHamburger] = useState(true)
    const location = useLocation()
    return (
        <div className='navbar-parent'>
            <nav className='navbar'>
                <ul>
                    <li className={hamburger ? 'hamburger' : 'hamburger rotate-ham'}>
                        <div className={props.color == "white" ? "box-white" : "box-black"} 
                            onClick={
                                () => {
                                    if (hamburger) {
                                        setHamburger(false)
                                        console.log(hamburger)
                                    } else {
                                        setHamburger(true)
                                        console.log(hamburger)
                                    }
                                }
                        }></div>
                    </li>
                    <li className={hamburger ? 'nav-links display-none' : 'nav-links'}>
                        <Link to="/" id={(!location.pathname.includes('about') && !location.pathname.includes('journal') && !location.pathname.includes("works")) ? "current" : ""}>
                            <p style={{"color" : props.color}}>Home</p>
                        </Link>
                    </li>
                    <li className={hamburger ? 'nav-links display-none' : 'nav-links'}>
                        <Link to="/works" id={location.pathname.includes('works') ? "current" : ""}> 
                            <p style={{"color" : props.color}}>Works</p>
                        </Link>
                    </li>
                    <li className={hamburger ? 'nav-links display-none' : 'nav-links'}>
                        <Link to="/about" id={location.pathname.includes('about') ? "current" : ""}>
                            <p style={{"color" : props.color}}>About</p>
                        </Link>
                    </li>
                    <li className={hamburger ? 'nav-links display-none' : 'nav-links'}>
                        <Link to="/journals" id={location.pathname.includes('journals') || location.pathname.includes('journal') ? "current" : ""}> 
                            <p style={{"color" : props.color}}>Journal</p>
                        </Link>
                    </li>

                </ul>

            </nav>


        </div>
    )
}

export default Navbar
