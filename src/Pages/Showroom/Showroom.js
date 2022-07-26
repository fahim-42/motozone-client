import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Showroom.css';

// animation
import AOS from 'aos';
import 'aos/dist/aos.css';

const Showroom = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        // const url = 'http://localhost:3030/products';
        const url = 'https://glacial-castle-62029.herokuapp.com/products';
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data.products));
    }, []);

    //animation
    useEffect(() => {
        AOS.init();
    })
    return (
        <div className="bg-dark">
            <div className="text-center fst-italic bg-dark text-warning m-0 py-3">
                <h1 data-aos="fade-down" data-aos-duration="500">Our Collections</h1>
            </div>
            <div className="showroom-container mx-3 pb-4">
                {
                    product?.map((pd) => (
                        <div key={pd._id} className="showroom bg-white mx-3 mb-3 rounded-3 shadow-lg" data-aos="fade-up" data-aos-duration="2000">
                            <img className="w-80 border border-0 px-4" src={pd.image} alt="not found" />
                            <h2 className="text-center fw-bold fst-italic m-3">{pd.name}</h2>
                            <p className="px-4 mb-3">{pd.description}</p>
                            <h5 className="px-4 mb-3 fw-bold fst-italic mb-3">Price: {pd.price}tk</h5>
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