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
            <div className="text-center fst-italic bg-dark text-warning m-0 py-5">
                <h1>Client's Feedback</h1>
            </div>

            <div className="review-container px-5 mx-5">
                {
                    review?.map((rvw) => (
                        <div key={rvw._id} className="review bg-light mx-3 mb-3 border-0 rounded shadow-lg">
                            <h6 className="text-center text-white px-2 py-3 m-3 border-1 bg-secondary rounded-pill">{rvw.email}</h6>
                            <p className="px-4">{rvw.review}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Reviews;