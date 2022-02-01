import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useQuery, gql } from '@apollo/client'

import '../style/journal.css'
import LoadingPage from './LoadingPage'


const JOURNALS = gql` 
    query getJournals { 
        journals {
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

function Journal() {
    const { loading, error, data } = useQuery(JOURNALS)
    useEffect(() => {
        document.title = "Joel Foo | Journal"
    }, [])
    if (loading) return <LoadingPage></LoadingPage>
    if (error) return <LoadingPage></LoadingPage>
    console.log(data)
    
    const journal_list = data.journals.data
    const rev_journal_list = []

    for(let i =  journal_list.length - 1; i >= 0; i--) {
        rev_journal_list.push(journal_list[i])
    }
    
    return (
        <>
            <Navbar color="black"></Navbar>
            <div className='journal-parent'>
                <div className='journal-content'>
                    <h1>JOURNAL.</h1>
                    {rev_journal_list.map(journal => {
                        const journal_id = journal_list.indexOf(journal) + 1
                        const JOURNAL_URL = "../journal/" + journal_id
                        return (
                            <div className='journal' key={journal_id}>
                                <Link to={JOURNAL_URL} className='journal-link-all'>
                                    <h1>{journal.attributes.title}</h1>
                                    <h3>{formatMyDate(journal.attributes.publishedAt)}</h3>
                                    <ReactMarkdown className='content'>
                                        {journal.attributes.content}
                                    </ReactMarkdown>
                                    <Link className='read-more-btn' to={JOURNAL_URL}>
                                        <h1>Read More</h1>
                                    </Link>
                                </Link>
                                
                            </div>
                        )
                    })}
                    
                </div>
            
            </div>
        </>
    )
}

export default Journal
