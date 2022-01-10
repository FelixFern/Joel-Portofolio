import React from 'react'
import { Link } from 'react-router-dom'

import '../style/work.css'

function SelectedWork(props) {
    return (
        <Link to={props.detail_url}>
            <div className='selected-work'>
                <img src={props.img_url} className='work-image'/>
                <div className='selected-work-detail'>
                    <div className='selected-work-title'>
                        <h1>{props.title}</h1>
                        <p>{props.year} | {props.genre}</p>
                    </div>
                </div>
            </div>
        </Link>
        
    )
}

export default SelectedWork
