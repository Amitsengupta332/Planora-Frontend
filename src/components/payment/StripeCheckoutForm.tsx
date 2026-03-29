"use client";

import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { confirmPayment } from "@/services/payment";

type Props = {
  participationId: string;
  onSuccess?: () => void;
};

export default function StripeCheckoutForm({
  participationId,
  onSuccess,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        setError(result.error.message || "Payment failed");
        return;
      }

      const paymentIntent = result.paymentIntent;

      if (!paymentIntent) {
        setError("Payment intent not found");
        return;
      }

      if (paymentIntent.status !== "succeeded") {
        setError(`Payment status: ${paymentIntent.status}`);
        return;
      }

      const confirmRes = await confirmPayment({
        participationId,
        transactionId: paymentIntent.id,
      });

      if (confirmRes.success) {
        setSuccessMessage("Payment completed successfully");
        onSuccess?.();
      } else {
        setError(confirmRes.message || "Payment confirmation failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      {error && <p className="text-sm text-red-500">{error}</p>}
      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}