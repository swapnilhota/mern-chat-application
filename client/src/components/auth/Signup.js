import React, { useState } from 'react'

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = fetch('http://localhost:5000/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="row">
                <form className="col s12" onSubmit={submitHandler} >
                    <div className="row">
                        <div className="input-field col s12">
                            <input value={name} onChange={e => setName(e.target.value)} id="name" type="text" className="validate" />
                            <div className="name error red-text" ></div>
                            <label htmlFor="name">Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" className="validate" />
                            <div className="email error red-text" ></div>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" className="validate" />
                            <div className="password error red-text" ></div>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <button className="btn" >Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
