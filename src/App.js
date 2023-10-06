import React, { useState, useEffect } from 'react'
import './App.css';
import Login from './components/login';
import Profiles from './components/profiles';
import Tweets from './components/tweets';
import Dashboard from './components/dashboard';
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom';


function App() {
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [top10Words, setTop10Words] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

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
      {(currentPath !== '/' && currentPath !== '/login') && (
        <div className='navbar mt-2'>
          <div>
            <Link to="/dashboard">Dashboard'a Git</Link>
          </div>
          <div>
            <Link to="./tweets" >Tweetleri Gör</Link>
          </div>
          <div>
            <Link to="/profiles/1" >Profillere Git</Link>
          </div>
          <div className='ml-auto'  >
            <Link to="/login" onClick={() => setLoginSuccess(false)} style={{ backgroundColor: '#657786' }} > Çıkış Yap </Link>
          </div>
        </div>
      )}

      < Routes >
        <Route path='/dashboard' element={<Dashboard postData={postData} userData={userData} top10Words={top10Words} />} />
        <Route path='/login' element={<Login loginSuccess={loginSuccess} setLoginSuccess={setLoginSuccess} />} />
        <Route path='/' element={<Login loginSuccess={loginSuccess} setLoginSuccess={setLoginSuccess} />} />
        <Route path='/tweets' element={<Tweets postData={postData} userData={userData} top10Words={top10Words} />} />
        <Route path="/profiles/:userId" element={<Profiles postData={postData} userData={userData} />} />
        <Route element={<Navigate to="/login" />} />
      </Routes>
    </div >
  )
}

export default App;