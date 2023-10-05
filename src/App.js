import React, { useState, useEffect } from 'react'
import './App.css';
import Login from './components/login';
import Profiles from './components/profiles';
import Tweets from './components/tweets';
import Dashboard from './components/dashboard';

function App() {
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [top10Words, setTop10Words] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(userData => {
        setUserData(userData);
      });
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(postData => {
        setPostData(postData);
        const topWords = findtop10Words(postData);
        setTop10Words(topWords);
      });
  }, []);

  function findtop10Words(data) {
    const allWords = data.map(item => item.body.split(' ')).flat();
    const wordCounts = {};
    allWords.forEach(word => {
      const lowercaseWord = word.toLowerCase();
      if (wordCounts[lowercaseWord]) {
        wordCounts[lowercaseWord]++;
      } else {
        wordCounts[lowercaseWord] = 1;
      }
    });
    const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
    const top10Words = sortedWords.slice(0, 10).map(word => ({
      word: word,
      count: wordCounts[word],
    }));
    return top10Words;
  }

  return (
    <div>
      {/* <div className='login'><Login /></div> */}
      {/* <Profiles postData={postData} userData={userData} /> */}
      {/* <Tweets postData={postData} userData={userData} top10Words={top10Words} /> */}
      <Dashboard postData={postData} userData={userData} top10Words={top10Words} />

    </div>
  )
}

export default App;