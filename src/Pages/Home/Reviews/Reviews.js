import React, { useEffect, useState } from 'react';
import './Reviews.css';

const Reviews = () => {
    const [review, setReview] = useState([]);
    useEffect(() => {
        // const url = 'http://localhost:3030/reviews';
        const url = 'https://glacial-castle-62029.herokuapp.com/reviews';
        fetch(url)
            .then(res => res.json())
            .then(data => setReview(data));
    }, []);
    return (
        <div id="reviews">
            <div className="text-center fst-italic bg-dark text-white-50 m-0 py-3">
                <h2>Reviews</h2>
            </div>

            <div className="review-container mx-3 my-5">
                {
                    review?.map((rvw) => (
                        <div key={rvw._id} className="review bg-light mx-3 mb-3 border border-warning rounded-3 shadow-lg">
                            <h5 className="text-center fw-bold fst-italic mt-3">{rvw.email}</h5>
                            <p className="px-4 mb-3">{rvw.review}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Reviews;