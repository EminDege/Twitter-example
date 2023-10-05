import React, { useState, useEffect } from 'react';

function Tweets(props) {
    const { userData, postData, top10Words } = props;
    const [allData, setAllData] = useState([]); // Tüm verileri saklayan dizi
    const [mixData, setMixData] = useState([]);
    const [displayNumber, setDisplayNumber] = useState(20);
    const [cityValue, setCityValue] = useState('');
    const [sortOption, setSortOption] = useState('recommend'); // Varsayılan sıralama tarihe göre olsun
    const [searchValue, setSearchValue] = useState('');

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

            // Tüm verileri sakla
            setAllData(mixedData);

            if (sortOption === 'date') {
                // Tarihe göre sırala
                mixedData.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA; // Azalan sıralama (en yeni en üstte)
                });
            } else if (sortOption === 'recommend') {
                // Önerilene göre sırala (rastgele sıralama)
                mixedData.sort(() => Math.random() - 0.5);
            }

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
                setMixData(allData)
            }

        }
    }, [cityValue, searchValue]);

    return (
        <div>
            <button>Tüm Tweetleri Gör</button>
            <button>Dashboard Sayfasına Git</button>
            <div>
                <h3>Gündemler</h3>
                <input
                    type="text"
                    placeholder="Arama yap..."
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                />
            </div>
            <div>
                {top10Words.map(item => (
                    <button key={item.word} onClick={() => setSearchValue(item.word)}>
                        {item.word}
                    </button>
                ))}
            </div>
            <div>
                <select value={sortOption} onChange={handleSortChange}>
                    <option value="recommend">Önerilene Göre Sırala</option>
                    <option value="date">Tarihe Göre Sırala</option>
                </select>

            </div>
            <div>
                <select value={cityValue} onChange={(event) => setCityValue(event.target.value)}>
                    <option value="">Tümü</option>
                    {uniqueCities.map((option, index) => (
                        <option value={option} key={index}>{option}</option>
                    ))}
                </select>
            </div>
            <h2>Tweets</h2> {mixData.length} Tweet bulundu
            <ul>
                {mixData.slice(0, displayNumber).map(item => (
                    <li key={item.id}>
                        <strong> {item.name} </strong> @{item.username} -{item.date}<br />
                        - {item.body} <hr />
                    </li>
                ))}
            </ul>
            <button onClick={() => setDisplayNumber(prevDisplayNumber => prevDisplayNumber + 10)} >Daha fazla göster</button>
        </div >
    );
}

export default Tweets;
