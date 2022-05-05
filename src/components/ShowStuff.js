import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [ hashtags, setHashtags ] = useState([])
    const [ searchBar, setNewSearchBar ] = useState('')
    const hook = () => {
        axios
          .get('http://localhost:3001/hashtags')
          .then(response => {
            setHashtags(response.data)
          })
      }
      useEffect(hook, [])
      
    const handleCountryChange = (event) => {
      setNewSearchBar(event.target.value)
    }
    console.log(hashtags)
    return(
    <div>
        <p>wow</p>
        {hashtags.map(h => {
          return <div> {h.hashtag}</div>
        })}
    </div>
    )
}

export default App