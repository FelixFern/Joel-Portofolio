import React from 'react'
import { Link } from 'react-router-dom'


import '../style/work.css'

function SelectedWork(props) {
    return (
        <div className='selected-work'>
            <img src={props.img_url} className='work-image'/>
            <div className='selected-work-detail'>
                <div className='selected-work-title'>
                    <h1>{props.title}</h1>
                    <p>{props.year} | {props.genre}</p>
                </div>
                <Link to="/"><h1>DETAIL {'>>'}</h1></Link>
            </div>
        </div>
    )
}

export default SelectedWork
