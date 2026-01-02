import { groupBy } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface BasketItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  hasPrime: boolean;
}

interface RequestBody {
  items: BasketItem[];
  email: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { items, email } = req.body as RequestBody;
  // console.log(items, email);

  const groupedItems: BasketItem[][] = Object.values(groupBy(items, "id"));

  const transformedItems = groupedItems.map((group) => ({
    quantity: group.length,
    price_data: {
      currency: "inr",
      unit_amount: group[0].price * 71 * 100,
      product_data: {
        name: group[0].title,
        description: group[0].description,
        images: [group[0].image],
      },
    },
  }));

  // Instead of sending an array of multiple similar values, just group them to save space in session
  const groupedImages = Object.values(
    groupBy(items.map((item) => item.image))
  ).map((group) => [group.length, group[0]]);
  /*
   This gives us an array like this (shorter for storing into the session):
   [
       [2, "image_A.jpg"], // means "2 products with that same image"
       [1, "image_B.jpg"], // ...
       [6, "image_C.jpg"], // ...
   ]
*/

  // Create a checkout session with the order amount and currency
  const session = await stripe.checkout.sessions.create({
    shipping_options: [
      {
        shipping_rate: "shr_1QgJxdSCmRpGXuQSe1X19IQD", // Created fees in Stripe's dashboard
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["IN", "GB", "US", "CA", "FR"], // RTFM!
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(groupedImages),
    },
  });

  //console.log("Session Created!", session.id);
  res.status(200).json({ id: session.id });
};
