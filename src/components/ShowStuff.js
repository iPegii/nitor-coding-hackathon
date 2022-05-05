import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'
import Popupper from './Popupper'

const App = () => {
    const [ hashtags, setHashtags ] = useState([])
    const [ activities, setActivities ] = useState([])
    const [ users, setUsers ] = useState([])
    const [searchBar, setSearchBar] = useState([])
    

    
    const hook = () => {
          
          axios
          .get('https://hackathlon.nitorio.us/users')
          .then(response => {
            
            setUsers(response.data)
          })

          axios
          .get('https://hackathlon.nitorio.us/activities')
          .then(response => {
            let newActivities = []
            response.data.map(a =>  {          
              let tempActivity = a
              users.map(u => {
                if(tempActivity.id === u.activityId)
                if(tempActivity.personsIn) {
                  tempActivity = {...tempActivity, personsIn: tempActivity.personsIn+1}
                } else {
                  tempActivity = {...tempActivity, personsIn: 1}
                }
                return tempActivity
                }
              )
              newActivities = newActivities.concat(tempActivity)
         return 1  
        }
        )
            setActivities(newActivities)
          })

          axios
          .get('http://localhost:3001/hashtags')
          .then(response => {
            setHashtags(response.data)
          })


      }
      useEffect(hook, [])

      const handleSearchBar = (value) => {
        setSearchBar(value)
        console.log(value)
      }

      const handlePostingHashtag = (event) => {
          event.preventDefault()
          const hashtagObject = {
            id: newNote,
            hashtag: event.target.value,
            date: new Date().toISOString(),
            people: []
          }
        
          axios.post('http://localhost:3001/hashtags', hashtagObject)
            .then(response => {      
              console.log(response)    
            })}
      }


     const hashtagsFiltered = hashtags.filter(h => {
       if(searchBar.length !== 0) {
         console.log(h.hashtag.includes(searchBar))
        if(h.hashtag.toLowerCase().includes(searchBar.toLowerCase())) {
          return h
        }
       } else {
         return h
       }
      
      })
    return(
    <div style={{display: "grid", margin: "auto"}}>
        <h1>NINTRESSIT</h1>
        <SearchBar handleSearchBar={handleSearchBar} searchBar={searchBar} hashtags={hashtags} style={{margin: "auto"}}></SearchBar>
        <div style={{marginTop: "4em"}} ></div>
        {hashtagsFiltered.map((h,index) => {
          return (<div key={index}>
             <p>{h.hashtag}</p>
             <Popupper users={users.filter(user => h.people.indexOf(user.id) !== -1)
               .map((u,index) =>{
               return<span style={{marginRight: "1em"}} key={index}>{u.name}</span>}
               )}></Popupper>
             {console.log(h.people)}
             </div>)
        })}
    </div>
    )
}

export default App
