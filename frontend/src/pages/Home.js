import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import useFetch from '../hooks/useFetch'
import { useQuery, gql } from '@apollo/client'

// Import Assets
import '../style/home.css'
import Logo from '../img/logo.png'
import Navbar from '../components/Navbar'
import SelectedWork from '../components/SelectedWork'
import test_image from '../img/work-test.jpg'

const WORKS = gql`
    query getWorks {
        selectedWorks {
            data {
                attributes {
                    title, 
                    year, 
                    genre,
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

function Home() {
    useEffect(() => {
        document.title = "Joel Foo | Home"
    }, [])

    const { loading, error, data } = useQuery(WORKS)

    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>

    const work_list = (data.selectedWorks.data)
    console.log(work_list)

    return (
        <div className='home-parent'>
            <Navbar></Navbar>
            <div className='jumbotron'>
                <div className='jumbotron-content'>
                    <Link to="/" ><img className='logo' src={Logo}/></Link>
                    <div className='intro'>
                        <h3>Hi,</h3>
                        <h1>I am <span>Joel Foo</span></h1>
                        <p>PROFESSIONAL FILMMAKER</p>
                        <a href="#selected-work" className='my-work-btn'><p>MY WORK</p></a>
                    </div>
                </div>
            </div>
            <div className='selected-work-head' id="selected-work">
                <div className='selected-work-head-content'>
                    <h1 className='shadow'>SELECTED<br/>WORK</h1>
                    <h1>SELECTED<br/>WORK</h1>
                </div>
            </div>
            <div className='selected-work-container'>
                {work_list.map(work => {
                    const work_id = work_list.indexOf(work) + 1
                    const IMG_URL = "http://localhost:1337" + work.attributes.thumbnail.data.attributes.url
                    console.log(IMG_URL)
                    return (
                        <SelectedWork
                            key={work_id}
                            title={work.attributes.title}
                            year={work.attributes.year}
                            genre={work.attributes.genre}
                            img_url={IMG_URL}
                        ></SelectedWork>
                    )
                })}
                
            </div>
        </div>
    )
}



export default Home
