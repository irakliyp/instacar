import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {login, signup} from "../store/actions/user.actions.js";


export function SignIn() {
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    function handleChange(event) {
        if(event.target.name === 'username') setUserName(event.target.value);
        else if(event.target.name === 'password') setPassword(event.target.value);
        else setFullName(event.target.value);

    }

    async function handleLogin(event) {
        event.preventDefault();
        await signup({username: userName, fullname: fullName, password: password});
        await login({username: userName});
        nav('/home');
    }

    return <section className="login">
        <form className="login-form">
            <fieldset className="login-fieldset fieldset">
                <Link to="/" className="app-header bold">Instagram</Link>
                <div className="input">
                    <label className={`gray${fullName === '' ? '' : ' show'}`}>Full Name</label>
                    <input type="text" placeholder="Full Name" value={fullName} name="fullname" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label className={`gray${userName === '' ? '' : ' show'}`}>Username</label>
                    <input type="text" placeholder="Username" value={userName} name="username" onChange={handleChange}/>
                </div>
                <div className="input">
                    <label className={`gray${password === '' ? '' : ' show'}`}>Password</label>
                    <input type="text" placeholder="Password" value={password} name="password" onChange={handleChange}/>
                </div>
                <button className="btn bold " onClick={handleLogin}>Sign up</button>
            </fieldset>
            <fieldset className="signin-fieldset fieldset">
                <div>Have an account?</div>
                <Link to="/login">Log in</Link>
            </fieldset>
        </form>
    </section>
}
