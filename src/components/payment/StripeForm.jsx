"use client"

import {
    PaymentElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";
  import React from "react";
import { Button } from "../ui/Button";
  
  export default function StripeForm ({ client_secret }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitPayment = async (event) => {
      event.preventDefault();
  
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        console.log(submitError);
        return;
      }
  
      const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/thank-you`,
        },
      });
  
      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        console.log(error);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };
    return (
        <div className='max-h-screen flex flex-col gap-8'>
        <div className='h-[80px] bg-white flex items-center'>
          <h2 className='text-xl lg:text-2xl ml-10 font-bold'>PentSpace</h2>
        </div>
        <div className='bg-grey-primary/10 h-screen grid grid-cols-1 place-content-center place-items-center'>
        <div className='max-w-[800px] lg:w-[800px] bg-white rounded-lg p-14'> 
          <h3 className='font-bold text-2xl lg:text-4xl'>Payment</h3>
        <form onSubmit={handleSubmitPayment} className="flex flex-col gap-4 mt-8">
            <div className="">
          <PaymentElement />
            </div>

          <Button text={"Pay"} type={"submit"} disabled={!stripe || !elements} />

        </form>
      </div>
      </div>
      </div>
    );
  };
  
