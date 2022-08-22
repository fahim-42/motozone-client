import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MakeAdmin = () => {
    //modal action
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [email, setEmail] = useState('');

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {
        const user = { email };

        // const url = 'http://localhost:3030/users/admin';
        const url = 'https://glacial-castle-62029.herokuapp.com/users/admin';
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    setEmail('');
                    // alert('New admin successfully created.');
                    setShow(true);
                }
            })
        e.preventDefault();
    }
    return (
        <div className="col-10 col-lg-5 mx-auto my-5 border bg-light border rounded-3 shadow-lg">
            <Form onSubmit={handleAdminSubmit} className="mx-3 px-3 my-4">
                <Form.Text className="text-dark fw-bold fst-italic mb-1 fs-3">Make Admin</Form.Text>

                <Form.Group className="mt-3 mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Type user email address :</Form.Label>
                    <Form.Control onBlur={handleOnBlur} type="email" placeholder="Register user before making admin" />
                </Form.Group>

                <Button className="mb-3" variant="warning" type="submit">Confirm Admin</Button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-center">MotoZone</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">New admin added successfully !!!.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MakeAdmin;