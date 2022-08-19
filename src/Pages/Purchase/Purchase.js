import React, { useRef, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router';
import useAuth from './../../hooks/useAuth';

// animation
import AOS from 'aos';
import 'aos/dist/aos.css';

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
        // const status = "Pending";

        const purchaseInfo = { name, email, product, price, address, mobile };
        // const purchaseInfo = { name, email, product, price, address, mobile, status };

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
                    e.target.reset();
                }
            })

        e.preventDefault();
    }

    //animation
    useEffect(() => {
        AOS.init();
    })
    return (
        <div className="bg-dark py-4">
            <div className="text-center fst-italic bg-dark text-warning m-0 py-2">
                <h2 data-aos="fade-down" data-aos-duration="500">Purchase Information</h2>
            </div>
            <Form onSubmit={handlePurchase} className="bg-white col-lg-5 row g-4 rounded-3 shadow-sm mx-auto my-3 px-4 pb-4" data-aos="zoom-in-up" data-aos-duration="2000">
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
                        type="number"
                        ref={priceRef}
                        value={details[0]?.price}
                        placeholder="Price of the product" />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicAddress">
                    <Form.Label>Current Address :</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        ref={addressRef}
                        placeholder="Local area, street name etc." />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicMobile">
                    <Form.Label>Mobile number :</Form.Label>
                    <Form.Control
                        required
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