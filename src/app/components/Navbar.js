import React from 'react'
import Link from 'next/link';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light p-4 shadow-sm p-3 mb-5 navbar--color rounded">
                <div className="container-fluid">
                    <a className="navbar-brand " href="/"><div className='h3 fw-bold'>TodoApp</div></a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li class="nav-item pe-3">
                                <a class="nav-link" href="/login"><div className='fw-bold h5'>Login</div></a>
                            </li>
                            <li class="nav-item pe-3">
                                <a class="nav-link" href="/register"><div className='fw-bold h5'>Register</div></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>

    )
}

export default Navbar
