import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaEnvelope} from "react-icons/fa";

import '../style/about.css'


const ABOUT = gql`
    query getAbout {
            aboutMe {
                data {
                    attributes {
                        desc,
                        clients,
                        Email,
                        Facebook,
                        Instagram,
                        Linkedin,
                        Youtube,
                        Twitter,
                        profile {
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

function About() {
    const { loading, error, data } = useQuery(ABOUT)
    const URL = "https://joel-strapi-deploy.herokuapp.com"

    useEffect(() => {
        document.title = "Joel Foo | About";
    }, [])

    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>

    return (
        <>
            <Navbar color="black"></Navbar>
            <div className='about-parent'>
                <div className='about-content'>
                    <h1>ABOUT ME.</h1>
                    <div className='desc'>
                        <img className='profile-img' src={data.aboutMe.data.attributes.profile.data.attributes.url}></img>
                        <div className='desc-content'>
                            <ReactMarkdown>
                                {data.aboutMe.data.attributes.desc}
                            </ReactMarkdown>
                            <div className='contact'>
                                <a href={data.aboutMe.data.attributes.Email}>
                                    <FaEnvelope></FaEnvelope>
                                </a>
                                <a href={data.aboutMe.data.attributes.Youtube}>
                                    <FaYoutube></FaYoutube>
                                </a>
                                <a href={data.aboutMe.data.attributes.Linkedin}>
                                    <FaLinkedin></FaLinkedin>
                                </a>
                                <a href={data.aboutMe.data.attributes.Instagram}>
                                    <FaInstagram></FaInstagram>
                                </a>
                                <a href={data.aboutMe.data.attributes.Facebook}>
                                    <FaFacebook></FaFacebook>
                                </a>
                                <a href={data.aboutMe.data.attributes.Twitter}>
                                    <FaTwitter></FaTwitter>
                                </a>
                            </div>

                        </div>
                    </div>
                    <ReactMarkdown className='clients'>
                        {data.aboutMe.data.attributes.clients}
                    </ReactMarkdown>
                </div>
                
            </div>
        
        </>
    )
}

export default About
