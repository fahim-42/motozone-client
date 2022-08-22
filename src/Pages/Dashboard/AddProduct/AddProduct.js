// import React, { useState, useRef } from 'react';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

const AddProduct = () => {
    //modal actions
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    //catch data
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');

    /*const nameRef = useRef();
    const imageRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();*/

    const handleAddProduct = e => {
        /*const name = nameRef.current.value;
        const image = imageRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;

        const newProduct = { name, image, price, description }*/

        if (!image) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('price', price);
        formData.append('description', description);

        // const url = 'http://localhost:3030/products';
        const url = 'https://glacial-castle-62029.herokuapp.com/products';

        /*fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })*/

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // alert('New Product Added Successfully.');
                    setShow(true);
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
                        // ref={nameRef}
                        onChange={e => setName(e.target.value)}
                        placeholder="Company, Model name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Product image url :</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        // ref={imageRef}
                        onChange={e => setImage(e.target.files[0])}
                        placeholder="Product image" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicProductPrice">
                    <Form.Label>Product Price:</Form.Label>
                    <Form.Control
                        type="number"
                        // ref={priceRef}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="Ex: 130000 without any separator or unit" />
                </Form.Group>
                <Form.Group className="mt-3 mb-3" controlId="formBasicProductPrice">
                    <Form.Label>Product description:</Form.Label>
                    <Form.Control
                        type="text"
                        // ref={descriptionRef}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Product description" />
                </Form.Group>
                <Button variant="warning" type="submit">Add Product</Button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-center">MotoZone</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">New product added in showroom!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddProduct;