import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const ManageProducts = () => {
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
                        alert('Order deleted successfully.');

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
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageProduct.map((pd) => (<tr key={pd._id} className="text-center">
                                <td>{pd._id}</td>
                                <td>{pd.name}</td>
                                <td>{pd.price}</td>
                                <button onClick={() => handleDelete(pd._id)} className="bg-danger text-white btn btn-danger py-1 my-1">Delete</button>
                            </tr>))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageProducts;