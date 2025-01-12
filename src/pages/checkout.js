import axios from 'axios';
import { groupBy } from 'lodash';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import Currency from 'react-currency-formatter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from '../components/Header';
import CheckoutProduct from '../components/CheckoutProduct';
import { selectItems, selectTotal } from '../slices/basketSlice';

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();
  const groupedItems = Object.values(groupBy(items, 'id'));

  async function createCheckoutSession() {
    const stripe = await stripePromise;

    try {
      // Call the backend to create a checkout session...
      const checkoutSession = await axios.post('/api/create-checkout-session', {
        // body
        items,
        email: session.user.email,
      });

      // After creating a session, redirect the user to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result.error) {
        toast.error(
          'An error occurred while redirecting to checkout. Please try again.'
        );
        console.error(result.error.message);
      }
    } catch (error) {
      toast.error(
        'An error occurred while creating the checkout session. Please try again.'
      );
      console.error('Error creating checkout session:', error);
    }
  }

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <img
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            className="object-contain"
          />

          <div className="flex flex-col p-5 space-y-50 bg-white">
            <h1
              className={`text-3xl ${
                items.length > 0 ? 'border-b pb-4' : 'pb-2'
              }`}
            >
              {items.length === 0 ? 'Your Basket is empty.' : 'Shopping Basket'}
            </h1>

            <TransitionGroup>
              {groupedItems.map((group, i) => (
                <CSSTransition
                  key={group[0].image}
                  timeout={500}
                  classNames="item"
                >
                  <CheckoutProduct
                    id={group[0].id}
                    title={group[0].title}
                    rating={group[0].rating}
                    price={group[0].price}
                    description={group[0].description}
                    category={group[0].category}
                    image={group[0].image}
                    hasPrime={group[0].hasPrime}
                    quantity={group.length}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>

        {/* Right */}
        <CSSTransition
          in={items.length > 0}
          timeout={300}
          classNames="disappear"
          unmountOnExit
        >
          <div className="flex flex-col bg-white p-10 shadow-md">
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length} items):{' '}
              <span className="font-bold">
                <Currency quantity={total * 71} currency="INR" />
              </span>
            </h2>

            <button
              role="link"
              type="submit"
              onClick={createCheckoutSession}
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed hover:from-gray-300'
              }`}
            >
              {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
            </button>
          </div>
        </CSSTransition>
      </main>
    </div>
  );
}

export default Checkout;
