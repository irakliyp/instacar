import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {login} from "../store/actions/user.actions.js";
import React from 'react'


export function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    function handleChange(event) {
        if(event.target.name === 'username') setUserName(event.target.value);
        else setPassword(event.target.value);

    }

    async function handleLogin(event) {
        event.preventDefault();
        await login({username: userName});
        nav('/home');
    }

    return <section className="login">
        <form className="login-form">
            <fieldset className="login-fieldset fieldset">
                <Link to="/" className="app-header bold">Instagram</Link>
                <div className="input">
                    <label className={`gray${userName === '' ? '' : ' show'}`}>Phone number, username, or email</label>
                    <input type="text" placeholder="Phone number, username, or email" value={userName} name="username" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label className={`gray${password === '' ? '' : ' show'}`}>Password</label>
                    <input type="text" placeholder="Password" value={password} name="password" onChange={handleChange}/>
                </div>
                <button className="btn bold " onClick={handleLogin}>Log in</button>
            </fieldset>
            <fieldset className="signin-fieldset fieldset">
                <div>Don't have an account?</div>
                <Link to="/signup">Sign up</Link>
            </fieldset>
        </form>
    </section>
}
