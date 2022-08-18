import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ orderPayment }) => {
    const { name, email, price, address } = orderPayment;
    // console.log({orderPayment});


    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [processing, setProcessing] = useState(false);

    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        // const url = 'http://localhost:3030/create-payment-intent';
        const url = 'https://glacial-castle-62029.herokuapp.com/create-payment-intent';

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
            console.log('[error]', error);
        } else {
            setError('')
            console.log('[PaymentMethod]', paymentMethod);
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
            console.log(paymentIntent);
            setSuccess('Your payment processed successfully');
            setProcessing(false);
        }
    }
    return (
        <div className="bg-light text-center">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
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
                {processing ? <Spinner animation="border" variant="primary" /> : <Button variant="primary" type="submit" disabled={!stripe}>Pay: {price} Tk</Button>}
            </form>
            {
                error && <p className="bg-danger text-white text-center">{error}</p>
            }
            {
                success && <p className="bg-success text-white text-center">{success}</p>
            }
        </div>
    );
};

export default CheckoutForm;