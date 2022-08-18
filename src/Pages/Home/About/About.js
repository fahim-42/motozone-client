import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useAuth from '../../../hooks/useAuth';

// animation
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    //animation
    useEffect(() => {
        AOS.init();
    })

    //modal action
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { user } = useAuth();

    const emailRef = useRef();
    const textRef = useRef();

    const handleSubscribe = e => {
        const email = emailRef.current.value;
        const text = textRef.current.value;

        const subscribe = { email, text };

        // const url = 'http://localhost:3030/subscribe';
        const url = 'https://glacial-castle-62029.herokuapp.com/subscribe';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(subscribe)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // alert('Registered Successfully! We will be in touch with you soon.');
                    setShow(true);
                    e.target.reset();
                }
            })

        e.preventDefault();
    }
    return (
        <div className="col-lg-10 text-white mx-auto pb-5">
            <div className="text-center fst-italic bg-dark text-warning m-0 py-5">
                <h1 data-aos="fade-down" data-aos-duration="500">About Us</h1>
            </div>

            <div className="d-flex flex-wrap">
                <div className="col-lg-8 col-sm-12">
                    <h1 className="text-center my-3 fw-bolder fst-italic">MotoZone&trade;</h1>
                    <p className="fs-5 mx-5 my-3">We collect bikes from all manufacturers. We sale brand new bikes at a affordable price. We also buy and sale used bikes based on it's condition. We provide aftersales service for second-hand bikes.
                        <br></br>
                        We try to collect vintage motorcycle for out valued customers.</p>
                    <div className="fs-5 mx-5 my-3">
                        <h3 className="fw-bold fst-italic">We Ensure :</h3>
                        <ul className="ms-5 fst-italic ">
                            <li>All paperworks</li>
                            <li>Engine warranty</li>
                            <li>No hidden damage</li>
                            <li>Parts from authorized dealers</li>
                            <li>Accessories from renowned companies</li>
                        </ul>
                    </div>

                </div>
                <div className="col-lg-4 col-sm-12 bg-primary border-5 rounded-3 mx-auto" data-aos="fade-left" data-aos-duration="1000">
                    <Form onSubmit={handleSubscribe} className="mx-3 px-3 mt-3">
                        <Form.Text className="mb-1 text-dark fs-5 fw-bolder fst-italic">
                            Keep up-to-date with our newsletter !?
                            <br></br>
                            Register Now !
                        </Form.Text>
                        <Form.Group className="mt-3 mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address :</Form.Label>
                            <Form.Control
                                disabled
                                ref={emailRef}
                                defaultValue={user.email}
                                type="email"
                                placeholder="Your email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Interested topic :</Form.Label>
                            <Form.Control
                                ref={textRef}
                                placeholder="Any specific interest !!" as="textarea" rows={4} />
                        </Form.Group>
                        <Button className="mb-3" variant="warning" type="submit">Submit</Button>
                    </Form>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title className="text-center">MotoZone</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">Registered Successfully! We will be in touch with you soon.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default About;