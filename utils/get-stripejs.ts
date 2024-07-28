import Stripe from "stripe";

let stripePromise: Stripe;
const getStripe = (): Stripe => {
  if (!stripePromise) {
    stripePromise = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }
  return stripePromise;
};

export default getStripe;
