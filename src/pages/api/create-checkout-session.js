const path = require('path');
import { groupBy } from 'lodash';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;
  // console.log(items, email);

  const groupedItems = Object.values(groupBy(items, 'id'));

  const transformedItems = groupedItems.map((group) => ({
    description: group[0].description,
    quantity: group.length,
    price_data: {
      currency: 'inr',
      unit_amount: group[0].price * 71 * 100,
      product_data: {
        name: group[0].title,
        images: [group[0].image],
      },
    },
  }));

  // Instead of sending an array of multiple similar values, just group them to save space in session
  const groupedImages = Object.values(
    groupBy(items.map((item) => path.basename(item.image)))
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
    shipping_rates: ['shr_1QgJxdSCmRpGXuQSe1X19IQD'], // Created fees in Stripe's dashboard
    //   shipping_options: [
    //     {
    //       shipping_rate_data: {
    //         type: 'fixed_amount',
    //         fixed_amount: {
    //           amount: 70,
    //           currency: 'inr',
    //         },
    //         display_name: 'Free shipping',
    //         delivery_estimate: {
    //           minimum: {
    //             unit: 'business_day',
    //             value: 5,
    //           },
    //           maximum: {
    //             unit: 'business_day',
    //             value: 7,
    //           },
    //         },
    //       },
    //     },
    // ],
    shipping_address_collection: {
      allowed_countries: ['IN', 'GB', 'US', 'CA', 'FR'], // RTFM!
    },
    line_items: transformedItems,
    mode: 'payment',
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
