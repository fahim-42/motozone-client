import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        // const url = 'http://localhost:3030/products';
        const url = 'https://glacial-castle-62029.herokuapp.com/products';
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data.products));
    }, []);
    return (
        <div>
            <div className="text-center fst-italic bg-dark text-warning m-0 py-5">
                <h1>New Arrivals !!!</h1>
            </div>
            <div className="product-container px-5 mx-5">
                {
                    product?.slice(0, 6).map((pd) => (
                        <div key={pd._id} className="product bg-light mx-lg-3 mb-3 border-0 rounded shadow shadow-lg">
                            <img className="w-70" src={pd.image} alt="not found" />
                            <h3 className="fw-bold text-center px-4 pb-2">{pd.name}</h3>
                            <div className="d-flex align-items-center pb-3 text-center">
                                <h6 className="col-6 fst-small ps-4">Price: {pd.price}tk</h6>
                                <Link to="/showroom" className="col-6">
                                    <Button variant="link fw-bold" size="sm">Learn more</Button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Products;