import React, { useState, useEffect } from 'react';

function Tweets(props) {
    const { userData, postData } = props;
    const [mixData, setMixData] = useState([]);
    const [displayNumber, setDisplayNumber] = useState(20);
    const [cityValue, setCityValue] = useState('');

    useEffect(() => {
        if (userData && postData) {
            const mixedData = postData.map(post => {
                const user = userData.find(user => user.id === post.userId);
                if (user) {
                    return {
                        id: post.id,
                        body: post.body,
                        date: post.date,
                        name: user.name,
                        username: user.username,
                        city: user.address.city,
                    };
                }
                return null;
            }).filter(Boolean); // Null değerleri filtrele
            mixedData.sort(() => Math.random() - 0.5);
            setMixData(mixedData);
        }
    }, [userData, postData]);

    const uniqueCities = [...new Set(mixData.map(item => item.city))];

    useEffect(() => {
        if (cityValue) {
            const filteredData = mixData.filter(item => item.city === cityValue);
            setMixData(filteredData);
        }
    }, [cityValue]);

    return (
        <div>
            <button>Tüm Tweetleri Gör</button>
            <button>Dashboard Sayfasına Git</button>
            <div>
                <select value={cityValue} onChange={(event) => setCityValue(event.target.value)}>
                    <option value="">Choose</option>
                    {uniqueCities.map((option, index) => (
                        <option value={option} key={index}>{option}</option>
                    ))}
                </select>
            </div>
            <h2>Tweets</h2>
            <ul>
                {mixData.slice(0, displayNumber).map(item => (
                    <li key={item.id}>
                        <strong> {item.name} </strong> @{item.username}<br />
                        - {item.body} <hr />
                    </li>
                ))}
            </ul>
            <button onClick={() => setDisplayNumber(prevDisplayNumber => prevDisplayNumber + 10)} >Daha fazla göster</button>
        </div >
    );
}

export default Tweets;
