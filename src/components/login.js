import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLogin = () => {
        if (username === 'kullanici' && password === 'sifre') {
            setLoginSuccess(true);
            setLoginMessage('Giriş başarılı!');
        } else {
            setLoginSuccess(false);
            setLoginMessage('Giriş başarısız. Lütfen kullanıcı adı ve şifreyi kontrol edin !');
        }
    };

    return (
        <div style={{ height: '300px' }}>
            <h2 className='mb-4 '>Giriş Yap</h2>
            <div className="loginInput">
                <label htmlFor='userName'>Kullanıcı Adı:</label> <br />
                <input
                    id='userName'
                    type="text"
                    placeholder='örn:kullanıcı55'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="loginInput my-3" style={{ position: 'relative' }}>
                <label htmlFor='password'>Şifre:</label><br />
                <input
                    id='password'
                    type="password"
                    placeholder='örn:12345678'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' ? handleLogin() : null}
                />
                <span style={{ position: 'absolute', left: '149px', top: '34px' }}>
                    {/* <button style={{ border: 'none', backgroundColor: '#fff', height: '26x', outline: 'none' }}> <AiFillEyeInvisible size={25} color='#000' /></button> */}
                </span>
            </div>

            <button className='my-2' onClick={handleLogin}>Giriş Yap</button>
            <p style={{ color: loginSuccess ? 'green' : 'red' }}>{loginMessage}</p>
        </div>
    );
}

export default Login;
