import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'

import '../style/works.css'

function Still() {

}

function Motion() {

}


function Works() {
    const [workView, setView] = useState("motion")
    useEffect(() => {
        document.title = "Joel Foo | Works"
    }, [])
    return (
        <>
            <Navbar></Navbar>
            <div className='works-parent'>
                <div className='selector'>
                    <h1 onClick={() => {
                        setView("motion")
                    }}className={workView == "motion" ? "current" : ""}>Motion</h1>
                    <h1 onClick={() => {
                        setView("still")
                    }}className={workView == "still" ? "current" : ""}>Still</h1>
                </div>
                <div className='works-content-parent'>
                    
                </div>
            </div>
        </>
        
    )
}

export default Works
