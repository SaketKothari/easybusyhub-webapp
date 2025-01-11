// telling next.js to pull these images from above

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'links.papareact.com',
        pathname: '**',
      },
    ],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
// ['links.papareact.com', 'fakestoreapi.com'],
