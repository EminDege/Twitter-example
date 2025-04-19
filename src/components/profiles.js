import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profiles(props) {
    const { userData, postData } = props;
    const [selectedUser, setSelectedUser] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        if (userData && userId) {
            const userSelect = userData.find(user => Number(user.id) === Number(userId));
            setSelectedUser(userSelect);
        }
    }, [userId, userData]);

    return (
        <div>
            {userData ? (
                <div className='profiles'>
                    <section style={{ width: '60%', minWidth: '250px', marginRight: '20px' }}>
                        <div className='profilfeatures'>
                            {selectedUser && (
                                <>
                                    <h3 className='mb-3' style={{width:"80%"}}>
                                        {selectedUser.name} 
                                        <small className="text-muted ml-3">Kişisinin Profiline Göz At!</small>
                                    </h3>
                                    <p><span>Kullanıcı Adı:</span> {selectedUser.username}</p>
                                    <p><span>Şehir:</span> {selectedUser.address.city}</p>
                                    <p><span>Email:</span> {selectedUser.email}</p>
                                    <p><span>Yaş:</span> {selectedUser.age}</p>
                                    <p><span>Cinsiyet:</span> {selectedUser.gender}</p>
                                    <p><span>Tel:</span> {selectedUser.phone}</p>
                                    <p><span>Website:</span> {selectedUser.website}</p>
                                    <p><span>Şirket:</span> {selectedUser.company.name}</p>
                                </>
                            )}
                        </div>
                        <div>
                            <h2 className='my-4'>Kullanıcının Tweetleri:</h2>
                            {selectedUser && postData
                                .filter(item => String(item.userId) === String(selectedUser.id))
                                .map((item) => (
                                    <div key={item.id}>
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
                                <div className='otherProfiles ' key={index}>
                                    <li className='mb-0' onClick={() => setSelectedUser(item)}>
                                        <h5>{item.name}</h5>
                                    </li>
                                    <p className='pale mb-4'>{item.address.city}</p>
                                </div>
                            ))}
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
