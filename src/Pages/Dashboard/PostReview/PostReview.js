import React, { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useAuth from '../../../hooks/useAuth';

const PostReview = () => {
    //modal action
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    const { user } = useAuth();

    const emailRef = useRef();
    const reviewRef = useRef();

    const handleReviewSubmit = e => {
        const email = emailRef.current.value;
        const review = reviewRef.current.value;

        const userReview = { email, review };

        const url = 'http://localhost:3030/reviews';
        // const url = 'https://glacial-castle-62029.herokuapp.com/reviews';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userReview)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // alert('Review Posted Successfully.');
                    setShow(true);
                    e.target.reset();
                }
            })

        e.preventDefault();
    }
    return (
        <div className="col-lg-6 mx-auto my-5 border rounded-3 shadow-lg px-5 py-4">
            <div className="text-center text-danger fst-italic">
                <h2>Post review</h2>
            </div>
            <Form onSubmit={handleReviewSubmit}>
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
                    <Form.Label>Write a review :</Form.Label>
                    <Form.Control
                        ref={reviewRef}
                        placeholder="How was your experience !?" as="textarea" rows={6} required />
                </Form.Group>
                <Button variant="warning" type="submit">Submit</Button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-center">MotoZone</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">Review Posted Successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PostReview;