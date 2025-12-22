import Head from "next/head";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

// Fallback products in case the API fails (common on Vercel due to cold starts or rate limits)
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outance cotton jacket for spring or fall.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  },
  {
    id: 5,
    title: "John Hardy Women's Chain Bracelet",
    price: 695,
    description: "From our heritage collection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168,
    description: "Satisfaction guaranteed.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  },
];

async function fetchWithRetry(url, options, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`);
      }

      return res;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  try {
    const res = await fetchWithRetry("https://fakestoreapi.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    let products = Array.isArray(data)
      ? data
      : data?.value || data?.products || [];

    if (!products || products.length === 0) {
      products = FALLBACK_PRODUCTS;
    }

    return {
      props: {
        products: products,
        session: session,
      },
    };
  } catch (error) {
    return {
      props: {
        products: FALLBACK_PRODUCTS,
        session: session,
      },
    };
  }
}

export default function Home({ products = [] }) {
  const [filteredProducts, setProducts] = useState(products || []);

  useEffect(() => {
    if (products && products.length > 0) {
      setProducts(products);
    }
  }, [products]);

  function filterProducts(searchText) {
    if (!searchText || searchText.trim() === "") {
      setProducts(products || []);
      return;
    }
    const matchedProducts = (products || []).filter((product) =>
      product?.title?.toLowerCase().includes(searchText.toLowerCase())
    );
    setProducts(matchedProducts);
  }

  return (
    <div className="bg-gray-100 ">
      <Head>
        <title>EasyBusyHub Webapp</title>
      </Head>

      <Header onSearchValue={filterProducts} />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        {filteredProducts && filteredProducts.length > 0 ? (
          <ProductFeed products={filteredProducts} />
        ) : (
          <h1 className="text-center text-2xl py-4">
            🙁 No matching products…
          </h1>
        )}
      </main>
    </div>
  );
}
