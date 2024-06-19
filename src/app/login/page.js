"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';


  
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (err) {
            setError(err.message);
        }
    };
 
    

    return (

        <div className="custom-container container mt-5 ">
            <h1 className="text-center">Login</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-4 ">Login</button>
                <div className='d-flex justify-content-center align-items-center'>
                    <p className='align-self-center'>Create an account <span className='ms-2'><a href='/register'>Register</a></span></p>
                </div>
            </form>
        </div>

    );
};

export default Login;