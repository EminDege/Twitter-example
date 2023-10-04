import React, { useState, useEffect } from 'react'
import './App.css';
import Login from './components/login';
import Profiles from './components/profiles';
import Tweets from './components/tweets';

function App() {
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(userData => {
        setUserData(userData);
      });
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(userData => {
        setPostData(userData);
        console.log(userData)
      });
  }, []);






  return (
    <div>
      {/* <div className='login'><Login /></div> */}
      {/* <Profiles postData={postData} userData={userData} /> */}
      <Tweets postData={postData} userData={userData} />


    </div>
  )
}

export default App;