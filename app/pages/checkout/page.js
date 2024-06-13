"use client"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useInitialRender } from "../../utils/useInitialRender";
import CheckoutForm from "../../components/CheckoutForm";
import CheckoutCart from "../../components/CheckoutCart";
const stripePromise = loadStripe("pk_test_51PPysL02xP03u8kDIBt0t4dBDeFjwCn39rW7ODKKqhHfsPBns7aDSwGvZEy7P1f7Io3k9kOdOsg1YD39LbXtmztu00NXafdXGD");

export default function checkout(){
    const initialRender = useInitialRender();
  if (!initialRender) return null;

  return (
    <section className="container mx-auto py-24">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <CheckoutCart />
        </div>
        <div className="col-span-3">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </section>
  );
}