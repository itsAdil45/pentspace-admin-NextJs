'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from '@/components/payment/StripeForm';

export default function Stripe() {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const query = useSearchParams()
    const client_secret = query.get("client_secret")
    const options = {
        clientSecret: client_secret,
      };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <StripeForm client_secret={client_secret} />
      </Elements>
    </div>
  )
}

