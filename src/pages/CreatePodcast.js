import React from 'react'
import Header from '../components/Common/Header'
import CreatePodcastForm from '../components/StartaPodcast/CreatePodcastForm'

function CreatePodcast() {
  return (
    <div><Header ></Header>
    <div className='wrapperdiv'> 
    <h2>Create a Podcast</h2>
    <CreatePodcastForm />
    </div> 
    </div>
  )
}

export default CreatePodcast