"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { auth ,db } from '../firebase';
import { signInWithEmailAndPassword , onAuthStateChanged} from 'firebase/auth';
import {getDoc,doc} from 'firebase/firestore';
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
            
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", "user.uid"));
            console.log("userId",user.uid);
            if(userDoc.exists()){
                const userProfile = userDoc.data();
                if(userProfile.role==='admin'){
                    router.push('/admin');
                }else{
                    router.push('/');
                }
            }else{
                throw new Error(
                    "No user found"
                )
            }

           
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