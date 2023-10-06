import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Login(props) {
    const { loginSuccess, setLoginSuccess } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const handleLogin = () => {
        if (username === 'kullanici' && password === '12345678') {
            setLoginSuccess(true);
            setLoginMessage('Giriş başarılı!');
            setUsername('');
            setPassword('');
        } else {
            setLoginSuccess(false);
            setLoginMessage("Giriş başarısız. Lütfen kullanıcı adı ve şifreyi kontrol ediniz! Eğer bilmiyorsanız Readme dosyasına bakınız!");
        }
    };

    return (
        <div className='login'>
            <div style={{ height: '300px' }}>
                <h2 className='mb-4 '>Giriş Yap</h2>
                <div className="loginInput">
                    <label htmlFor='userName'>Kullanıcı Adı:</label> <br />
                    <input
                        id='userName'
                        type="text"
                        placeholder='örn:kullanici'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="loginInput my-3">
                    <label htmlFor='password'>Şifre:</label><br />
                    <input
                        id='password'
                        type="password"
                        placeholder='örn:12345678'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' ? handleLogin() : null}
                    />
                </div>
                <button className='my-2' onClick={handleLogin}>Giriş Yap</button>
                <p style={{ color: loginSuccess ? 'green' : 'red' }}>{loginMessage}</p>
            </div>
            {loginSuccess && <Navigate to="/dashboard" />}
        </div>
    );
}

export default Login;
