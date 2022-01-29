import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { useQuery, gql } from '@apollo/client'

import '../style/works.css'


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

const STILLS = gql`
    query getMotions {
            stills {
                data {
                    attributes {
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


function Still() {
    const URL = "https://joel-strapi-deploy.herokuapp.com"
    const { loading, error, data } = useQuery(STILLS)
    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>

    const still_list = data.stills.data
    const rev_still_list = []

    for(let i =  still_list.length - 1; i >= 0; i--) {
        rev_still_list.push(still_list[i])
    }

    return(
        <>
            {rev_still_list.map(still => {
                const still_id = rev_still_list.indexOf(still)
                return (
                    <div key={still_id} className='work-gallery still'>
                        <img src={URL + still.attributes.thumbnail.data.attributes.url}></img>
                    </div>
                )
            })}
        </>
    )
}

function Motion() {
    const URL = "https://joel-strapi-deploy.herokuapp.com"
    const { loading, error, data } = useQuery(MOTIONS)

    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>

    const motion_list = data.motions.data
    const rev_motion_list = []

    for(let i =  motion_list.length - 1; i >= 0; i--) {
        rev_motion_list.push(motion_list[i])
    }
    return(
        <>
            {rev_motion_list.map(motion => {
                const motion_id = rev_motion_list.indexOf(motion) 
                return (
                    <a key={motion_id} href={motion.attributes.link} target="_blank">
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
    console.log(props)
    if (props.view == "motion") {
        return (
            <Motion></Motion>
        )
    } else if (props.view == "still") {
        return (
            <Still></Still>
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
            <Navbar color="white"></Navbar>
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
