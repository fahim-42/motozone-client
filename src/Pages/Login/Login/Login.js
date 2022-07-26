import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';

// animation
import AOS from 'aos';
import 'aos/dist/aos.css';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, signInWithGoogle, isLoading, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData?.email, loginData?.password, location, history);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history)
    }
    
    //animation
    useEffect(() => {
        AOS.init();
    })
    return (
        <div className="bg-dark py-5">
            <div className="bg-light col-lg-4 col-sm-6 mx-auto border rounded-3 shadow-lg p-3" data-aos="zoom-out-down" data-aos-duration="1500">
                <h3 className="fw-light fst-italic text-center my-3">User Login</h3>
                <Form className="px-3" onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                            placeholder="Your Email"
                            name="email"
                            onChange={handleOnChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Your Password"
                            name="password"
                            onChange={handleOnChange} />
                    </Form.Group>
                    <Button variant="warning" type="submit">Sign in</Button>
                </Form>


                <NavLink className="text-decoration-none" to="/register">
                    <p className="text-center fw-bold my-3">New User? First register, please.</p>
                </NavLink>

                <div className="mx-auto text-center">
                    {isLoading && <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}

                    {user?.email && <div className="alert alert-success" role="alert">Login successfully!
                    </div>}

                    {authError && <div className="alert alert-danger" role="alert">{authError}
                    </div>}

                    <hr />

                    <Button variant="info" onClick={handleGoogleSignIn}>Sign in using Google</Button>
                </div>

            </div >
        </div>
    );
};

export default Login;