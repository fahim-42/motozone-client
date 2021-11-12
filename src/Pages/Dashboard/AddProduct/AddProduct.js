import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

const AddProduct = () => {
    const nameRef = useRef();
    const imageRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    const handleAddProduct = e => {
        const name = nameRef.current.value;
        const image = imageRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;

        const newProduct = { name, image, price, description }

        const url = 'http://localhost:3030/products';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('New Product Added Successfully.');
                    e.target.reset();
                }
            })
        e.preventDefault();
    }
    return (
        <div className="col-10 col-lg-5 mx-auto my-5 border bg-light border rounded-3 shadow-lg">
            <Form onSubmit={handleAddProduct} className="mx-3 px-3 my-4">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Product name :</Form.Label>
                    <Form.Control
                        type="text"
                        ref={nameRef}
                        placeholder="Company, Model name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Product image url :</Form.Label>
                    <Form.Control
                        type="text"
                        ref={imageRef}
                        placeholder="Product image url" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicProductPrice">
                    <Form.Label>Product Price:</Form.Label>
                    <Form.Control
                        type="text"
                        ref={priceRef}
                        placeholder="Ex: 1,30,000" />
                </Form.Group>
                <Form.Group className="mt-3 mb-3" controlId="formBasicProductPrice">
                    <Form.Label>Product descripotion:</Form.Label>
                    <Form.Control
                        type="text"
                        ref={descriptionRef}
                        placeholder="Product description" />
                </Form.Group>
                <Button variant="warning" type="submit">Add Product</Button>
            </Form>
        </div>
    );
};

export default AddProduct;