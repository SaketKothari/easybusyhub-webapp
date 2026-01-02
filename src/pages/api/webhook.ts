import { buffer } from "micro";
import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Secure a connection to Firebase from the backend
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Establish connection to Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET!; // We use stripe cli to get this

const fulfillOrder = async (session: Stripe.Checkout.Session) => {
  const images = JSON.parse(session.metadata?.images || "[]").map(
    (image: any) => JSON.stringify(image)
  );
  // console.log("Fulfilling order", session);

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata?.email || "")
    .collection("orders")
    .doc(session.id)
    .set({
      amount: (session.amount_total || 0) / 100,
      amount_shipping: (session.total_details?.amount_shipping || 0) / 100,
      images: images,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
    })
    .catch((err) => console.log("Error Occured!", err.message));
};

// DOCS on Stripe - Connect Webhoohs https://stripe.com/docs/connect/webhooks
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // using this because to generate certificate
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;
    // Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      const error = err as Error;
      console.log("ERROR", error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Fulfill the order => put it inside firebase db
      return fulfillOrder(session)
        .then(() => res.status(200).json({ received: true }))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false, // Useless for webhooks
    externalResolver: true,
  },
};
