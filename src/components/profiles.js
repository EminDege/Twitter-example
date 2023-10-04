import React, { useState } from 'react';

function Profiles(props) {
    const { userData, postData } = props;
    const [selectedUser, setSelectedUser] = useState(0);

    return (
        <div>
            {userData ? (
                <div>
                    <div>
                        <h2>{userData[selectedUser].name} Kişisinin Profile Göz At!</h2>
                        <p><span>Kullanıcı Adı:</span> {userData[selectedUser].username}</p>
                        <p><span>City:</span> {userData[selectedUser].address.city}</p>
                        <p><span>Email:</span> {userData[selectedUser].email}</p>
                        <p><span>Age:</span> {userData[selectedUser].age}</p>
                        <p><span>Gender:</span> {userData[selectedUser].gender}</p>
                        <p><span>Phone:</span> {userData[selectedUser].phone}</p>
                        <p><span>Website:</span> {userData[selectedUser].website}</p>
                        <p><span>Company:</span> {userData[selectedUser].company.name}</p>
                    </div>
                    <div>
                        <h2>Kullanıcının Tweetleri:</h2>
                        {postData
                            .filter(item => item.userId === selectedUser + 1)
                            .map((item, index) => (
                                <div key={index}>
                                    <p>- {item.body}</p>
                                    <p>{item.date}</p>
                                </div>
                            ))}
                    </div>
                    <div>
                        <h2>İlgilenebileceğiniz Diğer Profiller</h2>
                        {userData.map((item, index) => (
                            <div key={index}>
                                <button onClick={() => setSelectedUser(index)}>
                                    <h5>{item.name}</h5>
                                </button>
                                <p>{item.address.city}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Yükleniyor...</p>
            )}
            <button>Tüm Tweetleri Gör</button>
            <button>Dashboard Sayfasına Git</button>
        </div>
    );
}

export default Profiles;
