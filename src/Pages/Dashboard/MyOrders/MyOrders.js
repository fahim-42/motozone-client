import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const MyOrders = () => {
    //modal action
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    const { user } = useAuth();
    const email = user.email;

    const [myOrder, setMyOrder] = useState([]);

    useEffect(() => {
        const url = `http://localhost:3030/orders?email=${email}`;
        // const url = `https://glacial-castle-62029.herokuapp.com/orders?email=${email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setMyOrder(data.myOrderInfo))
    }, [email]);

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
                        setShow(true)

                        const remainingOrders = myOrder.filter(order => order._id !== id);
                        setMyOrder(remainingOrders);
                    }
                })
        }
    }
    return (
        <div className="col-lg-12 col-sm-12">
            <h2 className="text-center fw-bold fst-italic my-3">My Orders</h2>
            <div className="col-lg-11 col-11 mx-auto bg-light border rounded-3 shadow-lg mt-4 mb-5 overflow-auto">
                <Table className="px-5 m-0" bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>Email</th>
                            <th>Name</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Address</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrder.map((order) => (<tr key={order._id} className="text-center">
                                <td className="align-middle text-center">{order.email}</td>
                                <td className="align-middle text-center">{order.name}</td>
                                <td className="align-middle text-center">{order.product}</td>
                                <td className="align-middle text-center">{order.price}</td>
                                <td className="align-middle text-center">{order.address}</td>

                                <td className="align-middle text-center">
                                {order.payment ? 'Paid' :
                                    <Link to={`/dashboard/payment/${order._id}`}>
                                        <Button variant="primary">Pay</Button>
                                    </Link>}
                                </td>

                                <td className="align-middle text-center">
                                    <Button variant="danger" onClick={() => handleDelete(order._id)}>Delete</Button>
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

export default MyOrders;