"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, doc, setDoc } from '../firebase';
import '../globals.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });

            // Save user info to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                createdAt: new Date()
            });

            router.push('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="custom-container container mt-5">
            <h1 className="text-center">Register</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleRegister}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
                <div className='d-flex justify-content-center align-items-center'>
                    <p className='align-self-center'>Already have an account <span className='ms-2'><a href='/login'>Login</a></span></p>

                </div>
            </form>
        </div>
    );
};

export default Register;