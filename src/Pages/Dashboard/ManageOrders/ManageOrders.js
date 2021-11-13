import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import useAuth from '../../../hooks/useAuth';

const ManageOrders = () => {
    const { user } = useAuth();
    const [status, setStatus] = useState([]);
    const [manageOrder, setManageOrder] = useState([]);

    const handleUpdate = id => {
        const productStatus = 'Shipped';
        setStatus(productStatus);

        const isShipped = { status };

        const url = `http://localhost:3030/orders/${id}`;
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
                    /* const remainingOrders = manageOrder.filter(order => order.status !== 'Pending');
                    setManageOrder(remainingOrders); */
                }
            })
    }

    useEffect(() => {
        const url = 'http://localhost:3030/orders';
        fetch(url)
            .then(res => res.json())
            .then(data => setManageOrder(data.orders))
    }, [user]);

    const handleDelete = id => {
        const deleteConfirm = window.confirm('Want to delete ?');
        if (deleteConfirm) {
            const url = `http://localhost:3030/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert('Order deleted successfully.');

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
                            <th>Status</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageOrder.map((order) => (<tr key={order._id} className="text-center">
                                <td>{order.email}</td>
                                <td>{order.name}</td>
                                <td>{order.product}</td>
                                <td>{order.price}</td>
                                <td>{order.address}</td>
                                <td>{order.status}</td>

                                <button onClick={() => handleUpdate(order._id)} className="bg-success text-white btn btn-danger py-1 my-1">Update</button>

                                <button onClick={() => handleDelete(order._id)} className="bg-danger text-white btn btn-danger ms-2 py-1 my-1">Delete</button>
                            </tr>))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageOrders;