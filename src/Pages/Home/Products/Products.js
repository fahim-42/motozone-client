import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:3030/products';
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data.products));
    }, []);
    return (
        <div>
            <div className="text-center fst-italic bg-dark text-white-50 m-0 py-3">
                <h2>All Products</h2>
            </div>
            <div className="product-container mx-3 my-5">
                {
                    product?.slice(0,6).map((pd) => (
                        <div key={pd._id} className="product bg-light mx-3 mb-3 border border-warning rounded-3 shadow-lg">
                            <h2 className="text-center fw-bold fst-italic mt-3">{pd.name}</h2>
                            <img className="w-80 border border-0 p-1 mb-1" src={pd.image} alt="not found" />
                            <h5 className="px-4 mb-3 fw-bold fst-italic mb-3">Price: {pd.price}tk</h5>
                            <p className="px-4 mb-3">{pd.description}</p>
                            <Link to={`/purchase/${pd._id}`}>
                                <button className="btn btn-warning fw-bold mb-4 ms-4">Buy Now</button>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Products;