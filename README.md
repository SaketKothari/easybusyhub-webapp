<h1 align="center">🛒 EasyBusyHub</h1>

<p align="center">
 <strong>A modern, full-stack e-commerce web application built with Next.js</strong>
</p>

<p align="center">
 <a href="https://easybusyhub.vercel.app" target="_blank">🌐 Live Demo</a> •
 <a href="https://www.linkedin.com/posts/saket-kothari_a-web-app-which-is-fully-responsive-that-activity-6838861781708931072-F_ac?utm_source=share&utm_medium=member_desktop" target="_blank">📹 Video Demo</a>
</p>

<p align="center">
 <img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
 <img src="https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react" alt="React" />
 <img src="https://img.shields.io/badge/TailwindCSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
 <img src="https://img.shields.io/badge/Firebase-10.12-orange?style=for-the-badge&logo=firebase" alt="Firebase" />
 <img src="https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe" alt="Stripe" />
</p>

---

## 📖 About

EasyBusyHub is a fully responsive e-commerce platform that replicates the core functionality of major online shopping websites. Built from scratch with modern web technologies, it features secure authentication, real-time data persistence, and seamless payment processing.

## ✨ Key Features

### 🛍️ Shopping Experience

- **Product Catalog** - Browse products from Fake Store API
- **Shopping Cart** - Add/remove items with real-time updates
- **Order Management** - View purchase history and order details
- **Responsive Design** - Seamless experience across all devices

### 🔐 Authentication & Security

- **NextAuth Integration** - Secure user authentication
- **Firebase Auth** - Reliable identity management
- **Protected Routes** - Secure checkout and order pages

### 💳 Payment Processing

- **Stripe Checkout** - Secure payment gateway integration
- **Webhook Events** - Real-time order confirmation
- **Transaction History** - Complete order tracking

### 🗄️ Data Management

- **Firebase Firestore** - Cloud-based NoSQL database
- **Redux Toolkit** - Centralized state management
- **Data Persistence** - Orders saved for logged-in users

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 14.2 with React 18.2
- **Styling:** Tailwind CSS 3.3
- **State Management:** Redux Toolkit
- **UI Components:** Heroicons, React Carousel
- **Notifications:** React Toastify

### Backend

- **Authentication:** NextAuth.js
- **Database:** Firebase Firestore
- **Cloud Functions:** Firebase Cloud Functions
- **Payment:** Stripe API
- **API:** Fake Store API (product data)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Stripe account

### Installation

1. **Clone the repository**

  ```bash
  git clone https://github.com/SaketKothari/easybusyhub-webapp.git
  cd easybusyhub-webapp
  ```

2. **Install dependencies**

  ```bash
  npm install
  ```

3. **Set up environment variables**

  Create a `.env.local` file in the root directory:

  ```env
  # Firebase Configuration
  NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

  # Stripe Configuration
  STRIPE_PUBLIC_KEY=your_stripe_public_key
  STRIPE_SECRET_KEY=your_stripe_secret_key
  STRIPE_WEBHOOK_SECRET=your_webhook_secret

  # NextAuth
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=your_nextauth_secret
  ```

4. **Run the development server**

  ```bash
  npm run dev
  ```

  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start development server on localhost:3000 |
| `npm run build` | Build production-ready application         |
| `npm start`     | Start production server                    |

## 💰 Stripe Webhook Setup

To test payment webhooks locally:

1. **Install Stripe CLI**

  Download from [Stripe CLI Releases](https://github.com/stripe/stripe-cli/releases/latest)

2. **Login to Stripe**

  ```bash
  stripe login
  ```

3. **Forward webhook events to local server**

  ```bash
  stripe listen --forward-to localhost:3000/api/webhook
  ```

4. **Copy the webhook signing secret** displayed in the terminal and add it to your `.env.local` file

## 📁 Project Structure

```
easybusyhub-webapp/
├── public/              # Static assets
├── src/
│   ├── app/            # Redux store configuration
│   ├── components/     # React components
│   ├── pages/          # Next.js pages and API routes
│   │   ├── api/        # Backend API endpoints
│   │   └── auth/       # Authentication pages
│   ├── services/       # Service layer
│   ├── slices/         # Redux slices
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
├── firebase.js         # Firebase configuration
└── package.json        # Project dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Saket Kothari**

- LinkedIn: [@saket-kothari](https://www.linkedin.com/in/saket-kothari)
- GitHub: [@SaketKothari](https://github.com/SaketKothari)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Stripe](https://stripe.com/) - Payment processing platform
- [Firebase](https://firebase.google.com/) - Backend as a Service
- [Fake Store API](https://fakestoreapi.com/) - Free product data API

---

<p align="center">Made with ❤️ by Saket Kothari</p>

