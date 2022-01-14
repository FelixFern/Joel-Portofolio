import React from 'react'
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
    
    const URL = "http://localhost:1337"
    const THUMBNAIL_URL = URL + data.selectedWork.data.attributes.thumbnail.data.attributes.url
    const image_list = data.selectedWork.data.attributes.images.data
    document.title = "Project | " + data.selectedWork.data.attributes.title

    return (
        <>
            <Navbar color="white"></Navbar>
            <div className='work-detail-parent'>
                <div className='work-detail-content-parent' style={{"background-image": `url(${THUMBNAIL_URL})`}}>
                    <Link to="/" className='back-btn'><h1>{'<'} Back</h1></Link>
                    {/* <img src={THUMBNAIL_URL} className='thumbnail-img'></img> */}
                    <div className='work-detail-content-container'>
                        <div className='work-detail-content'>
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
                <div className='image-gallery-parent'>
                    <div className='image-gallery'>
                        {image_list.map(image => {
                            const image_id = image_list.indexOf(image)
                            const IMG_URL = URL + image.attributes.url
                            return(
                                <img key={image_id} src={IMG_URL} className='image'></img>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default WorkDetail
