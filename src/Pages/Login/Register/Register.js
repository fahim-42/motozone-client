import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';

// animation
import AOS from 'aos';
import 'aos/dist/aos.css';

const Register = () => {
    const { user, registerUser, isLoading, authError } = useAuth();

    const [loginData, setLoginData] = useState({});

    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleRegister = e => {
        if (loginData?.password !== loginData?.password2) {
            alert('Both password did not matched. Try again.');
            return
        }
        registerUser(loginData?.email, loginData?.password, loginData?.name, history);
        e.preventDefault();
    }

    //animation
    useEffect(() => {
        AOS.init();
    })
    return (
        <div className="bg-dark py-5">
            <div className="bg-light col-lg-5 col-sm-6 mx-auto border rounded-3 shadow-lg p-3" data-aos="zoom-out-down" data-aos-duration="1500">
                <h3 className="fw-light fst-italic text-center my-3">User Registration</h3>
                <Form className="px-3" onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text"
                            placeholder="Your Name"
                            name="name"
                            onBlur={handleOnBlur} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                            placeholder="Your Email"
                            name="email"
                            onBlur={handleOnBlur} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Type Password"
                            name="password"
                            onBlur={handleOnBlur} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Label>Retype Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Retype Your Password"
                            name="password2"
                            onBlur={handleOnBlur} />
                    </Form.Group>
                    <Button variant="warning" type="submit">Register</Button>
                </Form>
                <div className="mx-auto text-center">
                    {isLoading && <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}

                    {user?.email && <div className="alert alert-success" role="alert">Registered successfully!
                    </div>}

                    {authError && <div className="alert alert-danger" role="alert">{authError}
                    </div>}
                </div>
                <NavLink className="text-decoration-none" to="/login">
                    <p className="text-center fw-bold my-3">Already Registered? Please Login.</p>
                </NavLink>
            </div >
        </div>
    );
};

export default Register;