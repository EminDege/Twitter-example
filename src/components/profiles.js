import React, { useState, useEffect } from 'react';

function Profiles() {
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(userData => {
                setUserData(userData);
            });
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(userData => {
                setPostData(userData);
            });
    }, []);

    return (
        <div>
            {userData ? (
                <div>
                    <div>
                        <h2>"{userData[1].name}" Kişisinin Profile Göz At!</h2>
                        <p><span>  Kullanıcı Adı: </span>{userData[1].username} </p>
                        <p><span>  City:    </span> {userData[1].address.city}</p>
                        <p><span>  Email:   </span> {userData[1].email}</p>
                        <p><span>  Phone:   </span> {userData[1].phone}</p>
                        <p><span>  Website: </span> {userData[1].website}</p>
                        <p><span>  Company: </span> {userData[1].company.name}</p>
                    </div>
                    <div> <h2>Kullanıcının Tweetleri:</h2>
                        {postData
                            .filter(item => item.userId === 1)
                            .map(item => <p> - {item.body}</p>)}
                    </div>

                    <div>
                        <h2>İlgilenebileceğiniz Diğer Profiller</h2>
                        {userData.map((item, index) => (
                            <div key={index}>
                                <h5>{item.name}</h5>
                                <p>{item.address.city}</p>
                            </div>
                        ))}
                    </div>

                </div>

            ) : (
                <p>Yükleniyor...</p>
            )}
        </div>
    );
}

export default Profiles;
