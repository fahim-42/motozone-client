import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

const ManageProducts = () => {
    //modal action
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    const [manageProduct, setManageProduct] = useState([]);

    useEffect(() => {
        // const url = 'http://localhost:3030/products';
        const url = 'https://glacial-castle-62029.herokuapp.com/products';
        fetch(url)
            .then(res => res.json())
            .then(data => setManageProduct(data.products))
    }, []);

    const handleDelete = id => {
        const deleteConfirm = window.confirm('Want to delete ?');
        if (deleteConfirm) {
            // const url = `http://localhost:3030/products/${id}`;
            const url = `https://glacial-castle-62029.herokuapp.com/products/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        // alert('Product deleted successfully.');
                        setShow(true);

                        const remainingOrders = manageProduct.filter(order => order._id !== id);
                        setManageProduct(remainingOrders);
                    }
                })
        }
    }
    return (
        <div className="col-lg-12 col-sm-12">
            <h2 className="text-center fw-bold fst-italic my-3">Manage All Products</h2>
            <div className="col-lg-11 col-11 mx-auto bg-light border rounded-3 shadow-lg mt-4 mb-5 overflow-auto">
                <Table className="px-5 m-0" bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageProduct.map((pd) => (<tr key={pd._id} className="text-center">
                                <td><img className="img-fluid align-middle text-center" width="120" src={`data:image/*;base64,${pd.image}`} alt="not found" /></td>
                                <td className="align-middle text-center">{pd.name}</td>
                                <td className="align-middle text-center">{pd.price}</td>
                                <td className="align-middle text-center">
                                    <Button variant="danger" className=" ms-3 py-1 my-1" onClick={() => handleDelete(pd._id)}>Delete</Button>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </Table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-center">MotoZone</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">Product deleted successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageProducts;