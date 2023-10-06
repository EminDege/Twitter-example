import React, { useState } from 'react';

function Profiles(props) {
    const { userData, postData } = props;
    const [selectedUser, setSelectedUser] = useState(0);

    return (
        <div>
            {userData ? (
                <div className='profiles'>
                    <section style={{ width: '60%', minWidth: '250px', marginRight: '20px' }}>
                        <div className='profilfeatures'>
                            <h3 className='mb-5'>{userData[selectedUser].name} Kişisinin Profile Göz At!</h3>
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
                            <h2 className='my-4'>Kullanıcının Tweetleri:</h2>
                            {postData
                                .filter(item => item.userId === selectedUser + 1)
                                .map((item, index) => (
                                    <div key={index}>
                                        <p>- {item.body}</p>
                                        <p className='pale'>{item.date}</p>
                                    </div>
                                ))}
                        </div>
                    </section>
                    <section className='divBorder' style={{ width: '25%', minWidth: '250px', textAlign: 'center' }}>
                        <div>
                            <h3 className='mb-5'>İlgilenebileceğiniz Diğer Profiller</h3>
                            {userData.map((item, index) => (
                                <div className='otherProfiles' key={index}>
                                    <li onClick={() => setSelectedUser(index)}>
                                        <h5>{item.name}</h5>
                                    </li>
                                    <p className='pale'>{item.address.city}</p>
                                </div>
                            ))}
                        </div>
                        <div className='dashButtons'>
                            <div >
                                <button className='my-4 '>Tüm Tweetleri Gör</button> <br />
                                <button>Dashboard Sayfasına Git</button>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <p>Yükleniyor...</p>
            )}

        </div>
    );
}

export default Profiles;
