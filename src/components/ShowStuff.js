import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [ hashtags, setHashtags ] = useState([])
    const [ activities, setActivities ] = useState([])
    const [ users, setUsers ] = useState([])
    

    
    const hook = () => {
          
          axios
          .get('https://hackathlon.nitorio.us/users')
          .then(response => {
            setUsers(response.data)
            axios
            .get('https://hackathlon.nitorio.us/activities')
            .then(response => {
              setActivities(response.data)
            })
          })

          axios
          .get('http://localhost:3001/hashtags')
          .then(response => {
            setHashtags(response.data)
          })


      }
      useEffect(hook, [])
      
    console.log(activities)
    return(
    <div>
        <p>wow</p>
        {activities.map((a,index) => {
          return (<div key={index}>
             <p>{a.name}</p>
             <div>{hashtags.map((h,index) =>{
               return<span style={{marginRight: "1em"}} key={index}>{h.hashtag}</span>}
               )}</div>
             </div>)
        })}
    </div>
    )
}

export default App