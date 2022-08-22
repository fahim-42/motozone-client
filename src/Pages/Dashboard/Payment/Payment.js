import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51JwRp6F3MhxUoycP2Qjt2BhmlJecQU68n6RuiWvuj0hLMpbftiEk2bkFHUP570TRzQ8L2DTkjQsZepaWXmGzPilN00xjPl8LTM');

const Payment = () => {
    const { orderId } = useParams();

    const [orderPayment, setOrderPayment] = useState({});
    useEffect(() => {
        // const url = `http://localhost:3030/orders/${orderId}`;
        const url = `https://glacial-castle-62029.herokuapp.com/orders/${orderId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setOrderPayment(data));
    }, [orderId])
    return (
        <div className="col-10 mx-auto mt-5 text-center">
            {/* <img className="w-100" style={{height:"600px"}} src="https://i.ibb.co/RcWQxYp/coming-soon.jpg" alt="payment-system" /> */}

            <div className="mb-5">
                <h4 className="text-primary fw-bold">Client Name: {orderPayment.name}</h4>
                <h4 className="text-success fw-bold">Email: {orderPayment.email}</h4>
                <br />
                <div className="text-danger fw-bold fst-italic">
                    <h5>Product: {orderPayment.product}</h5>
                    <h6>Amount to be paid: {orderPayment.price} tk</h6>
                </div>
            </div>

            {orderPayment?.price && <Elements stripe={stripePromise} className="mb-5">
                <CheckoutForm orderPayment={orderPayment} />
            </Elements>}

        </div>
    );
};

export default Payment;