import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Showroom.css';

const Showroom = () => {
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
            <div className="text-center text-primary fst-italic m-0 py-3">
                <h2>Explore Showroom</h2>
            </div>
            <div className="showroom-container mx-3 mb-5">
                {
                    product?.map((pd) => (
                        <div key={pd._id} className="showroom bg-light mx-3 mb-3 border border-warning rounded-3 shadow-sm">
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

export default Showroom;