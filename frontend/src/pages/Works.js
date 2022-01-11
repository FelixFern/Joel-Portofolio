import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { useQuery, gql } from '@apollo/client'

import '../style/works.css'
import { Link } from 'react-router-dom'


const MOTIONS = gql`
    query getMotions {
        motions {
            data {
                attributes {
                    title, 
                    year, 
                    link,
                    thumbnail {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
    }

`



// function Still() {
//     return(
//         <></>
//     )
// }

function Motion() {
    const URL = "http://localhost:1337"
    const { loading, error, data } = useQuery(MOTIONS)

    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>

    console.log(data)
    const motion_list = data.motions.data
    const rev_motion_list = []

    for(let i =  motion_list.length - 1; i >= 0; i--) {
        rev_motion_list.push(motion_list[i])
    }
    return(
        <>
            {rev_motion_list.map(motion => {
                return (
                    <a href={motion.attributes.link} target="_blank">
                        <div className='work-gallery'>
                            <div className='work-detail'>
                                <h1>{motion.attributes.title}</h1>
                            </div>
                            <img src={URL + motion.attributes.thumbnail.data.attributes.url}></img>
                        </div>
                    </a>
                )
            })}
        </>
    )
}

function WorksContainer(props) {
    if (props.view == "motion") {
        return (
            <Motion></Motion>
        )
    } else {
        return (
            <></>
        )
    }
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
                    <WorksContainer view={workView}></WorksContainer>
                </div>
            </div>
        </>
        
    )
}

export default Works
