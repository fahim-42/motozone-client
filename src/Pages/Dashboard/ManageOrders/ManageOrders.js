import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import useAuth from '../../../hooks/useAuth';

const ManageOrders = () => {
    //modal action
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    const { user } = useAuth();
    // const [status, setStatus] = useState([]);
    const [manageOrder, setManageOrder] = useState([]);

    /*const handleUpdate = id => {
        const productStatus = 'Shipped';
        setStatus(productStatus);

        const isShipped = { status };

        // const url = `http://localhost:3030/orders/${id}`;
        const url = `https://glacial-castle-62029.herokuapp.com/orders/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(isShipped)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    alert('Order Status updated');

                    window.location.reload();
                    // const remainingOrders = manageOrder.filter(order => order.status !== 'Pending');
                    // setManageOrder(remainingOrders);
                }
            })
    }*/

    useEffect(() => {
        const url = 'http://localhost:3030/orders';
        // const url = 'https://glacial-castle-62029.herokuapp.com/orders';
        fetch(url)
            .then(res => res.json())
            .then(data => setManageOrder(data.orders))
    }, [user]);

    const handleDelete = id => {
        const deleteConfirm = window.confirm('Want to delete ?');
        if (deleteConfirm) {
            const url = `http://localhost:3030/orders/${id}`;
            // const url = `https://glacial-castle-62029.herokuapp.com/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        // alert('Order deleted successfully.');
                        setShow(true);

                        const remainingOrders = manageOrder.filter(order => order._id !== id);
                        setManageOrder(remainingOrders);
                    }
                })
        }
    }
    return (
        <div className="col-lg-12 col-sm-12">
            <h2 className="text-center fw-bold fst-italic my-3">Manage All Orders</h2>
            <div className="col-lg-11 col-11 mx-auto bg-light border rounded-3 shadow-lg mt-4 mb-5 overflow-auto">
                <Table className="px-5 m-0" bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>Email</th>
                            <th>Name</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Address</th>
                            {/* <th>Status</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageOrder.map((order) => (<tr key={order._id} className="text-center">
                                <td className="align-middle text-center">{order.email}</td>
                                <td className="align-middle text-center">{order.name}</td>
                                <td className="align-middle text-center">{order.product}</td>
                                <td className="align-middle text-center">{order.price}</td>
                                <td className="align-middle text-center">{order.address}</td>
                                {/* <td className="align-middle text-center">{order.status}</td> */}
                                <td>
                                    {/* <Button variant="outline-success" className="py-1 my-1" onClick={() => handleUpdate(order._id)}>Update Status</Button> */}
                                    <Button variant="danger" className=" ms-3 py-1 my-1" onClick={() => handleDelete(order._id)}>Delete</Button>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </Table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">MotoZone</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">Order deleted successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageOrders;