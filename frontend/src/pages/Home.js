import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

// Import Assets
import '../style/home.css'
import Logo from '../img/logo-white.png'
import Navbar from '../components/Navbar'

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

    const work_list = (data.selectedWorks.data)
    const rev_work_list = []

    for(let i =  work_list.length - 1; i >= 0; i--) {
        rev_work_list.push(work_list[i])
    }
    
    return (
        <div className='home-parent'>
            <Navbar color="white"></Navbar>
            <div className='home-content'>
                <div className='logo-container'>
                    <Link to="/" ><img className='logo' src={Logo}/></Link>
                </div>
                <img alt="work-image" className='image-work' src={currentWork != null ? "https://joel-strapi-deploy.herokuapp.com" + work_list[currentWork].attributes.thumbnail.data.attributes.url : "https://joel-strapi-deploy.herokuapp.com" + work_list[work_list.length-1].attributes.thumbnail.data.attributes.url}></img>
                <div className='selected-work-container'>
                    {rev_work_list.map(work => {
                        const work_id = work_list.indexOf(work) + 1
                        const DETAIL_URL = "work/"+ work_id
                        return (
                            <Link key={work_id} to={DETAIL_URL} className='detail-link'>
                                <h1 className={currentWork == work_id - 1 ? "current work-list" : "work-list"} onMouseOver={
                                    () => {
                                        setWork(work_id-1)
                                    }
                                }>{(work.attributes.title).toUpperCase()}</h1>
                            </Link>
                        )
                    })} 
                </div>
            </div>
        </div>
    )
}



export default Home
