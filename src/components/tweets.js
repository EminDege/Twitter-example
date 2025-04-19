import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Tweets(props) {
    const { userData, postData, top10Words } = props;
    const [allData, setAllData] = useState([]);
    const [mixData, setMixData] = useState([]);
    const [displayNumber, setDisplayNumber] = useState(10);
    const [cityValue, setCityValue] = useState('');
    const [sortOption, setSortOption] = useState('recommend');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (userData && postData) {
            const mixedData = postData.map(post => {
                const user = userData.find(user => Number(user.id) === Number(post.userId));
                if (user) {
                    return {
                        id: post.id,
                        body: post.body,
                        date: post.date,
                        name: user.name,
                        username: user.username,
                        city: user.address.city,
                        userId: post.userId
                    };
                }
                return null;
            }).filter(Boolean);
            if (sortOption === 'date') {
                mixedData.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                });
            } else if (sortOption === 'recommend') {
                mixedData.sort(() => Math.random() - 0.5);
            }
            setAllData(mixedData);
            setMixData(mixedData);
        }
    }, [userData, postData, sortOption]);

    const uniqueCities = [...new Set(allData.map(item => item.city))];

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };
    useEffect(() => {
        if (cityValue) {
            const filteredData = allData.filter(item => item.city === cityValue);
            if (searchValue) {
                const filteredData2 = filteredData.filter(item => item.body.toLowerCase().includes(searchValue.toLowerCase()));
                setMixData(filteredData2);
            } else {
                setMixData(filteredData);
            }
        } else {
            if (searchValue) {
                const filteredData2 = allData.filter(item => item.body.toLowerCase().includes(searchValue.toLowerCase()));
                setMixData(filteredData2);
            } else {
                setMixData(allData);
            }
        }
    }, [cityValue, searchValue, allData]);
    
    return (
        <div className='tweets' style={{width: '100%'}}> 
            <section className='order-2 order-sm-1' style={{ width: '60%' }}>
                <div >
                    <h2 className='text-center'>Tüm Tweetler</h2>  <span className='pale'>{mixData.length} Tweet bulundu</span>
                    <ul>
                        {mixData.slice(0, displayNumber).map(item => (
                            <li key={item.id}>
                                <strong> {item.name} </strong>
                                <Link to={`/profiles/${item.userId}`} className='userName'>
                                    <span className='userId'> @{item.username}</span>
                                </Link>
                                <span className='pale'> -{item.date}</span><br />
                                - {item.body} <hr />
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button className='moreDisplay' onClick={() => setDisplayNumber(prevDisplayNumber => prevDisplayNumber + 10)} >Daha fazla göster...</button>
                    </div>
                </div>
            </section>

            <section className='text-center order-1 order-sm-2' style={{ width: '30%', minWidth: '250px' }}>
                <div className='mt-5'>
                    <h5 >Şehre göre filtrele</h5>
                    <select value={cityValue} onChange={(event) => setCityValue(event.target.value)}>
                        <option value="">Tümü</option>
                        {uniqueCities.map((option, index) => (
                            <option value={option} key={index}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className='mt-4'>
                    <h5>Sıralama Ölçütü</h5>
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value="recommend">Önerilene Göre Sırala</option>
                        <option value="date">Tarihe Göre Sırala</option>
                    </select>
                </div>
                <div className=' mt-5'>
                    <input
                        type="text"
                        placeholder="Arama yap..."
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                </div>
                <div className='hashtag'>
                    <h3 className='py-3 text-center'>Gündemler</h3>
                    {top10Words.map(item => (
                        <ol>
                            <li className='text-left' key={item.word} onClick={() => setSearchValue(item.word)}>
                                # {item.word}
                            </li></ol>
                    ))}
                </div>
            </section>
        </div >
    );
}

export default Tweets;
