import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';

// Initialize Stripe outside of component render
const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    // Call backend to create payment intent
    const res = await fetch('https://planet-coki.onrender.com/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await res.json();
    const cardElement = elements.getElement(CardElement);

    // Confirm card payment with Stripe
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      setSuccess(true);
      setProcessing(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '450px' }}>
        <h4 className="text-center mb-4">Checkout</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 p-2 border rounded">
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!stripe || processing}
          >
            {processing ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              `Pay ₹${amount / 100}`
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success mt-3" role="alert">
            Payment successful! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default function StripeCheckoutWrapper({ amount }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}
