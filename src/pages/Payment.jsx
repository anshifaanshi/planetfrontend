import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

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

    if (!stripe || !elements) {
      return;
    }

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
      payment_method: {
        card: cardElement,
      },
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
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing} style={{ marginTop: 20 }}>
        {processing ? "Processing..." : `Pay ₹${amount / 100}`}
      </button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 10 }}>Payment successful!</div>}
    </form>
  );
};

export default function StripeCheckoutWrapper({ amount }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}
