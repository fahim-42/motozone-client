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
        <div>
            {/* <img className="w-100" style={{height:"600px"}} src="https://i.ibb.co/RcWQxYp/coming-soon.jpg" alt="payment-system" /> */}

            <h3>Please pay for: {orderPayment.product} bought my {orderPayment.name}</h3>
            <h5>Pay for: {orderPayment.price}</h5>

            {orderPayment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm orderPayment={orderPayment} />
            </Elements>}

        </div>
    );
};

export default Payment;