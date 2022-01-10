import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import Navbar from '../components/Navbar'
import '../style/work-detail.css'

const WORK = gql`
    query getWork($id: ID!) {
        selectedWork(id: $id) {
            data {
                attributes {
                    title, 
                    year,
                    genre,
                    desc,
                    youtube,
                    thumbnail {
                        data {
                            attributes {
                                url
                            }
                        }
                    },
                    images {
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


function WorkDetail() {
    const { id } = useParams()
    const { loading, error, data} = useQuery(WORK, {
        variables: {id: id}
    })

    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>
    const IMG_URL = "http://localhost:1337" + data.selectedWork.data.attributes.thumbnail.data.attributes.url
    console.log(IMG_URL)
    document.title = "Project | " + data.selectedWork.data.attributes.title


    return (
        <div className='work-detail-parent'>
            <Navbar></Navbar>
            <div className='work-detail-content'>
                <Link to="/" className='back-btn'><h1>{'<'} Back</h1></Link>
                <div className='work-detail-content-container'>
                    <img src={IMG_URL} className='thumbnail-img'></img>
                    <div className='youtube-embed'>
                        <iframe src={data.selectedWork.data.attributes.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div>
                        <div className='work-detail-title'>
                            <h1>{data.selectedWork.data.attributes.title}</h1>
                            <p>{data.selectedWork.data.attributes.year} | {data.selectedWork.data.attributes.genre}</p>
                            <ReactMarkdown className='desc'>{data.selectedWork.data.attributes.desc}</ReactMarkdown>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default WorkDetail
