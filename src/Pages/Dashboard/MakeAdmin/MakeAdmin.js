import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const MakeAdmin = () => {
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
                    alert('New admin successfully created.');
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
        </div>
    );
};

export default MakeAdmin;