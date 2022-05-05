import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const App = () => {
    const [hashtags, setHashtags] = useState([])
    const [activities, setActivities] = useState([])
    const [users, setUsers] = useState([])
    const [singleUser, setSingleUser] = useState([])
    const [addingValue, setAddingValue] = useState([])


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

    const handlePostingHashtag = (event) => {
        event.preventDefault()
        const hashtagObject = {
          id: uuidv4(),
          hashtag: addingValue,
          date: new Date().toISOString(),
          people: []
        }
      
        axios.post('http://localhost:3001/hashtags', hashtagObject)
          .then(response => {      
            console.log(response)    
          })}

          const handleChangingAddingValue = (event) => {
            setAddingValue(event.target.value)
          }
    
    const UserInfo = (singleUser) => {
        console.log("singleUser", singleUser.singleUser[0])
        const userHashtags = hashtags.filter(h => h.people.indexOf(singleUser.singleUser[0]) !== -1)
       return(
           <div>
           <ul>
           {userHashtags.map((h,index) => {
                return <li key = {index}>{h.hashtag}</li>
           })
            }
            </ul>
            <form onSubmit={handlePostingHashtag}>        <label>
          Lisää:
          <input type="text" value={addingValue} onChange={handleChangingAddingValue} />        </label>
        <input type="submit" value="Submit" />
      </form>
            </div>
       )
    }

    return (
        <div>
            <h1>NINTRESSIT</h1>
            <div>{users.map((user,index) => {
                console.log("log1", user.id)
                return <button key = {index} onClick={()=> {setSingleUser([user.id])}}>{user.name}</button>
            })}</div>
            <UserInfo singleUser={singleUser}></UserInfo>
        </div>
    )

}
export default App