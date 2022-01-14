import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

import Navbar from '../components/Navbar'
import '../style/journal-detail.css'

const JOURNAL = gql`
    query getJournal($id:ID!) {
        journal(id:$id) {
            data {
                attributes {
                    publishedAt,
                    title, 
                    content,
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

function formatMyDate(value, locale = 'en-GB') {
    return new Date(value).toLocaleDateString(locale);
}

function JournalDetail() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(JOURNAL, {
        variables: {id: id}
    })
    
    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>
    console.log(data.journal.data.attributes.title)
    return (
        <>
            <Navbar color="black"></Navbar>
            <div className='journal-detail-parent'>
                <Link to="/journals" className='back-btn'><h1>{'<'} Back</h1></Link>
                <div className='journal-content'>
                    <h1>{data.journal.data.attributes.title}</h1>
                    <h3>{formatMyDate(data.journal.data.attributes.publishedAt)}</h3>
                    <ReactMarkdown className='content'>
                        {data.journal.data.attributes.content}
                    </ReactMarkdown>
                </div>
            </div>
        
        </>
    )
}

export default JournalDetail
