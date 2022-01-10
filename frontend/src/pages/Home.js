import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import useFetch from '../hooks/useFetch'
import { useQuery, gql } from '@apollo/client'
import createScrollSnap from 'scroll-snap'
import AOS from "aos";
import "aos/dist/aos.css";

// Import Assets
import '../style/home.css'
import Logo from '../img/logo-white.png'
import Navbar from '../components/Navbar'
import SelectedWork from '../components/SelectedWork'

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
    const { loading, error, data } = useQuery(WORKS)

    const [currentWork, setWork] = useState(null)

    useEffect(() => {
        document.title = "Joel Foo | Home"
    }, [])


    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>

    const reverseObj = (obj) => {
        let newObj = []
      
        Object.keys(obj)
          .sort()
          .reverse()
          .forEach((key) => {
            console.log(key)
            newObj[key] = obj[key]
          })
      
        return newObj  
      }


    const work_list = (data.selectedWorks.data)
    const rev_work_list = []

    for(let i =  work_list.length - 1; i >= 0; i--) {
        rev_work_list.push(work_list[i])
    }
    return (
        <div className='home-parent'>
            <Navbar></Navbar>
            <div className='home-content'>
                <div className='logo-container'>
                    <Link to="/" ><img className='logo' src={Logo}/></Link>
                </div>
                {/* <div className='jumbotron'>
                    <div className='jumbotron-content'>
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
                </div> */}
                <img className='image-work' src={currentWork != null ? "http://localhost:1337" + work_list[currentWork].attributes.thumbnail.data.attributes.url : ""}></img>

                <div className='selected-work-container'>
                    {rev_work_list.map(work => {
                        const work_id = work_list.indexOf(work) + 1
                        const DETAIL_URL = "project/"+ work_id
                        return (
                            // <SelectedWork
                            //     id="works"
                            //     className="selected-work"
                            //     key={work_id}
                            //     title={work.attributes.title}
                            //     year={work.attributes.year}
                            //     genre={work.attributes.genre}
                            //     img_url={IMG_URL}
                            //     detail_url={DETAIL_URL}
                            // ></SelectedWork>
                            <Link key={work_id} to={DETAIL_URL} className='detail-link'>
                                <h1 className={currentWork == work_id - 1 ? "current work-list" : "work-list"} onMouseOver={
                                    () => {
                                        setWork(work_id-1)
                                    }
                                }>{work.attributes.title}</h1>
                            </Link>
                        )
                    })}
                    
                </div>

            </div>
            
        </div>
    )
}



export default Home
