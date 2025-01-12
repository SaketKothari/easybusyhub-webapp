# EasyBusyHub - Ecommerce Webapp

### [Live Site](https://easybusyhub.vercel.app)

### [Working Video](https://www.linkedin.com/posts/saket-kothari_a-web-app-which-is-fully-responsive-that-activity-6838861781708931072-F_ac?utm_source=share&utm_medium=member_desktop)

A web app build from scratch which is fully responsive that tries to imitate any Ecommerce webapp, in this you can add, remove an item to cart, it has payment integration and also it has user authentication feature thanks to Firebase.

### Features

- Add and remove products from the basket
- User authentication
- Stripe checkout
- Data persistency with Firebase
- Firebase Cloud Functions
- Users purchase history with Cloud Firestore
- Responsive Design
- Store orders for logged in user
- Use Webhooks as they have a message or payload, and are sent to a unique URL
- Use Tailwind CSS which rapidly build modern websites without ever leaving your HTML.
- Use Next.js with all the features you need for production: hybrid static & server rendering.
- Use fakeStoreApi which is a free online REST API that you can use whenever you need Pseudo-real data for your e-commerce
  or shopping website without running any server-side code.

#

### Installation Steps

You need to install the dependencies:

```
npm install
```

### Available Scripts

In the project directory, you can run:

```
npm run dev
```

### To start the webhook

You need to install the [Stripe-CLI](https://github.com/stripe/stripe-cli/releases/latest) :

```
stripe login
```

After login and enter in the browser then run this command in the terminal

```
stripe listen --forward-to localhost:3000/api/webhook
```
