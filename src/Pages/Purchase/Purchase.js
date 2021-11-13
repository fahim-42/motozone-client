import React, { useRef, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router';
import useAuth from './../../hooks/useAuth';

const Purchase = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [details, setDetails] = useState([]);
    useEffect(() => {
        // const url = `http://localhost:3030/products?pdt=${id}`;
        const url = `https://glacial-castle-62029.herokuapp.com/products?pdt=${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setDetails(data.queryProductInfo));
    }, [id]);

    const nameRef = useRef();
    const emailRef = useRef();
    const productRef = useRef();
    const priceRef = useRef();
    const addressRef = useRef();
    const mobileRef = useRef();

    const handlePurchase = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const product = productRef.current.value;
        const price = priceRef.current.value;
        const address = addressRef.current.value;
        const mobile = mobileRef.current.value;
        const status = "Pending";

        const purchaseInfo = { name, email, product, price, address, mobile, status };

        // const url = 'http://localhost:3030/orders';
        const url = 'https://glacial-castle-62029.herokuapp.com/orders';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(purchaseInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Purchase order submitted.');
                    e.target.reset();
                }
            })

        e.preventDefault();
    }
    return (
        <div className="col-lg-6 my-2 mx-auto border-0 rounded-3">
            <div className="text-center text-danger fst-italic m-0 py-3">
                <h2>Purchase Information</h2>
            </div>

            <Form onSubmit={handlePurchase} className="row g-3 mt-3 mx-5 p-3 border border-2 shadow-lg">
                <Form.Group className="mb-1" controlId="formBasicName">
                    <Form.Label>Username :</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        ref={nameRef}
                        value={user.displayName}
                        placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Email address :</Form.Label>
                    <Form.Control
                        disabled
                        type="email"
                        ref={emailRef}
                        value={user.email}
                        placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicProduct">
                    <Form.Label>Selected Product :</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        ref={productRef}
                        value={details[0]?.name}
                        placeholder="Product name" />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicPrice">
                    <Form.Label>Selected Product Price:</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        ref={priceRef}
                        value={details[0]?.price}
                        placeholder="Price of the product" />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicAddress">
                    <Form.Label>Current Address :</Form.Label>
                    <Form.Control
                        type="text"
                        ref={addressRef}
                        placeholder="Local area, street name etc." />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicMobile">
                    <Form.Label>Mobile number :</Form.Label>
                    <Form.Control
                        type="number"
                        ref={mobileRef}
                        placeholder="Your mobile number" />
                </Form.Group>
                <Button variant="warning" type="submit">Buy Now</Button>
            </Form>
        </div>
    )
};
export default Purchase;