import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import useAuth from '../../../hooks/useAuth';

const MyOrders = () => {
    const { user } = useAuth();
    const email = user.email;

    const [myOrder, setMyOrder] = useState([]);

    useEffect(() => {
        // const url = `http://localhost:3030/orders?email=${email}`;
        const url = `https://glacial-castle-62029.herokuapp.com/orders?email=${email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setMyOrder(data.myOrderInfo))
    }, [email]);

    const handleDelete = id => {
        const deleteConfirm = window.confirm('Want to delete ?');
        if (deleteConfirm) {

            // const url = `http://localhost:3030/orders/${id}`;
            const url = `https://glacial-castle-62029.herokuapp.com/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert('Order deleted successfully.');

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
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrder.map((order) => (<tr key={order._id} className="text-center">
                                <td>{order.email}</td>
                                <td>{order.name}</td>
                                <td>{order.product}</td>
                                <td>{order.price}</td>
                                <td>{order.address}</td>
                                <button onClick={() => handleDelete(order._id)} className="bg-danger text-white btn btn-danger py-1 my-1">Delete</button>
                            </tr>))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default MyOrders;