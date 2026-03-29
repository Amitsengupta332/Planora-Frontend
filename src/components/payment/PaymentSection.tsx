"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { createPaymentIntent } from "@/services/payment";
import StripeCheckoutForm from "./StripeCheckoutForm";

type PaymentSectionProps = {
  participationId: string;
  onSuccess?: () => void;
};

export default function PaymentSection({
  participationId,
  onSuccess,
}: PaymentSectionProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const initPayment = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await createPaymentIntent({ participationId });

        if (res.success) {
          setClientSecret(res.data.clientSecret);
          setAmount(res.data.amount);
        } else {
          setError(res.message || "Failed to initialize payment");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize payment"
        );
      } finally {
        setLoading(false);
      }
    };

    if (participationId) {
      initPayment();
    }
  }, [participationId]);

  if (loading) {
    return (
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">Preparing payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border p-4">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!clientSecret) return null;

  return (
    <div className="rounded-xl border p-4">
      <div className="mb-3">
        <h3 className="font-semibold">Complete Payment</h3>
        <p className="text-sm text-muted-foreground">Amount: ৳ {amount ?? 0}</p>
      </div>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripeCheckoutForm
          participationId={participationId}
          onSuccess={onSuccess}
        />
      </Elements>
    </div>
  );
}