import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Popupper from './Popupper'

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
      
    return(
    <div>
        <h1>NINTRESSIT</h1>
        {hashtags.map((h,index) => {
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
