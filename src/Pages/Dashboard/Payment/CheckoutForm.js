import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ orderPayment }) => {
    const { _id, name, email, price, address } = orderPayment;
    // console.log({orderPayment});


    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [processing, setProcessing] = useState(false);

    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        const url = 'http://localhost:3030/create-payment-intent';
        // const url = 'https://glacial-castle-62029.herokuapp.com/create-payment-intent';

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setSuccess('');
            setError(error.message);
            // console.log('[error]', error);
        } else {
            setError('')
            // console.log('[PaymentMethod]', paymentMethod);
        }

        //payment-intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                        address: address
                    },
                },
            },
        );
        if (intentError) {
            setSuccess('');
            setError(intentError.message);
        }
        else {
            setError('');
            // console.log(paymentIntent);
            setSuccess('Your payment processed successfully');
            setProcessing(false);
        }

        //set to database
        const payment = {
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            last4: paymentMethod.card.last4,
            transaction: paymentIntent.client_secret.slice('_secret')[0]
        }
        // console.log(payment);

        const url = `http://localhost:3030/orders/${_id}`;
        // const url = `https://glacial-castle-62029.herokuapp.com/orders/${_id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payment)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }
    return (
        <div className="bg-light text-center col-lg-8 mx-auto border border-dark rounded mb-5">
            <form onSubmit={handleSubmit}>
                <CardElement className="m-3"
                    options={{
                        style: {
                            base: {
                                fontSize: '18px',
                                // color: '#424770',
                                color: '#000000',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <br />
                {processing ? <Spinner animation="border" variant="primary" /> : <Button variant="primary" type="submit" className="m-3" disabled={!stripe || success}>Pay: {price} Tk</Button>}
            </form>
            {
                error && <p className="bg-danger text-white text-center fw-bold py-3 mb-0">{error}</p>
            }
            {
                success && <p className="text-success text-center fw-bold py-3 mb-0">{success}</p>
            }
        </div>
    );
};

export default CheckoutForm;