import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../../contextApi/AuthContext";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  console.log(id);
  const navigate = useNavigate();

  const {
    data: paymentBooing = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paymentBookingId", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/booking/${id}`);
      return res.data;
    },
  });
  console.log(paymentBooing);
  const amount = paymentBooing.price;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    // step- 1: validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment method eroor", error);
    } else {
      console.log("payment method", paymentMethod);

      const res = await axios.post(
        "http://localhost:8000/create-payment-intent",
        {
          amountInCents,
          id,
        }
      );
      console.log("res form instant", res);

      const clientSecret = res.data.clientSecret;

      // step-3: confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("payment successfully");
          console.log(result);

          const paymentData = {
            id,
            email: user?.email,
            amount,
            transactionId: result.paymentIntent.id,
          };

          const paymentRes = await axios.post(
            "http://localhost:8000/payments",
            { paymentData }
          );
          console.log(paymentRes.data);
          if (paymentRes.data.insertedId) {
            Swal.fire({
              title: "Payment Successful!",
              text: "Your payment was processed successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
            navigate("/dashboard/approved/booking");
          }
        }
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-auto space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Complete Your Payment
        </h2>

        <div className="border border-gray-300 p-4 rounded-md shadow-sm bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#e53e3e",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full disabled:opacity-50"
        >
          Pay Now {paymentBooing.price} tk
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
